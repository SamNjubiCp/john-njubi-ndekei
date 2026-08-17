export function Canopy() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 180"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c5d6c9" />
          <stop offset="100%" stopColor="#e4ede6" />
        </linearGradient>
      </defs>
      <rect width="1200" height="180" fill="url(#sky)" />
      <g className="canopy-drift" fill="#3f6b4f" opacity="0.55">
        <ellipse cx="80" cy="20" rx="160" ry="70" />
        <ellipse cx="280" cy="8" rx="190" ry="80" />
        <ellipse cx="520" cy="18" rx="210" ry="78" />
        <ellipse cx="760" cy="6" rx="180" ry="84" />
        <ellipse cx="980" cy="22" rx="200" ry="72" />
        <ellipse cx="1160" cy="10" rx="150" ry="70" />
      </g>
      <g fill="#24352c" opacity="0.28">
        <ellipse cx="160" cy="36" rx="120" ry="48" />
        <ellipse cx="430" cy="28" rx="140" ry="52" />
        <ellipse cx="700" cy="40" rx="130" ry="46" />
        <ellipse cx="980" cy="30" rx="150" ry="50" />
      </g>
      <g className="lantern-breathe">
        <circle cx="90" cy="14" r="3.5" fill="#f0c36a" />
        <circle cx="340" cy="10" r="4" fill="#f0c36a" />
        <circle cx="640" cy="12" r="3.5" fill="#f0c36a" />
        <circle cx="1120" cy="11" r="3.5" fill="#f0c36a" />
      </g>
    </svg>
  );
}
