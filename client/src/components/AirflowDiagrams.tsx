/**
 * Premium animated SVG airflow diagrams for each booth type.
 * Side-view cross-sections showing airflow direction, filter positions, and exhaust stacks.
 * Styled for dark UI with glowing animated arrows.
 */

// Crossdraft: Horizontal front-to-rear airflow
export function CrossdraftDiagram() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-cross" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#22d3ee" />
        </marker>
      </defs>
      <style>{`
        @keyframes flowRight { 0%{stroke-dashoffset:200;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
        @keyframes flowUp { 0%{stroke-dashoffset:80;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
        .cr1{animation:flowRight 2.2s linear infinite}
        .cr2{animation:flowRight 2.2s linear infinite 0.6s}
        .cr3{animation:flowRight 2.2s linear infinite 1.2s}
        .cru{animation:flowUp 1.8s linear infinite}
      `}</style>
      
      {/* Booth body */}
      <rect x="100" y="60" width="380" height="200" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" rx="2" />
      
      {/* Floor line */}
      <line x1="100" y1="260" x2="480" y2="260" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4 4" />
      
      {/* Intake filters (left wall) */}
      <rect x="88" y="80" width="14" height="40" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.6)" strokeWidth="1.5" rx="2" />
      <rect x="88" y="140" width="14" height="40" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.6)" strokeWidth="1.5" rx="2" />
      <rect x="88" y="200" width="14" height="40" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.6)" strokeWidth="1.5" rx="2" />
      
      {/* Exhaust filters (right wall) */}
      <rect x="478" y="80" width="14" height="40" fill="rgba(251,146,60,0.15)" stroke="rgba(251,146,60,0.6)" strokeWidth="1.5" rx="2" />
      <rect x="478" y="140" width="14" height="40" fill="rgba(251,146,60,0.15)" stroke="rgba(251,146,60,0.6)" strokeWidth="1.5" rx="2" />
      <rect x="478" y="200" width="14" height="40" fill="rgba(251,146,60,0.15)" stroke="rgba(251,146,60,0.6)" strokeWidth="1.5" rx="2" />
      
      {/* Exhaust stack */}
      <rect x="500" y="20" width="20" height="60" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" rx="1" />
      <line x1="510" y1="60" x2="510" y2="20" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 8" className="cru" markerEnd="url(#arrow-cross)" />
      
      {/* Animated airflow arrows - 3 rows horizontal */}
      <line x1="115" y1="100" x2="470" y2="100" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="12 16" className="cr1" markerEnd="url(#arrow-cross)" />
      <line x1="115" y1="160" x2="470" y2="160" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="12 16" className="cr2" markerEnd="url(#arrow-cross)" />
      <line x1="115" y1="220" x2="470" y2="220" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="12 16" className="cr3" markerEnd="url(#arrow-cross)" />
      
      {/* Labels */}
      <text x="60" y="165" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="system-ui">
        <tspan x="60" dy="0">INTAKE</tspan>
        <tspan x="60" dy="12">FILTERS</tspan>
      </text>
      <text x="530" y="165" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="system-ui">
        <tspan x="530" dy="0">EXHAUST</tspan>
        <tspan x="530" dy="12">FILTERS</tspan>
      </text>
      <text x="510" y="12" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" fontFamily="system-ui">EXHAUST</text>
      <text x="290" y="290" fill="rgba(255,255,255,0.35)" fontSize="9" textAnchor="middle" fontFamily="system-ui" letterSpacing="1">HORIZONTAL AIRFLOW</text>
    </svg>
  );
}

