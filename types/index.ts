// types/index.ts
export type Role = "CUSTOMER" | "ADMIN";
export type OrderType = "DINE_IN" | "TAKEAWAY" | "DELIVERY";
export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
export type MenuCategory = "pizza" | "drinks" | "bar" | "sides";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  imageUrl: string;
  available: boolean;
  featured: boolean;
  createdAt: string;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  userId?: string;
  user?: { name: string; email: string };
  items: CartItem[];
  totalAmount: number;
  orderType: OrderType;
  status: OrderStatus;
  customerName?: string;
  phone?: string;
  address?: string;
  reference?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  user: { name: string };
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

export interface BusinessSettings {
  id: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}
