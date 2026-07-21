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
    border: ['#cd7f32', '#7a4a1e', '#e8a862', '#8b5e3c'],
    ring: ['#e8a862', '#cd7f32', '#8b5e3c', '#cd7f32'],
    face: ['#fde0b8', '#e8a862', '#cd7f32', '#7a4a1e'],
    ribbon: ['#cd7f32', '#7a4a1e'],
    text: ['#e8a862', '#cd7f32'],
  },
  silver: {
    label: 'SILVER',
    border: ['#e8e8e8', '#707070', '#c0c0c0', '#505050'],
    ring: ['#e0e0e0', '#a0a0a0', '#707070', '#c0c0c0'],
    face: ['#ffffff', '#e0e0e0', '#b0b0b0', '#808080'],
    ribbon: ['#a0a0a0', '#505050'],
    text: ['#e8e8e8', '#a0a0a0'],
  },
  gold: {
    label: 'GOLD',
    border: ['#ffd700', '#8b6914', '#ffd700', '#b8860b'],
    ring: ['#ffd700', '#daa520', '#8b6914', '#ffd700'],
    face: ['#fffde0', '#ffd700', '#daa520', '#8b6914'],
    ribbon: ['#daa520', '#6b4e0a'],
    text: ['#ffd700', '#daa520'],
  },
  platinum: {
    label: 'PLATINUM',
    border: ['#d0d0d0', '#606060', '#b0b0b0', '#404040'],
    ring: ['#c8c8c8', '#909090', '#606060', '#b0b0b0'],
    face: ['#f0f0f0', '#d0d0d0', '#a0a0a0', '#707070'],
    ribbon: ['#909090', '#404040'],
    text: ['#d0d0d0', '#808080'],
  },
};

export function TierMedal({ tier, size = 100, className = '', showLabel = true }: TierMedalProps) {
  const config = tierConfigs[tier];
  const id = `m-${tier}-${Math.random().toString(36).slice(2, 6)}`;

  // Wider viewbox to fit PLATINUM text
  const viewW = 120;
  const viewH = showLabel ? 155 : 110;
  const cx = 60;
  const medalCy = 55;
  const cardWidth = size;
  const cardHeight = size * (viewH / viewW);

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
        <linearGradient id={`${id}-brd`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.border[0]} />
          <stop offset="30%" stopColor={config.border[1]} />
          <stop offset="70%" stopColor={config.border[2]} />
          <stop offset="100%" stopColor={config.border[3]} />
        </linearGradient>
        <linearGradient id={`${id}-ring`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor={config.ring[0]} />
          <stop offset="30%" stopColor={config.ring[1]} />
          <stop offset="70%" stopColor={config.ring[2]} />
          <stop offset="100%" stopColor={config.ring[3]} />
        </linearGradient>
        <radialGradient id={`${id}-face`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor={config.face[0]} />
          <stop offset="30%" stopColor={config.face[1]} />
          <stop offset="70%" stopColor={config.face[2]} />
          <stop offset="100%" stopColor={config.face[3]} />
        </radialGradient>
        <linearGradient id={`${id}-rib`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={config.ribbon[0]} />
          <stop offset="100%" stopColor={config.ribbon[1]} />
        </linearGradient>
        <linearGradient id={`${id}-txt`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={config.text[0]} />
          <stop offset="100%" stopColor={config.text[1]} />
        </linearGradient>
        <filter id={`${id}-ds`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.7)" />
        </filter>
      </defs>

      {/* Card background */}
      <rect x="10" y="6" width="100" height="130" rx="10" fill="#18181b" />
      {/* Card border - thick metallic */}
      <rect x="10" y="6" width="100" height="130" rx="10" fill="none"
        stroke={`url(#${id}-brd)`} strokeWidth="2.5" />

      {/* Ribbon behind medal */}
      <polygon
        points={`${cx - 7},${medalCy + 18} ${cx - 12},${medalCy + 40} ${cx - 5},${medalCy + 34} ${cx},${medalCy + 42} ${cx + 5},${medalCy + 34} ${cx + 12},${medalCy + 40} ${cx + 7},${medalCy + 18}`}
        fill={`url(#${id}-rib)`}
      />

      {/* Medal */}
      <g filter={`url(#${id}-ds)`}>
        {/* Outer thick ring */}
        <circle cx={cx} cy={medalCy} r="28" fill={`url(#${id}-ring)`} />
        {/* Dark gap */}
        <circle cx={cx} cy={medalCy} r="23" fill="#18181b" />
        {/* Inner metallic face */}
        <circle cx={cx} cy={medalCy} r="21" fill={`url(#${id}-face)`} />
        {/* Shine highlight */}
        <ellipse cx={cx - 5} cy={medalCy - 8} rx="10" ry="7" fill="white" opacity="0.35" />
        <ellipse cx={cx + 4} cy={medalCy + 7} rx="6" ry="4" fill="white" opacity="0.1" />
      </g>

      {/* Label */}
      {showLabel && (
        <>
          <text x={cx} y="122" textAnchor="middle"
            fill={`url(#${id}-txt)`}
            fontSize={tier === 'platinum' ? '11' : '13'}
            fontWeight="700"
            fontFamily="Georgia, 'Times New Roman', serif"
            letterSpacing="1.5"
          >
            {config.label}
          </text>
          <text x={cx} y="135" textAnchor="middle"
            fill={`url(#${id}-txt)`}
            fontSize="8"
            fontWeight="600"
            fontFamily="Georgia, 'Times New Roman', serif"
            letterSpacing="1"
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
