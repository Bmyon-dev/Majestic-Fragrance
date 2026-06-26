"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, MessageSquarePlus } from "lucide-react";
import { submitReview, fetchReviewsForProduct } from "@/lib/tracking";
import { ProductReview } from "@/data/order-types";
import { isFirebaseConfigured } from "@/lib/firebase";

interface ProductReviewsProps {
  productId: string;
  productSlug: string;
}

export function ProductReviews({ productId, productSlug }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    const data = await fetchReviewsForProduct(productSlug);
    setReviews(data);
    setLoading(false);
  }, [productSlug]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    const success = await submitReview({
      productId,
      productSlug,
      name: name.trim(),
      rating,
      text: text.trim(),
    });
    setSubmitting(false);
    if (success) {
      setSubmitted(true);
      setName("");
      setText("");
      setRating(5);
      await loadReviews();
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
      }, 2000);
    }
  }

  return (
    <div className="mt-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl text-text-primary">
          Customer Reviews {reviews.length > 0 && `(${reviews.length})`}
        </h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-sm text-gold hover:bg-gold/10 transition-colors"
        >
          <MessageSquarePlus size={16} />
          Write a Review
        </button>
      </div>

      {!isFirebaseConfigured && (
        <p className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-200/80">
          Reviews aren&apos;t saving permanently yet — connect Firebase to start
          collecting real customer reviews here.
        </p>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-2xl border border-white/[0.06] bg-surface p-6"
        >
          {submitted ? (
            <p className="text-center text-success py-4">
              Thank you for your review!
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs text-text-muted">Your Name</span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tobi A."
                    className="input-field"
                  />
                </label>

                <div>
                  <span className="text-xs text-text-muted">Your Rating</span>
                  <div className="mt-2 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const value = i + 1;
                      const filled = value <= (hoverRating || rating);
                      return (
                        <button
                          type="button"
                          key={value}
                          onClick={() => setRating(value)}
                          onMouseEnter={() => setHoverRating(value)}
                          onMouseLeave={() => setHoverRating(0)}
                          aria-label={`Rate ${value} stars`}
                          className="p-0.5"
                        >
                          <Star
                            size={22}
                            className={filled ? "fill-gold text-gold" : "text-text-faint"}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs text-text-muted">Your Review</span>
                  <textarea
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell us what you thought of this fragrance..."
                    rows={4}
                    className="input-field resize-none"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary mt-5 w-full rounded-full py-3 text-sm font-semibold disabled:opacity-60"
              >
                {submitting ? "Posting…" : "Post Review"}
              </button>
            </>
          )}
        </form>
      )}

      {loading ? (
        <p className="text-sm text-text-faint">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-text-faint">
          No reviews yet — be the first to share your experience.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-white/[0.06] bg-surface p-5"
            >
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={
                      i < review.rating ? "fill-gold text-gold" : "text-text-faint"
                    }
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-text-muted">{review.text}</p>
              <p className="mt-3 text-xs font-medium text-text-primary">
                {review.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
