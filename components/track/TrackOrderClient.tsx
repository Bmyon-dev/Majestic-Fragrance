"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MessageCircle } from "lucide-react";
import { getOrderByRef } from "@/lib/tracking";
import { OrderRecord } from "@/data/order-types";
import { OrderProgressBar } from "./OrderProgressBar";
import { buildWhatsAppGeneralLink } from "@/lib/whatsapp";
import { siteConfig } from "@/data/site-config";

const LAST_REF_KEY = "mf_last_order_ref";

function TrackOrderInner() {
  const searchParams = useSearchParams();
  const [refInput, setRefInput] = useState("");
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function lookupOrder(ref: string) {
    if (!ref.trim()) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const result = await getOrderByRef(ref);
      if (result) {
        setOrder(result);
        window.localStorage.setItem(LAST_REF_KEY, result.orderRef);
      } else {
        setOrder(null);
        setError(
          "We couldn't find an order with that reference. Double-check it and try again, or contact us on WhatsApp."
        );
      }
    } catch {
      setError("Something went wrong looking up your order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // On load: check URL ?ref= param first, then fall back to last-saved ref
  // so a customer who left mid-tracking picks up right where they stopped.
  useEffect(() => {
    const urlRef = searchParams.get("ref");
    if (urlRef) {
      setRefInput(urlRef);
      lookupOrder(urlRef);
      return;
    }
    const savedRef = window.localStorage.getItem(LAST_REF_KEY);
    if (savedRef) {
      setRefInput(savedRef);
      lookupOrder(savedRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    lookupOrder(refInput);
  }

  const waMessage = order
    ? `Hello ${siteConfig.brandName}, I'd like an update on my order.\n\nOrder Reference: ${order.orderRef}\nStatus shown on site: ${order.status}\n\nCould you confirm?`
    : undefined;

  return (
    <div className="mx-auto max-w-lg">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={refInput}
          onChange={(e) => setRefInput(e.target.value)}
          placeholder="e.g. MF-2026-0001"
          className="input-field flex-1"
          aria-label="Order reference"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold disabled:opacity-60"
        >
          <Search size={16} />
          {loading ? "Searching…" : "Track"}
        </button>
      </form>

      {error && (
        <p className="mt-4 rounded-lg border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {order && (
        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-surface p-6">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs uppercase tracking-wider text-text-faint">Order</p>
            <p className="font-display text-lg text-gradient-gold tabular">
              {order.orderRef}
            </p>
          </div>
          <p className="text-sm text-text-muted mb-6">
            {order.items.length} item{order.items.length === 1 ? "" : "s"} · ₦
            {order.subtotal.toLocaleString("en-NG")}
          </p>

          <OrderProgressBar status={order.status} />

          <div className="gold-rule my-2" />

          <div className="mt-4 flex flex-col gap-1 text-sm text-text-muted">
            <p>
              <span className="text-text-faint">Delivery to:</span> {order.deliveryArea}
            </p>
            <p>
              <span className="text-text-faint">Name:</span> {order.customerName}
            </p>
          </div>

          <a
            href={buildWhatsAppGeneralLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-full border border-success/30 py-3 text-sm font-medium text-success/90 hover:bg-success/10 transition-colors"
          >
            <MessageCircle size={15} />
            Ask About This Order on WhatsApp
          </a>
        </div>
      )}

      {!order && searched && !loading && !error && (
        <p className="mt-6 text-center text-sm text-text-faint">
          No order found yet — try again once you have your reference.
        </p>
      )}
    </div>
  );
}

export function TrackOrderClient() {
  return (
    <Suspense
      fallback={<div className="text-center text-text-muted">Loading…</div>}
    >
      <TrackOrderInner />
    </Suspense>
  );
}
