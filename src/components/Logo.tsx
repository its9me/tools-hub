import React from 'react';

interface LogoProps {
  size?: number | string;
  className?: string;
  glow?: boolean;
}

export default function Logo({ size = 100, className = '', glow = true }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none`}
    >
      <defs>
        {/* Glow effect filter */}
        <filter id="thLogoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        {/* Outer Ring Gradient */}
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" /> {/* Cyan */}
          <stop offset="50%" stopColor="#3b82f6" /> {/* Royal Blue */}
          <stop offset="100%" stopColor="#c084fc" /> {/* Purple */}
        </linearGradient>

        {/* Inner Ring Gradient */}
        <linearGradient id="innerRingGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#d946ef" stopOpacity="0.1" />
        </linearGradient>

        {/* TH Letter Gradient */}
        <linearGradient id="hPillarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" /> {/* Cyan */}
          <stop offset="50%" stopColor="#3b82f6" /> {/* Royal Blue */}
          <stop offset="100%" stopColor="#a855f7" /> {/* Violet/Purple */}
        </linearGradient>
      </defs>

      {/* Outer Glowing Circle Ring */}
      <circle 
        cx="60" 
        cy="60" 
        r="54" 
        stroke="url(#ringGrad)" 
        strokeWidth="3.2" 
        fill="transparent" 
        filter={glow ? "url(#thLogoGlow)" : undefined}
        opacity="0.95"
      />

      {/* Subtle Inner Ring */}
      <circle 
        cx="60" 
        cy="60" 
        r="50" 
        stroke="url(#innerRingGrad)" 
        strokeWidth="1.2" 
        fill="#050716" 
        fillOpacity="0.85"
      />

      {/* Logo Letters Group - T and H */}
      <g transform="translate(4, 5)">
        {/* 
          T - Letter in solid white and modern dynamic cut.
          Points tracing:
          - Top bar: Slanted from left-low to right-high.
          - Left tip of top bar hooks slightly down.
          - Stem drops down and terminates near the pixel-burst. 
        */}
        <path 
          d="M 32 39 
             L 32 45 
             L 42 45 
             L 42 71 
             C 42 74 44 76 48 76 
             L 51 76 
             L 51 45 
             L 66 45 
             L 66 39 
             L 66 28 
             L 34 35 Z" 
          fill="#FFFFFF" 
          stroke="#FFFFFF" 
          strokeWidth="1.2" 
          strokeLinejoin="miter"
        />

        {/* 
          H - Letter in gorgeous vibrant cyan/blue/purple gradient.
          Stands adjacent on the right. 
        */}
        <path 
          d="M 57 26 
             L 57 77 
             C 57 80 59 81 63 81 
             L 67 81 
             L 67 56 
             L 77 56 
             L 77 81 
             C 77 84 79 85 83 85 
             L 87 85 
             L 87 26 
             C 87 23 85 22 81 22 
             L 77 22 
             L 77 47 
             L 67 47 
             L 67 26 
             C 67 23 65 22 61 22 Z" 
          fill="url(#hPillarGrad)" 
        />
      </g>

      {/* Floating digital pixels / particles scattering off the bottom left */}
      {/* Pixel 1 (Purple - high stdDeviation neon) */}
      <rect x="36" y="60" width="6" height="6" rx="1" fill="#c084fc" filter={glow ? "url(#thLogoGlow)" : undefined} />
      {/* Pixel 2 (Cyan - bright center) */}
      <rect x="42" y="66" width="8" height="8" rx="1.5" fill="#22d3ee" filter={glow ? "url(#thLogoGlow)" : undefined} />
      {/* Pixel 3 (Light Sky Blue - low left) */}
      <rect x="32" y="73" width="7" height="7" rx="1.2" fill="#38bdf8" />
      {/* Pixel 4 (Deep Royal Blue - lowest left) */}
      <rect x="38" y="80" width="5.5" height="5.5" rx="1" fill="#3b82f6" />
    </svg>
  );
}
