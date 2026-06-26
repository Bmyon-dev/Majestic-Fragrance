interface RatingBarsProps {
  label: string;
  value: number; // 1-5
  max?: number;
}

export function RatingBars({ label, value, max = 5 }: RatingBarsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-text-muted">{label}</span>
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-6 rounded-full ${
              i < value
                ? "bg-gradient-to-r from-purple to-magenta"
                : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