// Downdraft: Air enters from full ceiling, exits through floor grates
export function DowndraftDiagram() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-down" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#22d3ee" />
        </marker>
      </defs>
      <style>{`
        @keyframes flowDown { 0%{stroke-dashoffset:160;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
        @keyframes flowDownSlow { 0%{stroke-dashoffset:80;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
        .dd1{animation:flowDown 2.0s linear infinite}
        .dd2{animation:flowDown 2.0s linear infinite 0.5s}
        .dd3{animation:flowDown 2.0s linear infinite 1.0s}
        .dd4{animation:flowDown 2.0s linear infinite 1.5s}
        .dds{animation:flowDownSlow 1.6s linear infinite 0.3s}
      `}</style>
      
      {/* Booth body */}
      <rect x="120" y="50" width="360" height="210" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" rx="2" />
      
      {/* Ceiling filter plenum (full width) */}
      <rect x="130" y="42" width="340" height="14" fill="rgba(34,211,238,0.12)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.5" rx="2" />
      
      {/* Floor grates */}
      <rect x="180" y="254" width="240" height="12" fill="rgba(251,146,60,0.12)" stroke="rgba(251,146,60,0.5)" strokeWidth="1.5" rx="1" />
      {/* Grate lines */}
      <line x1="210" y1="254" x2="210" y2="266" stroke="rgba(251,146,60,0.3)" strokeWidth="1" />
      <line x1="240" y1="254" x2="240" y2="266" stroke="rgba(251,146,60,0.3)" strokeWidth="1" />
      <line x1="270" y1="254" x2="270" y2="266" stroke="rgba(251,146,60,0.3)" strokeWidth="1" />
      <line x1="300" y1="254" x2="300" y2="266" stroke="rgba(251,146,60,0.3)" strokeWidth="1" />
      <line x1="330" y1="254" x2="330" y2="266" stroke="rgba(251,146,60,0.3)" strokeWidth="1" />
      <line x1="360" y1="254" x2="360" y2="266" stroke="rgba(251,146,60,0.3)" strokeWidth="1" />
      <line x1="390" y1="254" x2="390" y2="266" stroke="rgba(251,146,60,0.3)" strokeWidth="1" />
      
      {/* Basement/pit area */}
      <rect x="170" y="268" width="260" height="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 3" rx="1" />
      
      {/* Exhaust stack (side) */}
      <rect x="500" y="10" width="20" height="60" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" rx="1" />
      <line x1="510" y1="55" x2="510" y2="15" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 8" className="dds" markerEnd="url(#arrow-down)" />
      
      {/* Animated airflow arrows - vertical downward */}
      <line x1="200" y1="65" x2="200" y2="245" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="10 14" className="dd1" markerEnd="url(#arrow-down)" />
      <line x1="260" y1="65" x2="260" y2="245" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="10 14" className="dd2" markerEnd="url(#arrow-down)" />
      <line x1="340" y1="65" x2="340" y2="245" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="10 14" className="dd3" markerEnd="url(#arrow-down)" />
      <line x1="400" y1="65" x2="400" y2="245" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="10 14" className="dd4" markerEnd="url(#arrow-down)" />
      
      {/* Labels */}
      <text x="300" y="35" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="system-ui">CEILING DIFFUSION MEDIA</text>
      <text x="300" y="310" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="system-ui">FLOOR EXHAUST GRATES + PIT</text>
      <text x="510" y="8" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" fontFamily="system-ui">EXHAUST</text>
      <text x="300" y="285" fill="rgba(255,255,255,0.25)" fontSize="8" textAnchor="middle" fontFamily="system-ui">BASEMENT / PIT</text>
    </svg>
  );
}

