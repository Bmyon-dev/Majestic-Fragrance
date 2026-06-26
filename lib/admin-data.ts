import {
  collection,
  getDocs,
  query,
  limit as fbLimit,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export interface NewsletterRecord {
  id: string;
  email: string;
  subscribedAt: Date | null;
}

function toDate(value: unknown): Date | null {
  if (value instanceof Timestamp) return value.toDate();
  return null;
}

export async function fetchNewsletterSubscribers(max = 100): Promise<NewsletterRecord[]> {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const q = query(collection(db, "newsletter_subscribers"), fbLimit(max));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        email: data.email ?? d.id,
        subscribedAt: toDate(data.subscribedAt),
      };
    });
  } catch (err) {
    console.error("Failed to fetch newsletter subscribers:", err);
    return [];
  }
}

export async function fetchWhatsAppClickCount(): Promise<number> {
  if (!isFirebaseConfigured || !db) return 0;
  try {
    const snap = await getDocs(collection(db, "whatsapp_clicks"));
    return snap.size;
  } catch (err) {
    console.error("Failed to fetch WhatsApp click count:", err);
    return 0;
  }
}

export async function fetchVisitorStats(): Promise<{ date: string; views: number }[]> {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const snap = await getDocs(collection(db, "visitor_stats"));
    return snap.docs
      .map((d) => ({ date: d.id, views: d.data().views ?? 0 }))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (err) {
    console.error("Failed to fetch visitor stats:", err);
    return [];
  }
}
