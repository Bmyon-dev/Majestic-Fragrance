"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/data/site-config";
import { logNewsletterSignup } from "@/lib/tracking";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    await logNewsletterSignup(email);
    setSubmitted(true);
    setEmail("");
  }

  // Clicking the copyright line 3 times within a few seconds opens the
  // admin login. This keeps it invisible to ordinary visitors while still
  // being easy for the site owner to find and use.
  function handleCopyrightClick() {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 3) {
      window.location.href = "/admin";
    } else {
      setTimeout(() => setClickCount(0), 2000);
    }
  }

  return (
    <footer className="border-t border-white/[0.06] bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo markSize={40} />
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              {siteConfig.tagline}
            </p>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-text-muted hover:text-gold transition-colors"
            >
              <InstagramIcon size={16} /> {siteConfig.instagramHandle}
            </a>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="eyebrow mb-4">Shop</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-text-muted">
              <li><Link href="/shop" className="hover:text-gold transition-colors">All Fragrances</Link></li>
              <li><Link href="/shop?category=mens" className="hover:text-gold transition-colors">Men&apos;s Collection</Link></li>
              <li><Link href="/shop?category=womens" className="hover:text-gold transition-colors">Women&apos;s Collection</Link></li>
              <li><Link href="/combos" className="hover:text-gold transition-colors">Combo Packages</Link></li>
              <li><Link href="/shop?filter=best-sellers" className="hover:text-gold transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="eyebrow mb-4">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-gold" />
                <span>{siteConfig.whatsappDisplay}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-gold" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold transition-colors break-all">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="eyebrow mb-4">Stay Updated</h4>
            <p className="text-sm text-text-muted mb-4">
              New arrivals, restocks, and combo offers — straight to your inbox.
            </p>
            {submitted ? (
              <p className="text-sm text-success">You&apos;re subscribed. Thank you!</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="rounded-full border border-white/10 bg-void px-4 py-2.5 text-sm text-text-primary placeholder:text-text-faint focus:border-gold outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="btn-primary rounded-full px-4 py-2.5 text-sm font-semibold"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="gold-rule my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-text-faint md:flex-row">
          <button
            onClick={handleCopyrightClick}
            className="cursor-default select-none text-left transition-colors hover:text-text-faint"
            aria-label="Majestic Fragrance copyright"
          >
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </button>
          <p>{siteConfig.paymentMethod}</p>
        </div>
      </div>
    </footer>
  );
}
