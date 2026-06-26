"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/combos", label: "Combo Packages" },
  { href: "/shop?category=mens", label: "Men" },
  { href: "/shop?category=womens", label: "Women" },
  { href: "/about", label: "About" },
  { href: "/track", label: "Track Order" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "glass-panel border-b border-white/[0.06]"
          : "bg-gradient-to-b from-void/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" aria-label="Majestic Fragrance home">
          <Logo markSize={38} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Majestic Fragrance on Instagram"
            className="text-text-muted hover:text-gold transition-colors"
          >
            <InstagramIcon size={18} />
          </a>
          <Link
            href="/checkout"
            aria-label={`View cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            className="relative text-text-muted hover:text-gold transition-colors"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-purple to-magenta text-[10px] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>
          <Button href="/shop" variant="primary" size="sm">
            Shop Collection
          </Button>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <Link
            href="/checkout"
            aria-label={`View cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            className="relative text-text-primary"
          >
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-purple to-magenta text-[10px] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="text-text-primary"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-void lg:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <Logo markSize={36} />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="text-text-primary"
            >
              <X size={26} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-start gap-1 px-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="w-full border-b border-white/5 py-4 font-display text-2xl text-text-primary hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 flex w-full flex-col gap-3">
              <Button href="/checkout" variant="outline" size="md" className="w-full">
                View Cart {itemCount > 0 ? `(${itemCount})` : ""}
              </Button>
              <Button href="/shop" variant="primary" size="md" className="w-full">
                Shop Collection
              </Button>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-text-muted py-2"
              >
                <InstagramIcon size={18} /> {siteConfig.instagramHandle}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
