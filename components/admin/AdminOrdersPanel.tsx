"use client";

import { useState } from "react";
import { Mail, ChevronDown, ExternalLink } from "lucide-react";
import {
  fetchAllOrders,
  updateOrderStatus,
  markOrderEmailSent,
} from "@/lib/tracking";
import {
  OrderRecord,
  OrderStatus,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_SEQUENCE,
} from "@/data/order-types";
import { siteConfig } from "@/data/site-config";

interface AdminOrdersPanelProps {
  orders: OrderRecord[];
  onOrdersChange: (orders: OrderRecord[]) => void;
}

const statusColors: Record<OrderStatus, string> = {
  pending_verification: "border-yellow-400/40 text-yellow-300 bg-yellow-400/5",
  payment_confirmed: "border-blue-400/40 text-blue-300 bg-blue-400/5",
  processing: "border-purple/40 text-purple-soft bg-purple/5",
  out_for_delivery: "border-gold/40 text-gold bg-gold/5",
  delivered: "border-success/40 text-success bg-success/5",
  cancelled: "border-red-400/40 text-red-300 bg-red-400/5",
};

function buildEmailDraft(order: OrderRecord): { subject: string; body: string } {
  const itemLines = order.items
    .map((i) => `  - ${i.name} × ${i.quantity} — ₦${(i.price * i.quantity).toLocaleString("en-NG")}`)
    .join("\n");

  const statusMessage: Record<OrderStatus, string> = {
    pending_verification:
      "We've received your order and are currently verifying your payment.",
    payment_confirmed:
      "Your payment has been confirmed! We're getting your order ready.",
    processing: "Your order is being prepared and will be dispatched soon.",
    out_for_delivery: "Your order is on its way to you!",
    delivered: "Your order has been delivered. We hope you love it!",
    cancelled: "Your order has been cancelled. Please contact us with any questions.",
  };

  const subject = `Your ${siteConfig.brandName} Order ${order.orderRef} — ${ORDER_STATUS_LABELS[order.status]}`;
  const body = `Hi ${order.customerName},

${statusMessage[order.status]}

Order Reference: ${order.orderRef}
Status: ${ORDER_STATUS_LABELS[order.status]}

Items:
${itemLines}

Total: ₦${order.subtotal.toLocaleString("en-NG")}
Delivery Area: ${order.deliveryArea}

You can track your order anytime at majesticfragrance.store/track using your order reference.

Thank you for choosing ${siteConfig.brandName}.

Warm regards,
${siteConfig.brandName}`;

  return { subject, body };
}

export function AdminOrdersPanel({ orders, onOrdersChange }: AdminOrdersPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handleStatusChange(order: OrderRecord, newStatus: OrderStatus) {
    setUpdatingId(order.id);
    const success = await updateOrderStatus(order.id, newStatus);
    if (success) {
      const updated = await fetchAllOrders();
      onOrdersChange(updated);
    }
    setUpdatingId(null);
  }

  function handleOpenEmail(order: OrderRecord) {
    if (!order.customerEmail) {
      alert("This customer didn't provide an email address.");
      return;
    }
    const { subject, body } = buildEmailDraft(order);
    const mailtoLink = `mailto:${order.customerEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    markOrderEmailSent(order.id).then(async () => {
      const updated = await fetchAllOrders();
      onOrdersChange(updated);
    });
  }

  const pendingOrders = orders.filter((o) => o.status === "pending_verification");
  const otherOrders = orders.filter((o) => o.status !== "pending_verification");

  return (
    <div className="flex flex-col gap-6">
      {pendingOrders.length > 0 && (
        <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-5">
          <p className="text-sm font-medium text-yellow-200">
            ⚠ {pendingOrders.length} order{pendingOrders.length === 1 ? "" : "s"} awaiting payment verification
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {[...pendingOrders, ...otherOrders].map((order) => {
          const isExpanded = expandedId === order.id;
          return (
            <div
              key={order.id}
              className="rounded-2xl border border-white/[0.06] bg-surface overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-display text-base text-gradient-gold tabular shrink-0">
                    {order.orderRef}
                  </span>
                  <span className="text-sm text-text-muted truncate">
                    {order.customerName}
                  </span>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${statusColors[order.status]}`}
                  >
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm tabular text-text-primary">
                    ₦{order.subtotal.toLocaleString("en-NG")}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-text-faint transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-white/5 p-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
                    <div>
                      <p className="text-xs text-text-faint mb-1">Customer</p>
                      <p className="text-text-primary">{order.customerName}</p>
                      <p className="text-text-muted">{order.customerPhone}</p>
                      {order.customerEmail && (
                        <p className="text-text-muted">{order.customerEmail}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-text-faint mb-1">Delivery</p>
                      <p className="text-text-primary">{order.deliveryArea}</p>
                      <p className="text-text-muted">{order.deliveryAddress}</p>
                    </div>
                  </div>

                  {order.notes && (
                    <p className="mt-3 text-sm text-text-muted">
                      <span className="text-text-faint">Notes:</span> {order.notes}
                    </p>
                  )}

                  <div className="mt-4 flex flex-col gap-1.5 border-t border-white/5 pt-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm text-text-muted">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="tabular">
                          ₦{(item.price * item.quantity).toLocaleString("en-NG")}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <label className="text-xs text-text-faint">Update Status:</label>
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) =>
                        handleStatusChange(order, e.target.value as OrderStatus)
                      }
                      className="rounded-full border border-white/10 bg-void px-3 py-1.5 text-xs text-text-primary"
                    >
                      {[...ORDER_STATUS_SEQUENCE, "cancelled" as OrderStatus].map((s) => (
                        <option key={s} value={s}>
                          {ORDER_STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleOpenEmail(order)}
                      className="flex items-center gap-1.5 rounded-full border border-gold/30 px-3 py-1.5 text-xs text-gold hover:bg-gold/10 transition-colors ml-auto"
                    >
                      <Mail size={13} />
                      {order.emailSent ? "Send Update Again" : "Send Confirmation Email"}
                      <ExternalLink size={11} />
                    </button>
                  </div>
                  {order.emailSent && (
                    <p className="mt-2 text-right text-xs text-text-faint">
                      ✓ Email sent previously
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {orders.length === 0 && (
          <p className="text-sm text-text-faint">No orders yet.</p>
        )}
      </div>
    </div>
  );
}
