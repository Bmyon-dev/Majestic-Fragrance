import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showNumber?: boolean;
}

export function StarRating({
  rating,
  reviewCount,
  size = 14,
  showNumber = false,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-gold text-gold" : "text-text-faint"}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="text-xs text-text-muted tabular">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-text-muted">({reviewCount})</span>
      )}
    </div>
  );
}
