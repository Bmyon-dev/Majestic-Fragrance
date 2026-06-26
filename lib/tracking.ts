// Helper functions for logging orders, WhatsApp clicks, newsletter
// signups, and now full order creation/tracking/reviews to Firestore.
// All functions safely no-op (and log to console in dev) if Firebase
// hasn't been configured yet — see lib/firebase.ts.

import {
  collection,
  addDoc,
  serverTimestamp,
  increment,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit as fbLimit,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { CartItem } from "@/data/order-types";
import type { OrderRecord, OrderStatus, ProductReview } from "@/data/order-types";

// Legacy lightweight order log — used only by older WhatsApp-direct order
// buttons that don't go through full checkout. The full checkout flow
// below (createOrder, getOrderByRef, etc.) is the primary order system.
export interface OrderPayload {
  productName: string;
  price: number;
  quantity: number;
  channel: "whatsapp" | "website";
  customerName?: string;
  customerPhone?: string;
  deliveryArea?: string;
}

export async function logOrder(order: OrderPayload): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    console.warn(
      "[Firebase not configured] Order not saved to database:",
      order
    );
    return;
  }
  try {
    await addDoc(collection(db, "whatsapp_direct_orders"), {
      ...order,
      status: "pending",
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Failed to log order to Firestore:", err);
  }
}

export async function logWhatsAppClick(context: string): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  try {
    await addDoc(collection(db, "whatsapp_clicks"), {
      context,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Failed to log WhatsApp click:", err);
  }
}

export async function logNewsletterSignup(email: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    console.warn(
      "[Firebase not configured] Newsletter signup not saved:",
      email
    );
    return;
  }
  try {
    await setDoc(doc(db, "newsletter_subscribers", email), {
      email,
      subscribedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Failed to log newsletter signup:", err);
  }
}

export async function logPageView(path: string): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  try {
    const today = new Date().toISOString().slice(0, 10);
    await setDoc(
      doc(db, "visitor_stats", today),
      { views: increment(1), lastPath: path },
      { merge: true }
    );
  } catch (err) {
    console.error("Failed to log page view:", err);
  }
}

// ===================================================================
// FULL CHECKOUT ORDER SYSTEM
// ===================================================================
// Orders are stored in the "orders" collection. A human-friendly
// reference like "MF-2026-0001" is generated using a counter document
// so customers always get a short, memorable ID for tracking — rather
// than a long Firestore auto-id.

interface CreateOrderInput {
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryArea: string;
  deliveryAddress: string;
  notes?: string;
}

async function generateOrderRef(): Promise<string> {
  if (!db) throw new Error("Firestore not configured");
  const year = new Date().getFullYear();
  const counterRef = doc(db, "counters", `orders_${year}`);

  const nextNumber = await runTransaction(db, async (transaction) => {
    const counterSnap = await transaction.get(counterRef);
    const current = counterSnap.exists() ? counterSnap.data().count ?? 0 : 0;
    const next = current + 1;
    transaction.set(counterRef, { count: next }, { merge: true });
    return next;
  });

  return `MF-${year}-${String(nextNumber).padStart(4, "0")}`;
}

/**
 * Creates a new order with status "pending_verification" and returns the
 * human-friendly order reference (e.g. "MF-2026-0001") the customer uses
 * to track it. Returns null if Firebase isn't configured — callers should
 * handle this by showing a clear message rather than a fake reference.
 */
export async function createOrder(
  input: CreateOrderInput
): Promise<{ orderRef: string; docId: string } | null> {
  if (!isFirebaseConfigured || !db) {
    console.warn("[Firebase not configured] Cannot create trackable order.");
    return null;
  }
  try {
    const orderRef = await generateOrderRef();
    const subtotal = input.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const docRef = await addDoc(collection(db, "orders"), {
      orderRef,
      items: input.items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      subtotal,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail ?? "",
      deliveryArea: input.deliveryArea,
      deliveryAddress: input.deliveryAddress,
      notes: input.notes ?? "",
      status: "pending_verification" as OrderStatus,
      emailSent: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { orderRef, docId: docRef.id };
  } catch (err) {
    console.error("Failed to create order:", err);
    return null;
  }
}

function mapOrderDoc(id: string, data: Record<string, unknown>): OrderRecord {
  const toDate = (v: unknown) => (v instanceof Timestamp ? v.toDate() : null);
  return {
    id,
    orderRef: (data.orderRef as string) ?? "",
    items: (data.items as OrderRecord["items"]) ?? [],
    subtotal: (data.subtotal as number) ?? 0,
    customerName: (data.customerName as string) ?? "",
    customerPhone: (data.customerPhone as string) ?? "",
    customerEmail: (data.customerEmail as string) ?? "",
    deliveryArea: (data.deliveryArea as string) ?? "",
    deliveryAddress: (data.deliveryAddress as string) ?? "",
    notes: (data.notes as string) ?? "",
    status: (data.status as OrderStatus) ?? "pending_verification",
    emailSent: Boolean(data.emailSent),
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

/**
 * Looks up an order by its human-friendly reference (e.g. "MF-2026-0001").
 * Reference lookup is case-insensitive and trims whitespace.
 */
export async function getOrderByRef(orderRef: string): Promise<OrderRecord | null> {
  if (!isFirebaseConfigured || !db) return null;
  try {
    const cleaned = orderRef.trim().toUpperCase();
    const q = query(collection(db, "orders"), where("orderRef", "==", cleaned), fbLimit(1));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return mapOrderDoc(d.id, d.data());
  } catch (err) {
    console.error("Failed to fetch order:", err);
    return null;
  }
}

export async function getOrderById(docId: string): Promise<OrderRecord | null> {
  if (!isFirebaseConfigured || !db) return null;
  try {
    const snap = await getDoc(doc(db, "orders", docId));
    if (!snap.exists()) return null;
    return mapOrderDoc(snap.id, snap.data());
  } catch (err) {
    console.error("Failed to fetch order:", err);
    return null;
  }
}

export async function fetchAllOrders(max = 100): Promise<OrderRecord[]> {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"), fbLimit(max));
    const snap = await getDocs(q);
    return snap.docs.map((d) => mapOrderDoc(d.id, d.data()));
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    return [];
  }
}

export async function updateOrderStatus(
  docId: string,
  status: OrderStatus
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;
  try {
    await updateDoc(doc(db, "orders", docId), {
      status,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.error("Failed to update order status:", err);
    return false;
  }
}

export async function markOrderEmailSent(docId: string): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;
  try {
    await updateDoc(doc(db, "orders", docId), { emailSent: true });
    return true;
  } catch (err) {
    console.error("Failed to mark email as sent:", err);
    return false;
  }
}

// ===================================================================
// PRODUCT REVIEWS (customer-submitted, shown immediately)
// ===================================================================

interface SubmitReviewInput {
  productId: string;
  productSlug: string;
  name: string;
  rating: number;
  text: string;
}

export async function submitReview(
  input: SubmitReviewInput
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) {
    console.warn("[Firebase not configured] Review not saved:", input);
    return false;
  }
  try {
    await addDoc(collection(db, "reviews"), {
      ...input,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.error("Failed to submit review:", err);
    return false;
  }
}

export async function fetchReviewsForProduct(
  productSlug: string
): Promise<ProductReview[]> {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const q = query(
      collection(db, "reviews"),
      where("productSlug", "==", productSlug),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        productId: data.productId ?? "",
        productSlug: data.productSlug ?? "",
        name: data.name ?? "Anonymous",
        rating: data.rating ?? 5,
        text: data.text ?? "",
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : null,
      };
    });
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
    return [];
  }
}
