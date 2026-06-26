// === ORDER, CART & REVIEW TYPES ===

export type OrderStatus =
  | "pending_verification" // customer clicked "I've made transfer", admin hasn't checked yet
  | "payment_confirmed" // admin verified the transfer
  | "processing" // preparing the order
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending_verification: "Pending Verification",
  payment_confirmed: "Payment Confirmed",
  processing: "Processing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

// Ordered list used to render the tracking progress bar.
export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  "pending_verification",
  "payment_confirmed",
  "processing",
  "out_for_delivery",
  "delivered",
];

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderRecord {
  id: string; // Firestore doc id
  orderRef: string; // human-friendly id shown to customer, e.g. "MF-2026-0001"
  items: OrderItem[];
  subtotal: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryArea: string;
  deliveryAddress: string;
  notes?: string;
  status: OrderStatus;
  emailSent: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface ProductReview {
  id: string;
  productId: string;
  productSlug: string;
  name: string;
  rating: number; // 1-5
  text: string;
  createdAt: Date | null;
}
