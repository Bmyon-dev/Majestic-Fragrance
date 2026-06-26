interface LogoMarkProps {
  className?: string;
  size?: number;
}

/**
 * The Majestic Fragrance mark: a crowned circle with a stylised silhouette
 * inside — recreated from the brand's existing poster logo, refined for
 * crisp rendering from favicon size up to full hero scale.
 */
export function LogoMark({ className = "", size = 40 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Majestic Fragrance crest"
    >
      <defs>
        <linearGradient id="mf-circle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="mf-crown-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c989" />
          <stop offset="100%" stopColor="#d4af6a" />
        </linearGradient>
      </defs>

      {/* Crown */}
      <path
        d="M 35 30 L 40 18 L 50 26 L 60 18 L 65 30 L 60 32 L 40 32 Z"
        fill="url(#mf-crown-grad)"
      />
      <circle cx="40" cy="18" r="2.6" fill="#d4af6a" />
      <circle cx="50" cy="26" r="2.6" fill="#e8c989" />
      <circle cx="60" cy="18" r="2.6" fill="#d4af6a" />

      {/* Circle badge */}
      <circle cx="50" cy="62" r="32" fill="url(#mf-circle-grad)" />
      <circle
        cx="50"
        cy="62"
        r="32"
        fill="none"
        stroke="#e8c989"
        strokeWidth="0.75"
        opacity="0.6"
      />

      {/* Inner mark — abstracted bottle/M silhouette, lighter purple on the badge */}
      <path
        d="M 38 78 L 38 52 Q 38 47 43 47 L 43 44 Q 43 41 46 41 L 54 41 Q 57 41 57 44 L 57 47 Q 62 47 62 52 L 62 78 Z"
        fill="#e9d5ff"
        opacity="0.92"
      />
      <rect x="47" y="36" width="6" height="6" rx="1" fill="#e9d5ff" opacity="0.92" />
    </svg>
  );
}

interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
  markSize?: number;
}

/**
 * Full lockup: crest + wordmark, matching the poster's horizontal layout.
 */
export function Logo({ variant = "full", className = "", markSize = 44 }: LogoProps) {
  if (variant === "mark") {
    return <LogoMark size={markSize} className={className} />;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={markSize} />
      <div className="font-display leading-tight">
        <div className="text-lg md:text-xl font-semibold tracking-wide text-text-primary">
          Majestic
        </div>
        <div className="text-lg md:text-xl font-semibold tracking-wide text-gradient-gold -mt-1">
          Fragrance
        </div>
      </div>
    </div>
  );
}
