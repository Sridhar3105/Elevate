// ─── User ────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: "designer" | "student" | "company";
  bio: string | null;
  location: string | null;
  hourlyRate: number | null;
  skills: string[];
  createdAt: Date;
}

// ─── Project ─────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: "draft" | "in_review" | "published";
  views: number;
  likes: number;
  userId: string;
  user?: Pick<User, "id" | "name" | "image">;
  createdAt: Date;
}

// ─── Forum ───────────────────────────────────────────────────
export interface Post {
  id: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  votes: number;
  views: number;
  solved: boolean;
  userId: string;
  user: Pick<User, "id" | "name" | "image">;
  replies: Reply[];
  createdAt: Date;
}

export interface Reply {
  id: string;
  body: string;
  votes: number;
  accepted: boolean;
  postId: string;
  userId: string;
  user: Pick<User, "id" | "name" | "image">;
  createdAt: Date;
}

// ─── Store ───────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  origPrice: number;
  discount: number;
  stock: number;
  icon: string;
  badge: string | null;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered";
  razorpayId: string | null;
  address: ShippingAddress;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pin: string;
  state: string;
}

// ─── Jobs ────────────────────────────────────────────────────
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  pay: string;
  tags: string[];
  description: string;
  requirements: string[];
  remote: boolean;
  createdAt: Date;
}

// ─── AI Chat ─────────────────────────────────────────────────
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIRequestBody {
  messages: ChatMessage[];
  fileData?: string;
  fileType?: string;
}

// ─── Library ─────────────────────────────────────────────────
export interface Component {
  id: string;
  name: string;
  manufacturer: string;
  category: string;
  package: string;
  hasSymbol: boolean;
  hasFootprint: boolean;
  has3DModel: boolean;
  hasSpice: boolean;
  tools: string[];
  rating: number;
  downloads: number;
  updatedAt: Date;
}

// ─── Notifications ───────────────────────────────────────────
export interface Notification {
  id: string;
  icon: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: Date;
}
