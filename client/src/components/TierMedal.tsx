import React from 'react';

interface TierMedalProps {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  size?: number;
  className?: string;
}

const tierConfigs = {
  bronze: {
    outerRing: ['#cd7f32', '#a0522d', '#cd7f32'],
    innerCircle: ['#e8a862', '#cd7f32', '#8b4513'],
    highlight: '#f4c78e',
    ribbon: ['#cd7f32', '#8b4513'],
    shadow: 'rgba(205,127,50,0.4)',
  },
  silver: {
    outerRing: ['#e8e8e8', '#b0b0b0', '#e8e8e8'],
    innerCircle: ['#ffffff', '#d4d4d4', '#a0a0a0'],
    highlight: '#ffffff',
    ribbon: ['#c0c0c0', '#808080'],
    shadow: 'rgba(192,192,192,0.4)',
  },
  gold: {
    outerRing: ['#ffd700', '#daa520', '#ffd700'],
    innerCircle: ['#fff8b0', '#ffd700', '#b8860b'],
    highlight: '#fffacd',
    ribbon: ['#ffd700', '#b8860b'],
    shadow: 'rgba(255,215,0,0.4)',
  },
  platinum: {
    outerRing: ['#e5e4e2', '#c0c0c0', '#e5e4e2'],
    innerCircle: ['#f8f8ff', '#e5e4e2', '#8e8e8e'],
    highlight: '#ffffff',
    ribbon: ['#b8b8b8', '#6e6e6e'],
    shadow: 'rgba(229,228,226,0.4)',
  },
};

export function TierMedal({ tier, size = 120, className = '' }: TierMedalProps) {
  const config = tierConfigs[tier];
  const id = `medal-${tier}-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Outer ring gradient */}
        <linearGradient id={`${id}-outer`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.outerRing[0]} />
          <stop offset="50%" stopColor={config.outerRing[1]} />
          <stop offset="100%" stopColor={config.outerRing[2]} />
        </linearGradient>
        {/* Inner circle gradient */}
        <radialGradient id={`${id}-inner`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor={config.innerCircle[0]} />
          <stop offset="60%" stopColor={config.innerCircle[1]} />
          <stop offset="100%" stopColor={config.innerCircle[2]} />
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
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={config.shadow} floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Ribbons behind medal */}
      <path
        d="M38 72 L28 105 L40 95 L48 108 L50 75"
        fill={`url(#${id}-ribbon-l)`}
        opacity="0.9"
      />
      <path
        d="M82 72 L92 105 L80 95 L72 108 L70 75"
        fill={`url(#${id}-ribbon-r)`}
        opacity="0.9"
      />

      {/* Medal body with shadow */}
      <g filter={`url(#${id}-shadow)`}>
        {/* Outer ring */}
        <circle cx="60" cy="52" r="38" fill={`url(#${id}-outer)`} />
        {/* Inner border */}
        <circle cx="60" cy="52" r="34" fill="none" stroke={config.outerRing[1]} strokeWidth="1.5" opacity="0.5" />
        {/* Inner circle (main face) */}
        <circle cx="60" cy="52" r="30" fill={`url(#${id}-inner)`} />
        {/* Decorative inner ring */}
        <circle cx="60" cy="52" r="26" fill="none" stroke={config.outerRing[1]} strokeWidth="0.8" opacity="0.4" />
        {/* Highlight reflection */}
        <ellipse cx="50" cy="42" rx="12" ry="8" fill={config.highlight} opacity="0.25" />
      </g>
    </svg>
  );
}

export default TierMedal;
