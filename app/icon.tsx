import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>
          <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8c989" />
            <stop offset="100%" stopColor="#d4af6a" />
          </linearGradient>
        </defs>
        <path d="M 35 30 L 40 18 L 50 26 L 60 18 L 65 30 L 60 32 L 40 32 Z" fill="url(#g2)" />
        <circle cx="40" cy="18" r="2.6" fill="#d4af6a" />
        <circle cx="50" cy="26" r="2.6" fill="#e8c989" />
        <circle cx="60" cy="18" r="2.6" fill="#d4af6a" />
        <circle cx="50" cy="62" r="32" fill="url(#g1)" />
        <path
          d="M 38 78 L 38 52 Q 38 47 43 47 L 43 44 Q 43 41 46 41 L 54 41 Q 57 41 57 44 L 57 47 Q 62 47 62 52 L 62 78 Z"
          fill="#e9d5ff"
        />
        <rect x="47" y="36" width="6" height="6" rx="1" fill="#e9d5ff" />
      </svg>
    ),
    { ...size }
  );
}
