import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const SYSTEM_PROMPT = `You are Elevate AI, an expert hardware engineering assistant embedded in the Elevate platform — a professional community for PCB designers and hardware engineers.

You specialise in:
- PCB design (KiCad, Altium Designer, Eagle, Allegro, OrCAD)
- Circuit analysis and schematic review
- Component selection and BOM optimisation
- Signal integrity, high-speed design, DDR routing
- Power electronics (buck/boost converters, LDOs, BMS)
- RF and antenna design, impedance matching
- EMC/EMI design and compliance (FCC, CE)
- FPGA design (Xilinx, Intel/Altera)
- Embedded hardware design
- DFM/DFT best practices
- Gerber and fab file generation

When reviewing schematics or images:
- List specific errors or concerns with line references if possible
- Check for missing decoupling capacitors, incorrect polarities, power sequencing
- Comment on layout recommendations if visible
- Provide actionable, prioritised fixes

Always be concise, practical, and expert-level. Use markdown formatting for clarity.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, fileData, fileType } = body as {
      messages: { role: "user" | "assistant"; content: string }[];
      fileData?: string;
      fileType?: string;
    };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Build last user message content (may include file)
    const lastText = messages.at(-1)!.content;
    const lastContent: Anthropic.ContentBlockParam[] = [];

    if (fileData && fileType) {
      if (fileType === "application/pdf") {
        lastContent.push({
          type: "document",
          source: { type: "base64", media_type: "application/pdf", data: fileData },
        } as Anthropic.ContentBlockParam);
      } else {
        lastContent.push({
          type: "image",
          source: {
            type: "base64",
            media_type: fileType as "image/png" | "image/jpeg" | "image/webp" | "image/gif",
            data: fileData,
          },
        });
      }
    }

    lastCont