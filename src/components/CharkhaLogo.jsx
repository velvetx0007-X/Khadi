import React from 'react';

export default function CharkhaLogo({ className = "w-8 h-8", animated = true }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full text-khadi-500 fill-current ${animated ? 'animate-spin-slow' : ''}`}
      >
        {/* Outer Rim */}
        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="5" fill="none" className="text-khadi-600" />
        <circle cx="50" cy="50" r="36" stroke="#D97706" strokeWidth="1.5" fill="none" opacity="0.6" />

        {/* Hub */}
        <circle cx="50" cy="50" r="10" fill="#B45A1C" />
        <circle cx="50" cy="50" r="5" fill="#FFFFFF" />

        {/* Charkha Wheel Spokes (12 Traditional Spokes) */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
          <line
            key={idx}
            x1="50"
            y1="50"
            x2={50 + 38 * Math.cos((angle * Math.PI) / 180)}
            y2={50 + 38 * Math.sin((angle * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
      </svg>
      {/* Decorative Thread Accent */}
      <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
      </span>
    </div>
  );
}
