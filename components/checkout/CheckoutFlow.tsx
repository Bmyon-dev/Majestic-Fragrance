"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Copy, Check, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { createOrder } from "@/lib/tracking";
import { siteConfig } from "@/data/site-config";
import { buildWhatsAppGeneralLink } from "@/lib/whatsapp";
import { CartItemRow } from "./CartItemRow";
import { isFirebaseConfigured } from "@/lib/firebase";

type Step = "cart" | "details" | "payment" | "confirmed";

export function CheckoutFlow() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [step, setStep] = useState<Step>("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderRef, setOrderRef] = useState<string | null>(null);
  const [error, setError] = useState("");

  function handleCopyAccount() {
    navigator.clipboard.writeText(siteConfig.bankDetails.accountNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !area.trim() || !address.trim()) return;
    setStep("payment");
  }

  async function handleConfirmTransfer() {
    setSubmitting(true);
    setError("");
    try {
      const result = await createOrder({
        items,
        customerName: name,
        customerPhone: phone,
        customerEmail: email || undefined,
        deliveryArea: area,
        deliveryAddress: address,
        notes: notes || undefined,
      });

      if (!result) {
        setError(
          "We couldn't save your order automatically right now. Please send your order details directly on WhatsApp instead, and we'll confirm manually."
        );
        setSubmitting(false);
        return;
      }

      setOrderRef(result.orderRef);
      clearCart();
      setStep("confirmed");
    } catch {
      setError("Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  // Empty cart state
  if (items.length === 0 && step !== "confirmed") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/[0.06] bg-surface py-20 text-center">
        <ShoppingBag size={32} className="text-text-faint" />
        <p className="font-display text-xl text-text-primary">Your cart is empty</p>
        <p className="text-sm text-text-muted">Browse the collection and add something you love.</p>
        <Link href="/shop" className="btn-primary mt-3 rounded-full px-6 py-3 text-sm font-semibold">
          Shop Collection
        </Link>
      </div>
    );
  }

  // Order confirmed / reference screen
  if (step === "confirmed" && orderRef) {
    const waMessage = `Hello ${siteConfig.brandName}, I just placed an order online.\n\nOrder Reference: ${orderRef}\nName: ${name}\n\nI've made the bank transfer — please confirm once checked. Thank you!`;
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-gold/30 bg-surface p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <Check size={28} />
        </div>
        <h2 className="font-display mt-5 text-2xl text-text-primary">
          Order Received
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Thank you, {name.split(" ")[0]}. We&apos;ll verify your transfer and update your
          order status shortly.
        </p>

        <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/5 p-5">
          <p className="text-xs uppercase tracking-wider text-text-faint">Your Order Reference</p>
          <p className="font-display mt-1 text-2xl text-gradient-gold tabular">{orderRef}</p>
          <p className="mt-2 text-xs text-text-faint">
            Save this. You&apos;ll use it to track your order status anytime.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={`/track?ref=${orderRef}`}
            className="btn-primary rounded-full py-3 text-sm font-semibold"
          >
            Track My Order
          </Link>
          <a
            href={buildWhatsAppGeneralLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-success/30 py-3 text-sm font-medium text-success/90 hover:bg-success/10 transition-colors"
          >
            <MessageCircle size={15} />
            Also Send Reference on WhatsApp
          </a>
          <Link
            href="/shop"
            className="text-center text-xs uppercase tracking-widest text-text-muted hover:text-gold transition-colors py-1"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
      <div>
        {/* Step indicator */}
        <div className="mb-8 flex items-center gap-2 text-xs">
          {(["cart", "details", "payment"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  step === s
                    ? "bg-gradient-to-br from-purple to-magenta text-white"
                    : ["cart", "details", "payment"].indexOf(step) > i
                    ? "bg-success/20 text-success"
                    : "border border-white/10 text-text-faint"
                }`}
              >
                {i + 1}
              </div>
              <span className={step === s ? "text-text-primary" : "text-text-faint"}>
                {s === "cart" ? "Cart" : s === "details" ? "Details" : "Payment"}
              </span>
              {i < 2 && <div className="h-px w-6 bg-white/10" />}
            </div>
          ))}
        </div>

        {step === "cart" && (
          <div className="rounded-2xl border border-white/[0.06] bg-surface p-6">
            <h2 className="font-display text-xl text-text-primary mb-2">Your Cart</h2>
            <div>
              {items.map((item) => (
                <CartItemRow key={item.productId} item={item} />
              ))}
            </div>
            <button
              onClick={() => setStep("details")}
              className="btn-primary mt-6 w-full rounded-full py-3 font-semibold"
            >
              Continue to Delivery Details
            </button>
          </div>
        )}

        {step === "details" && (
          <form
            onSubmit={handleDetailsSubmit}
            className="rounded-2xl border border-white/[0.06] bg-surface p-6"
          >
            <h2 className="font-display text-xl text-text-primary mb-5">
              Delivery Details
            </h2>
            <div className="flex flex-col gap-4">
              <Field label="Full Name *">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tobi Adeyemi"
                  className="input-field"
                />
              </Field>
              <Field label="Phone Number *">
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0803 123 4567"
                  className="input-field"
                />
              </Field>
              <Field label="Email (optional, for confirmation)">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="input-field"
                />
              </Field>
              <Field label="Delivery Area *">
                <input
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. FUTA South Gate, Akure"
                  className="input-field"
                />
              </Field>
              <Field label="Full Delivery Address *">
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Hostel/house address, landmark, etc."
                  rows={3}
                  className="input-field resize-none"
                />
              </Field>
              <Field label="Order Notes (optional)">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special instructions"
                  rows={2}
                  className="input-field resize-none"
                />
              </Field>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="rounded-full border border-white/10 px-5 py-3 text-sm text-text-muted hover:border-white/30 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="btn-primary flex-1 rounded-full py-3 text-sm font-semibold"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        )}

        {step === "payment" && (
          <div className="rounded-2xl border border-white/[0.06] bg-surface p-6">
            <h2 className="font-display text-xl text-text-primary mb-2">
              Pay by Bank Transfer
            </h2>
            <p className="text-sm text-text-muted mb-5">
              Transfer the total amount below, then click &ldquo;I&apos;ve Made Transfer.&rdquo;
              We&apos;ll verify and update your order status — no card or online payment
              needed.
            </p>

            <div className="rounded-xl border border-gold/30 bg-gold/5 p-5">
              <Row label="Bank Name" value={siteConfig.bankDetails.bankName} />
              <Row label="Account Name" value={siteConfig.bankDetails.accountName} />
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-text-faint">Account Number</span>
                <button
                  onClick={handleCopyAccount}
                  className="flex items-center gap-2 font-display text-lg tabular text-gold hover:text-gold-bright transition-colors"
                >
                  {siteConfig.bankDetails.accountNumber}
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              <div className="mt-2 border-t border-gold/20 pt-3">
                <Row
                  label="Amount to Transfer"
                  value={`₦${subtotal.toLocaleString("en-NG")}`}
                  emphasize
                />
              </div>
            </div>

            {!isFirebaseConfigured && (
              <p className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-3 py-2 text-xs text-yellow-200/80">
                Note: order tracking isn&apos;t fully connected yet on this site. Please
                also send your details on WhatsApp after transferring, so we don&apos;t
                miss your order.
              </p>
            )}

            {error && (
              <p className="mt-4 rounded-lg border border-red-400/30 bg-red-400/5 px-3 py-2 text-xs text-red-300">
                {error}
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStep("details")}
                className="rounded-full border border-white/10 px-5 py-3 text-sm text-text-muted hover:border-white/30 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirmTransfer}
                disabled={submitting}
                className="btn-primary flex-1 rounded-full py-3 text-sm font-semibold disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "I've Made Transfer — Confirm Payment"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order summary sidebar */}
      <div className="rounded-2xl border border-white/[0.06] bg-surface p-6 h-fit lg:sticky lg:top-28">
        <h3 className="font-display text-lg text-text-primary mb-4">Order Summary</h3>
        <div className="flex flex-col gap-2 text-sm">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-text-muted">
              <span className="truncate pr-2">
                {item.name} × {item.quantity}
              </span>
              <span className="tabular shrink-0">
                ₦{(item.price * item.quantity).toLocaleString("en-NG")}
              </span>
            </div>
          ))}
        </div>
        <div className="gold-rule my-4" />
        <div className="flex justify-between font-display text-lg text-text-primary">
          <span>Total</span>
          <span className="tabular">₦{subtotal.toLocaleString("en-NG")}</span>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-text-muted">{label}</span>
      {children}
    </label>
  );
}

function Row({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-text-faint">{label}</span>
      <span
        className={
          emphasize
            ? "font-display text-xl text-gradient-gold tabular"
            : "text-sm text-text-primary"
        }
      >
        {value}
      </span>
    </div>
  );
}
