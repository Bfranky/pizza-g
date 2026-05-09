// lib/utils.ts
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  PREPARING: "Preparing",
  READY: "Ready",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PREPARING: "bg-blue-100 text-blue-800",
  READY: "bg-green-100 text-green-800",
  DELIVERED: "bg-gray-100 text-gray-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export const CATEGORY_LABELS: Record<string, string> = {
  pizza: "Pizzas",
  drinks: "Drinks",
  bar: "Bar",
  sides: "Sides",
};

export const RESTAURANT_INFO = {
  name: "Pizza Garden",
  address: "No. 1 Iruka Street, Obosi, Anambra, Nigeria",
  phone: "0806 364 5052",
  whatsapp: "2348063645052",
  email: "hello@pizzagarden.ng",
  lat: 6.16667,
  lng: 6.78333,
  openTime: "10:00 AM",
  closeTime: "8:00 PM",
  googleMapsUrl: "https://maps.google.com/?q=6.16667,6.78333",
};