// Semi-Downdraft: Ceiling intake at front half, rear floor-level exhaust
export function SemiDowndraftDiagram() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-semi" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#a855f7" />
        </marker>
      </defs>
      <style>{`
        @keyframes flowDiag { 0%{stroke-dashoffset:200;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
        @keyframes flowUpPurple { 0%{stroke-dashoffset:80;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
        .sd1{animation:flowDiag 2.4s linear infinite}
        .sd2{animation:flowDiag 2.4s linear infinite 0.7s}
        .sd3{animation:flowDiag 2.4s linear infinite 1.4s}
        .sdu{animation:flowUpPurple 1.8s linear infinite}
      `}</style>
      
      {/* Booth body */}
      <rect x="100" y="55" width="400" height="210" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" rx="2" />
      
      {/* Ceiling filter - FRONT HALF only */}
      <rect x="110" y="47" width="190" height="14" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" rx="2" />
      
      {/* Rear exhaust filters (rear wall, lower) */}
      <rect x="488" y="190" width="14" height="50" fill="rgba(251,146,60,0.15)" stroke="rgba(251,146,60,0.6)" strokeWidth="1.5" rx="2" />
      <rect x="488" y="130" width="14" height="50" fill="rgba(251,146,60,0.15)" stroke="rgba(251,146,60,0.6)" strokeWidth="1.5" rx="2" />
      
      {/* Exhaust stack */}
      <rect x="510" y="15" width="20" height="55" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" rx="1" />
      <line x1="520" y1="55" x2="520" y2="20" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 8" className="sdu" markerEnd="url(#arrow-semi)" />
      
      {/* Animated airflow - diagonal from ceiling front to rear floor */}
      <path d="M 160 70 C 200 120, 350 200, 480 160" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="10 14" className="sd1" markerEnd="url(#arrow-semi)" />
      <path d="M 220 70 C 260 130, 380 210, 480 190" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="10 14" className="sd2" markerEnd="url(#arrow-semi)" />
      <path d="M 280 70 C 320 140, 400 220, 480 220" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="10 14" className="sd3" markerEnd="url(#arrow-semi)" />
      
      {/* Labels */}
      <text x="205" y="38" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="system-ui">CEILING INTAKE (FRONT HALF)</text>
      <text x="540" y="170" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="system-ui">
        <tspan x="545" dy="0">REAR</tspan>
        <tspan x="545" dy="12">EXHAUST</tspan>
      </text>
      <text x="520" y="10" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" fontFamily="system-ui">EXHAUST</text>
      <text x="300" y="295" fill="rgba(255,255,255,0.35)" fontSize="9" textAnchor="middle" fontFamily="system-ui" letterSpacing="1">ANGLED AIRFLOW — NO PIT REQUIRED</text>
    </svg>
  );
}

