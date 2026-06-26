import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center px-5 pt-24 text-center">
        <LogoMark size={56} className="opacity-40" />
        <h1 className="font-display mt-6 text-4xl text-text-primary md:text-5xl">
          404
        </h1>
        <p className="mt-3 max-w-md text-text-muted">
          This page has drifted off like a fading top note. Let&apos;s get you
          back to something more lasting.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button href="/">Back to Home</Button>
          <Button href="/shop" variant="outline">
            Shop Collection
          </Button>
        </div>
        <Link href="/" className="sr-only">
          Return home
        </Link>
      </main>
      <Footer />
    </>
  );
}
