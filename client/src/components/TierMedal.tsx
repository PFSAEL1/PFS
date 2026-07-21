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
    outerRing: ['#cd7f32', '#a0522d', '#e8a862', '#cd7f32'],
    innerCircle: ['#f4c78e', '#e8a862', '#cd7f32', '#8b4513'],
    ribbon: ['#cd7f32', '#8b4513'],
    cardBorder: ['#cd7f32', '#8b4513', '#cd7f32'],
    highlight: '#f4c78e',
    textColor: '#e8a862',
  },
  silver: {
    label: 'SILVER',
    outerRing: ['#ffffff', '#c0c0c0', '#e8e8e8', '#a8a8a8'],
    innerCircle: ['#ffffff', '#e8e8e8', '#c0c0c0', '#909090'],
    ribbon: ['#c0c0c0', '#707070'],
    cardBorder: ['#e8e8e8', '#909090', '#e8e8e8'],
    highlight: '#ffffff',
    textColor: '#e0e0e0',
  },
  gold: {
    label: 'GOLD',
    outerRing: ['#ffd700', '#daa520', '#fff2a0', '#b8860b'],
    innerCircle: ['#fff8b0', '#ffd700', '#daa520', '#996515'],
    ribbon: ['#ffd700', '#b8860b'],
    cardBorder: ['#ffd700', '#b8860b', '#ffd700'],
    highlight: '#fffacd',
    textColor: '#ffd700',
  },
  platinum: {
    label: 'PLATINUM',
    outerRing: ['#e8e8e8', '#b0b0b0', '#f0f0f0', '#8e8e8e'],
    innerCircle: ['#f8f8ff', '#e0e0e0', '#b8b8b8', '#808080'],
    ribbon: ['#c8c8c8', '#6e6e6e'],
    cardBorder: ['#e0e0e0', '#808080', '#e0e0e0'],
    highlight: '#ffffff',
    textColor: '#e0e0e0',
  },
};

export function TierMedal({ tier, size = 120, className = '', showLabel = true }: TierMedalProps) {
  const config = tierConfigs[tier];
  const id = `medal-${tier}-${Math.random().toString(36).slice(2, 8)}`;

  // Aspect ratio: card is taller than wide (like the inspo)
  const cardWidth = size;
  const cardHeight = showLabel ? size * 1.45 : size * 1.1;
  const viewW = 100;
  const viewH = showLabel ? 145 : 110;
  const cx = 50;
  const cy = 48;

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
        <linearGradient id={`${id}-card-border`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.cardBorder[0]} stopOpacity="0.6" />
          <stop offset="50%" stopColor={config.cardBorder[1]} stopOpacity="0.3" />
          <stop offset="100%" stopColor={config.cardBorder[2]} stopOpacity="0.6" />
        </linearGradient>
        {/* Outer ring gradient */}
        <linearGradient id={`${id}-outer`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.outerRing[0]} />
          <stop offset="33%" stopColor={config.outerRing[1]} />
          <stop offset="66%" stopColor={config.outerRing[2]} />
          <stop offset="100%" stopColor={config.outerRing[3]} />
        </linearGradient>
        {/* Inner circle gradient */}
        <radialGradient id={`${id}-inner`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor={config.innerCircle[0]} />
          <stop offset="35%" stopColor={config.innerCircle[1]} />
          <stop offset="70%" stopColor={config.innerCircle[2]} />
          <stop offset="100%" stopColor={config.innerCircle[3]} />
        </radialGradient>
        {/* Ribbon gradient left */}
        <linearGradient id={`${id}-ribbon-l`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.ribbon[0]} />
          <stop offset="100%" stopColor={config.ribbon[1]} />
        </linearGradient>
        {/* Ribbon gradient right */}
        <linearGradient id={`${id}-ribbon-r`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={config.ribbon[0]} />
          <stop offset="100%" stopColor={config.ribbon[1]} />
        </linearGradient>
        {/* Drop shadow */}
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="rgba(0,0,0,0.5)" floodOpacity="0.5" />
        </filter>
        {/* Card glow */}
        <filter id={`${id}-glow`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={config.outerRing[0]} floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Card background with metallic border */}
      <rect
        x="3" y="3"
        width={viewW - 6} height={viewH - 6}
        rx="12" ry="12"
        fill="#111111"
        stroke={`url(#${id}-card-border)`}
        strokeWidth="1.5"
        filter={`url(#${id}-glow)`}
      />

      {/* Ribbons behind medal */}
      <path
        d={`M${cx - 10} ${cy + 18} L${cx - 16} ${cy + 38} L${cx - 8} ${cy + 32} L${cx - 4} ${cy + 40} L${cx - 3} ${cy + 20}`}
        fill={`url(#${id}-ribbon-l)`}
        opacity="0.85"
      />
      <path
        d={`M${cx + 10} ${cy + 18} L${cx + 16} ${cy + 38} L${cx + 8} ${cy + 32} L${cx + 4} ${cy + 40} L${cx + 3} ${cy + 20}`}
        fill={`url(#${id}-ribbon-r)`}
        opacity="0.85"
      />

      {/* Medal body */}
      <g filter={`url(#${id}-shadow)`}>
        {/* Outer ring */}
        <circle cx={cx} cy={cy} r="28" fill={`url(#${id}-outer)`} />
        {/* Inner border ring */}
        <circle cx={cx} cy={cy} r="24" fill="none" stroke={config.outerRing[1]} strokeWidth="1" opacity="0.6" />
        {/* Inner circle (main face) */}
        <circle cx={cx} cy={cy} r="22" fill={`url(#${id}-inner)`} />
        {/* Decorative inner ring */}
        <circle cx={cx} cy={cy} r="18" fill="none" stroke={config.outerRing[1]} strokeWidth="0.6" opacity="0.4" />
        {/* Highlight reflection */}
        <ellipse cx={cx - 6} cy={cy - 7} rx="9" ry="6" fill={config.highlight} opacity="0.3" />
        {/* Small center dot */}
        <circle cx={cx} cy={cy} r="3" fill={config.outerRing[1]} opacity="0.3" />
      </g>

      {/* Label text */}
      {showLabel && (
        <>
          <text
            x={cx}
            y={viewH - 28}
            textAnchor="middle"
            fill={config.textColor}
            fontSize="10"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="1.5"
          >
            {config.label}
          </text>
          <text
            x={cx}
            y={viewH - 15}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="7"
            fontWeight="600"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.8"
          >
            MEMBER
          </text>
        </>
      )}
    </svg>
  );
}

export default TierMedal;
