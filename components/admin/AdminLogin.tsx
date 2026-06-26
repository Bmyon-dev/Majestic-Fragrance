"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";

interface AdminLoginProps {
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || "Incorrect password.");
      }
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-5">
      <div className="w-full max-w-sm rounded-3xl border border-white/[0.06] bg-surface p-8">
        <div className="flex justify-center">
          <LogoMark size={56} />
        </div>
        <h1 className="font-display mt-5 text-center text-2xl text-text-primary">
          Admin Access
        </h1>
        <p className="mt-1 text-center text-sm text-text-muted">
          Enter the admin password to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint"
            />
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-full border border-white/10 bg-void py-3 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-faint focus:border-gold outline-none transition-colors"
            />
          </div>

          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary rounded-full py-3 font-semibold disabled:opacity-60"
          >
            {loading ? "Checking…" : "Enter Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