// Side-Downdraft: Ceiling intake, side wall exhaust plenums (no pit)
export function SideDowndraftDiagram() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-side" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#06b6d4" />
        </marker>
      </defs>
      <style>{`
        @keyframes flowDownCyan { 0%{stroke-dashoffset:120;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
        @keyframes flowOutCyan { 0%{stroke-dashoffset:60;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
        .sdd1{animation:flowDownCyan 2.0s linear infinite}
        .sdd2{animation:flowDownCyan 2.0s linear infinite 0.5s}
        .sdd3{animation:flowDownCyan 2.0s linear infinite 1.0s}
        .sdo1{animation:flowOutCyan 1.4s linear infinite 0.3s}
        .sdo2{animation:flowOutCyan 1.4s linear infinite 0.8s}
      `}</style>
      
      {/* Booth body */}
      <rect x="130" y="50" width="340" height="210" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" rx="2" />
      
      {/* Ceiling filter (full width) */}
      <rect x="140" y="42" width="320" height="14" fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" rx="2" />
      
      {/* Side wall exhaust plenums (both sides, lower) */}
      <rect x="116" y="180" width="16" height="70" fill="rgba(251,146,60,0.15)" stroke="rgba(251,146,60,0.5)" strokeWidth="1.5" rx="2" />
      <rect x="468" y="180" width="16" height="70" fill="rgba(251,146,60,0.15)" stroke="rgba(251,146,60,0.5)" strokeWidth="1.5" rx="2" />
      
      {/* Floor - solid (no pit!) */}
      <line x1="130" y1="260" x2="470" y2="260" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      
      {/* Exhaust stack */}
      <rect x="500" y="15" width="20" height="55" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" rx="1" />
      <line x1="510" y1="55" x2="510" y2="20" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 8" className="sdo1" markerEnd="url(#arrow-side)" />
      
      {/* Animated airflow - down from ceiling then out to sides */}
      <line x1="220" y1="65" x2="220" y2="200" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="10 14" className="sdd1" markerEnd="url(#arrow-side)" />
      <line x1="300" y1="65" x2="300" y2="200" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="10 14" className="sdd2" markerEnd="url(#arrow-side)" />
      <line x1="380" y1="65" x2="380" y2="200" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="10 14" className="sdd3" markerEnd="url(#arrow-side)" />
      
      {/* Side exit arrows */}
      <line x1="180" y1="220" x2="135" y2="220" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 8" className="sdo1" markerEnd="url(#arrow-side)" />
      <line x1="420" y1="220" x2="465" y2="220" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 8" className="sdo2" markerEnd="url(#arrow-side)" />
      <line x1="180" y1="240" x2="135" y2="240" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 8" className="sdo2" markerEnd="url(#arrow-side)" />
      <line x1="420" y1="240" x2="465" y2="240" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 8" className="sdo1" markerEnd="url(#arrow-side)" />
      
      {/* Labels */}
      <text x="300" y="35" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="system-ui">CEILING DIFFUSION MEDIA</text>
      <text x="80" y="220" fill="rgba(255,255,255,0.5)" fontSize="8" textAnchor="middle" fontFamily="system-ui">
        <tspan x="80" dy="0">SIDE</tspan>
        <tspan x="80" dy="11">EXHAUST</tspan>
      </text>
      <text x="520" y="220" fill="rgba(255,255,255,0.5)" fontSize="8" textAnchor="middle" fontFamily="system-ui">
        <tspan x="520" dy="0">SIDE</tspan>
        <tspan x="520" dy="11">EXHAUST</tspan>
      </text>
      <text x="510" y="10" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" fontFamily="system-ui">EXHAUST</text>
      <text x="300" y="290" fill="rgba(255,255,255,0.35)" fontSize="9" textAnchor="middle" fontFamily="system-ui" letterSpacing="1">NO PIT REQUIRED — SITS ON EXISTING SLAB</text>
    </svg>
  );
}

// Open Face: Open front, exhaust through rear wall only
export function OpenFaceDiagram() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-open" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#10b981" />
        </marker>
      </defs>
      <style>{`
        @keyframes flowRightGreen { 0%{stroke-dashoffset:200;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
        @keyframes flowUpGreen { 0%{stroke-dashoffset:80;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
        .of1{animation:flowRightGreen 2.2s linear infinite}
        .of2{animation:flowRightGreen 2.2s linear infinite 0.6s}
        .of3{animation:flowRightGreen 2.2s linear infinite 1.2s}
        .ofu{animation:flowUpGreen 1.8s linear infinite}
      `}</style>
      
      {/* Booth body - open on left side */}
      <line x1="100" y1="60" x2="480" y2="60" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" /> {/* ceiling */}
      <line x1="480" y1="60" x2="480" y2="260" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" /> {/* rear wall */}
      <line x1="100" y1="260" x2="480" y2="260" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" /> {/* floor */}
      {/* Open front - dashed to show opening */}
      <line x1="100" y1="60" x2="100" y2="260" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="8 6" />
      
      {/* Open front label */}
      <text x="85" y="165" fill="rgba(16,185,129,0.7)" fontSize="9" textAnchor="middle" fontFamily="system-ui" transform="rotate(-90 85 165)">OPEN FRONT</text>
      
      {/* Rear wall exhaust filters */}
      <rect x="468" y="80" width="14" height="50" fill="rgba(251,146,60,0.15)" stroke="rgba(251,146,60,0.6)" strokeWidth="1.5" rx="2" />
      <rect x="468" y="150" width="14" height="50" fill="rgba(251,146,60,0.15)" stroke="rgba(251,146,60,0.6)" strokeWidth="1.5" rx="2" />
      <rect x="468" y="220" width="14" height="30" fill="rgba(251,146,60,0.15)" stroke="rgba(251,146,60,0.6)" strokeWidth="1.5" rx="2" />
      
      {/* Exhaust stack */}
      <rect x="500" y="15" width="20" height="55" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" rx="1" />
      <line x1="510" y1="55" x2="510" y2="20" stroke="#10b981" strokeWidth="2" strokeDasharray="6 8" className="ofu" markerEnd="url(#arrow-open)" />
      
      {/* Animated airflow arrows - entering from open front */}
      <line x1="60" y1="105" x2="460" y2="105" stroke="#10b981" strokeWidth="2.5" strokeDasharray="12 16" className="of1" markerEnd="url(#arrow-open)" />
      <line x1="60" y1="165" x2="460" y2="165" stroke="#10b981" strokeWidth="2.5" strokeDasharray="12 16" className="of2" markerEnd="url(#arrow-open)" />
      <line x1="60" y1="225" x2="460" y2="225" stroke="#10b981" strokeWidth="2.5" strokeDasharray="12 16" className="of3" markerEnd="url(#arrow-open)" />
      
      {/* Labels */}
      <text x="540" y="155" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="system-ui">
        <tspan x="535" dy="0">REAR</tspan>
        <tspan x="535" dy="12">EXHAUST</tspan>
      </text>
      <text x="510" y="10" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" fontFamily="system-ui">EXHAUST</text>
      <text x="290" y="290" fill="rgba(255,255,255,0.35)" fontSize="9" textAnchor="middle" fontFamily="system-ui" letterSpacing="1">NO INTAKE FILTRATION — OPEN FRONT</text>
    </svg>
  );
}

// Prep Station: Ceiling intake, exhaust for dust containment
export function PrepStationDiagram() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-prep" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
        </marker>
      </defs>
      <style>{`
        @keyframes flowDownAmber { 0%{stroke-dashoffset:120;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
        @keyframes flowOutAmber { 0%{stroke-dashoffset:80;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
        .ps1{animation:flowDownAmber 2.0s linear infinite}
        .ps2{animation:flowDownAmber 2.0s linear infinite 0.6s}
        .ps3{animation:flowDownAmber 2.0s linear infinite 1.2s}
        .pso{animation:flowOutAmber 1.6s linear infinite 0.4s}
      `}</style>
      
      {/* Booth body - slightly smaller/shorter to show it's a station */}
      <rect x="140" y="60" width="320" height="190" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" rx="2" />
      
      {/* Ceiling filter panels */}
      <rect x="155" y="52" width="90" height="14" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5" rx="2" />
      <rect x="255" y="52" width="90" height="14" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5" rx="2" />
      <rect x="355" y="52" width="90" height="14" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5" rx="2" />
      
      {/* Rear wall exhaust */}
      <rect x="448" y="100" width="14" height="60" fill="rgba(251,146,60,0.15)" stroke="rgba(251,146,60,0.6)" strokeWidth="1.5" rx="2" />
      <rect x="448" y="175" width="14" height="60" fill="rgba(251,146,60,0.15)" stroke="rgba(251,146,60,0.6)" strokeWidth="1.5" rx="2" />
      
      {/* Exhaust duct */}
      <rect x="480" y="20" width="18" height="50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" rx="1" />
      <line x1="489" y1="55" x2="489" y2="25" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 8" className="pso" markerEnd="url(#arrow-prep)" />
      
      {/* Animated airflow - down from ceiling then to rear */}
      <line x1="200" y1="75" x2="200" y2="180" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="10 14" className="ps1" markerEnd="url(#arrow-prep)" />
      <line x1="300" y1="75" x2="300" y2="180" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="10 14" className="ps2" markerEnd="url(#arrow-prep)" />
      <line x1="400" y1="75" x2="400" y2="180" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="10 14" className="ps3" markerEnd="url(#arrow-prep)" />
      
      {/* Horizontal exit to rear */}
      <line x1="300" y1="200" x2="440" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8 10" className="pso" markerEnd="url(#arrow-prep)" />
      
      {/* Dust particles (small dots) */}
      <circle cx="250" cy="150" r="2" fill="rgba(245,158,11,0.3)"><animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" /></circle>
      <circle cx="320" cy="130" r="1.5" fill="rgba(245,158,11,0.3)"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.8s" repeatCount="indefinite" /></circle>
      <circle cx="360" cy="160" r="2" fill="rgba(245,158,11,0.3)"><animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.2s" repeatCount="indefinite" /></circle>
      
      {/* Labels */}
      <text x="300" y="42" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="system-ui">CEILING FILTER PANELS</text>
      <text x="510" y="135" fill="rgba(255,255,255,0.5)" fontSize="8" textAnchor="middle" fontFamily="system-ui">
        <tspan x="510" dy="0">EXHAUST</tspan>
        <tspan x="510" dy="11">FILTERS</tspan>
      </text>
      <text x="489" y="14" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" fontFamily="system-ui">DUCT</text>
      <text x="300" y="285" fill="rgba(255,255,255,0.35)" fontSize="9" textAnchor="middle" fontFamily="system-ui" letterSpacing="1">DUST CONTAINMENT — SANDING & PREP</text>
    </svg>
  );
}
