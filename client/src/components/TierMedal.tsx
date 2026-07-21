import React from 'react';

interface TierMedalProps {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  size?: number;
  className?: string;
  showLabel?: boolean;
}

const tierConfigs = {
  bronze: {
    label: 'BRONZE',
    // Warm copper/rose gold tones
    border: ['#d4a574', '#8b5e3c', '#d4a574', '#a0724a'],
    outerRing: ['#d4a574', '#8b5e3c', '#c9956a', '#6b4226'],
    innerFace: ['#f0c8a8', '#d4a574', '#b8845a', '#8b5e3c'],
    ribbon: ['#d4a574', '#8b5e3c', '#6b4226'],
    textGradient: ['#d4a574', '#8b5e3c'],
    glowColor: 'rgba(212,165,116,0.12)',
  },
  silver: {
    label: 'SILVER',
    // Cool white/silver with glass-like border
    border: ['#ffffff', '#a0a0a0', '#e8e8e8', '#808080'],
    outerRing: ['#e0e0e0', '#a0a0a0', '#d0d0d0', '#808080'],
    innerFace: ['#ffffff', '#e8e8e8', '#c8c8c8', '#a0a0a0'],
    ribbon: ['#c0c0c0', '#808080', '#606060'],
    textGradient: ['#ffffff', '#a0a0a0'],
    glowColor: 'rgba(255,255,255,0.1)',
  },
  gold: {
    label: 'GOLD',
    // Rich gold tones
    border: ['#ffd700', '#b8860b', '#ffd700', '#996515'],
    outerRing: ['#ffd700', '#b8860b', '#e6c200', '#8b6914'],
    innerFace: ['#fff5a0', '#ffd700', '#daa520', '#b8860b'],
    ribbon: ['#ffd700', '#b8860b', '#8b6914'],
    textGradient: ['#ffd700', '#b8860b'],
    glowColor: 'rgba(255,215,0,0.12)',
  },
  platinum: {
    label: 'PLATINUM',
    // Elegant cool platinum
    border: ['#e8e8e8', '#8e8e8e', '#d0d0d0', '#6e6e6e'],
    outerRing: ['#d8d8d8', '#9e9e9e', '#c8c8c8', '#7e7e7e'],
    innerFace: ['#f0f0f0', '#d8d8d8', '#b8b8b8', '#909090'],
    ribbon: ['#b8b8b8', '#7e7e7e', '#5e5e5e'],
    textGradient: ['#e0e0e0', '#909090'],
    glowColor: 'rgba(200,200,200,0.1)',
  },
};

