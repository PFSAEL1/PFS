/*
 * FullDowndraftAirflowSVG — Animated airflow diagram for full downdraft paint booths
 * Shared between FullDowndraftBoothPage and TruckBoothsPage.
 */
const BLUE = "#1B3A6B";
export default function FullDowndraftAirflowSVG() {
  return (
    <div style={{ width:"100%",maxWidth:"720px",margin:"0 auto" }}>
      <svg viewBox="0 0 760 400" style={{ width:"100%",height:"auto",display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes fdDown {
            0%   { stroke-dashoffset: 200; opacity: 0.25; }
            40%  { opacity: 1; }
            100% { stroke-dashoffset: 0;   opacity: 0.25; }
          }
          @keyframes fdRight {
            0%   { stroke-dashoffset: 300; opacity: 0.25; }
            40%  { opacity: 1; }
            100% { stroke-dashoffset: 0;   opacity: 0.25; }
          }
          @keyframes fdUp {
            0%   { stroke-dashoffset: 200; opacity: 0.25; }
            40%  { opacity: 1; }
            100% { stroke-dashoffset: 0;   opacity: 0.25; }
          }
          .fd-d1 { animation: fdDown  2.0s linear infinite 0.00s; }
          .fd-d2 { animation: fdDown  2.0s linear infinite 0.33s; }
          .fd-d3 { animation: fdDown  2.0s linear infinite 0.66s; }
          .fd-d4 { animation: fdDown  2.0s linear infinite 1.00s; }
          .fd-d5 { animation: fdDown  2.0s linear infinite 1.33s; }
          .fd-d6 { animation: fdDown  2.0s linear infinite 1.66s; }
          .fd-r1 { animation: fdRight 2.4s linear infinite 0.00s; }
          .fd-r2 { animation: fdRight 2.4s linear infinite 0.60s; }
          .fd-u1 { animation: fdUp    2.2s linear infinite 0.00s; }
          .fd-u2 { animation: fdUp    2.2s linear infinite 0.55s; }
        `}</style>
        <rect x="60" y="60" width="540" height="220" fill="none" stroke="#222" strokeWidth="3"/>
        {[68,148,228,308,388,468,548].map((x,i) => (
          <rect key={i} x={x} y="36" width="68" height="24" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        ))}
        <text x="350" y="26" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FULL CEILING INTAKE FILTERS</text>
        <rect x="60" y="262" width="540" height="18" fill="#d1d5db" stroke="#888" strokeWidth="1.5"/>
        {[80,110,140,170,200,230,260,290,320,350,380,410,440,470,500,530,560].map((x,i) => (
          <line key={i} x1={x} y1="262" x2={x} y2="280" stroke="#9ca3af" strokeWidth="1"/>
        ))}
        <text x="330" y="298" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>GRATED FLOOR EXHAUST PIT</text>
        <rect x="60" y="310" width="580" height="22" rx="3" fill="#e5e7eb" stroke="#888" strokeWidth="1.5"/>
        <text x="350" y="348" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>UNDERGROUND EXHAUST DUCT (CONCRETE PIT REQUIRED)</text>
        <rect x="630" y="8" width="32" height="304" rx="3" fill="#e5e7eb" stroke="#888" strokeWidth="1.5"/>
        <text x="646" y="370" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="646" y="383" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>
        <line x1="100" y1="60" x2="100" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-d1"/>
        <polygon points="94,258 100,272 106,258" fill="#22c55e"/>
        <line x1="180" y1="60" x2="180" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-d2"/>
        <polygon points="174,258 180,272 186,258" fill="#22c55e"/>
        <line x1="260" y1="60" x2="260" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-d3"/>
        <polygon points="254,258 260,272 266,258" fill="#22c55e"/>
        <line x1="340" y1="60" x2="340" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-d4"/>
        <polygon points="334,258 340,272 346,258" fill="#22c55e"/>
        <line x1="420" y1="60" x2="420" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-d5"/>
        <polygon points="414,258 420,272 426,258" fill="#22c55e"/>
        <line x1="500" y1="60" x2="500" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-d6"/>
        <polygon points="494,258 500,272 506,258" fill="#22c55e"/>
        <line x1="62" y1="321" x2="628" y2="321" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-r1"/>
        <line x1="62" y1="330" x2="628" y2="330" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeDasharray="18 10" className="fd-r2"/>
        <polygon points="622,315 636,321 622,327" fill="#22c55e"/>
        <line x1="641" y1="310" x2="641" y2="12" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-u1"/>
        <line x1="651" y1="310" x2="651" y2="12" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeDasharray="18 10" className="fd-u2"/>
        <polygon points="635,12 641,0 647,12" fill="#22c55e"/>
      </svg>
    </div>
  );
}
