"use client";

import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Users,
  Mail,
  MessageCircle,
  AlertTriangle,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  fetchNewsletterSubscribers,
  fetchWhatsAppClickCount,
  fetchVisitorStats,
  NewsletterRecord,
} from "@/lib/admin-data";
import { fetchAllOrders } from "@/lib/tracking";
import { OrderRecord } from "@/data/order-types";
import { products } from "@/data/products";
import { AdminOrdersPanel } from "./AdminOrdersPanel";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterRecord[]>([]);
  const [waClicks, setWaClicks] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const [o, s, w, v] = await Promise.all([
      fetchAllOrders(),
      fetchNewsletterSubscribers(),
      fetchWhatsAppClickCount(),
      fetchVisitorStats(),
    ]);
    setOrders(o);
    setSubscribers(s);
    setWaClicks(w);
    setTotalViews(v.reduce((sum, day) => sum + day.views, 0));
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleLogout() {
    await fetch("/api/admin-auth", { method: "DELETE" });
    onLogout();
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.subtotal, 0);
  const pendingCount = orders.filter((o) => o.status === "pending_verification").length;
  const outOfStockCount = products.filter((p) => !p.inStock).length;

  return (
    <div className="min-h-screen bg-void px-5 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark size={36} />
            <div>
              <h1 className="font-display text-xl text-text-primary">Admin Dashboard</h1>
              <p className="text-xs text-text-faint">Majestic Fragrance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-muted hover:border-gold/40 transition-colors"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-muted hover:border-red-400/40 hover:text-red-400 transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Firebase not connected banner */}
        {!isFirebaseConfigured && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-5">
            <AlertTriangle size={20} className="mt-0.5 shrink-0 text-gold" />
            <div>
              <p className="font-medium text-text-primary">
                Firebase is not connected yet
              </p>
              <p className="mt-1 text-sm text-text-muted">
                Orders, newsletter signups, and visitor stats will appear here
                once Firebase config keys are added to your environment
                variables. See <code className="text-gold">.env.example</code> and{" "}
                <code className="text-gold">lib/firebase.ts</code> for setup
                instructions. The site works fully without it — this just
                means nothing is being logged to a database yet.
              </p>
            </div>
          </div>
        )}

        {/* Stat cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          <StatCard
            icon={ShoppingBag}
            label="Total Orders"
            value={orders.length.toString()}
          />
          <StatCard
            icon={AlertTriangle}
            label="Awaiting Verification"
            value={pendingCount.toString()}
            highlight={pendingCount > 0}
          />
          <StatCard
            icon={ShoppingBag}
            label="Revenue (Logged)"
            value={`₦${totalRevenue.toLocaleString("en-NG")}`}
          />
          <StatCard
            icon={MessageCircle}
            label="WhatsApp Clicks"
            value={waClicks.toString()}
          />
          <StatCard
            icon={Users}
            label="Total Page Views"
            value={totalViews.toString()}
          />
        </div>

        {/* Product / inventory note */}
        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-text-primary">Catalog</h2>
            <span className="text-xs text-text-faint">
              {products.length} products · {outOfStockCount} out of stock
            </span>
          </div>
          <p className="mt-2 text-sm text-text-muted">
            Products and prices are managed directly in{" "}
            <code className="text-gold">data/products.ts</code> in the
            codebase. Edit the file, commit, and push to GitHub — Vercel will
            redeploy automatically with your changes.
          </p>
        </div>

        {/* Orders management */}
        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-surface p-6">
          <h2 className="font-display text-lg text-text-primary mb-4">Orders</h2>
          {!isFirebaseConfigured ? (
            <p className="text-sm text-text-faint">
              Connect Firebase to start receiving and managing orders here.
            </p>
          ) : (
            <AdminOrdersPanel orders={orders} onOrdersChange={setOrders} />
          )}
        </div>

        {/* Newsletter subscribers */}
        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-surface p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail size={18} className="text-gold" />
            <h2 className="font-display text-lg text-text-primary">
              Newsletter Subscribers ({subscribers.length})
            </h2>
          </div>
          {subscribers.length === 0 ? (
            <p className="text-sm text-text-faint">
              {isFirebaseConfigured
                ? "No subscribers yet."
                : "Connect Firebase to start collecting subscriber emails here."}
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {subscribers.map((s) => (
                <span
                  key={s.id}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-text-muted"
                >
                  {s.email}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: typeof ShoppingBag;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight ? "border-yellow-400/40 bg-yellow-400/5" : "border-white/[0.06] bg-surface"
      }`}
    >
      <Icon size={18} className={highlight ? "text-yellow-300" : "text-gold"} />
      <p className="mt-3 font-display text-2xl text-text-primary tabular">{value}</p>
      <p className="mt-1 text-xs text-text-faint">{label}</p>
    </div>
  );
}