export function TierMedal({ tier, size = 120, className = '', showLabel = true }: TierMedalProps) {
  const config = tierConfigs[tier];
  const id = `medal-${tier}-${Math.random().toString(36).slice(2, 8)}`;

  const viewW = 100;
  const viewH = 140;
  const cardWidth = size;
  const cardHeight = size * (viewH / viewW);
  const cx = 50;
  const medalCy = 52;

  return (
    <svg
      width={cardWidth}
      height={cardHeight}
      viewBox={`0 0 ${viewW} ${viewH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Card border gradient */}
        <linearGradient id={`${id}-border`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.border[0]} />
          <stop offset="35%" stopColor={config.border[1]} />
          <stop offset="65%" stopColor={config.border[2]} />
          <stop offset="100%" stopColor={config.border[3]} />
        </linearGradient>
        {/* Outer ring gradient */}
        <linearGradient id={`${id}-outer`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor={config.outerRing[0]} />
          <stop offset="33%" stopColor={config.outerRing[1]} />
          <stop offset="66%" stopColor={config.outerRing[2]} />
          <stop offset="100%" stopColor={config.outerRing[3]} />
        </linearGradient>
        {/* Inner face radial gradient */}
        <radialGradient id={`${id}-face`} cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor={config.innerFace[0]} />
          <stop offset="30%" stopColor={config.innerFace[1]} />
          <stop offset="65%" stopColor={config.innerFace[2]} />
          <stop offset="100%" stopColor={config.innerFace[3]} />
        </radialGradient>
        {/* Ribbon gradient */}
        <linearGradient id={`${id}-ribbon`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={config.ribbon[0]} />
          <stop offset="50%" stopColor={config.ribbon[1]} />
          <stop offset="100%" stopColor={config.ribbon[2]} />
        </linearGradient>
        {/* Text gradient */}
        <linearGradient id={`${id}-text`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={config.textGradient[0]} />
          <stop offset="100%" stopColor={config.textGradient[1]} />
        </linearGradient>
        {/* Shadow filter */}
        <filter id={`${id}-shadow`} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.6)" floodOpacity="0.6" />
        </filter>
        {/* Card shadow */}
        <filter id={`${id}-card-shadow`} x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.4)" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Card background */}
      <rect
        x="4" y="4"
        width={viewW - 8} height={viewH - 8}
        rx="10" ry="10"
        fill="#1a1a1f"
        filter={`url(#${id}-card-shadow)`}
      />
      {/* Card metallic border */}
      <rect
        x="4" y="4"
        width={viewW - 8} height={viewH - 8}
        rx="10" ry="10"
        fill="none"
        stroke={`url(#${id}-border)`}
        strokeWidth="2"
      />
      {/* Subtle inner card highlight at top */}
      <rect
        x="6" y="6"
        width={viewW - 12} height="30"
        rx="8" ry="8"
        fill="url(#none)"
        opacity="0"
      />
      <ellipse cx={cx} cy="8" rx="30" ry="4" fill="white" opacity="0.04" />

      {/* Ribbon - V-shaped, wider like the inspo */}
      <path
        d={`M${cx - 8} ${medalCy + 16} L${cx - 14} ${medalCy + 36} L${cx - 6} ${medalCy + 30} L${cx} ${medalCy + 38} L${cx + 6} ${medalCy + 30} L${cx + 14} ${medalCy + 36} L${cx + 8} ${medalCy + 16} Z`}
        fill={`url(#${id}-ribbon)`}
        opacity="0.9"
      />

      {/* Medal body */}
      <g filter={`url(#${id}-shadow)`}>
        {/* Outer ring (thick) */}
        <circle cx={cx} cy={medalCy} r="26" fill={`url(#${id}-outer)`} />
        {/* Dark separator ring */}
        <circle cx={cx} cy={medalCy} r="22" fill="#1a1a1f" />
        {/* Inner face */}
        <circle cx={cx} cy={medalCy} r="20" fill={`url(#${id}-face)`} />
        {/* Decorative inner ring */}
        <circle cx={cx} cy={medalCy} r="16" fill="none" stroke={config.outerRing[0]} strokeWidth="0.5" opacity="0.4" />
        {/* Top highlight reflection */}
        <ellipse cx={cx - 4} cy={medalCy - 8} rx="8" ry="5" fill="white" opacity="0.25" />
        {/* Bottom subtle reflection */}
        <ellipse cx={cx + 3} cy={medalCy + 6} rx="5" ry="3" fill="white" opacity="0.08" />
      </g>

      {/* Tier label in serif font */}
      {showLabel && (
        <>
          <text
            x={cx}
            y={viewH - 26}
            textAnchor="middle"
            fill={`url(#${id}-text)`}
            fontSize="14"
            fontWeight="700"
            fontFamily="'Georgia', 'Times New Roman', 'Playfair Display', serif"
            letterSpacing="2"
          >
            {config.label}
          </text>
          <text
            x={cx}
            y={viewH - 12}
            textAnchor="middle"
            fill={`url(#${id}-text)`}
            fontSize="9"
            fontWeight="600"
            fontFamily="'Georgia', 'Times New Roman', 'Playfair Display', serif"
            letterSpacing="1.5"
            opacity="0.7"
          >
            MEMBER
          </text>
        </>
      )}
    </svg>
  );
}

export default TierMedal;
