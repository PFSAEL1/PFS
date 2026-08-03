/*
 * SemiDowndraftAirflowSVG — Animated airflow diagram for semi-downdraft paint booths
 * Shared between SemiDowndraftBoothPage and TruckBoothsPage.
 *
 * Airflow pattern:
 *   1. Air enters from ceiling intake at the top-left of the booth
 *   2. Flows DOWNWARD inside the booth (ceiling to floor)
 *   3. Travels HORIZONTALLY along the floor toward the right wall
 *   4. Enters a side exhaust plenum on the right wall
 *   5. Travels UPWARD through the plenum
 *   6. Exits through the exhaust stack at the top-right
 */
export default function SemiDowndraftAirflowSVG() {
  return (
    <div style={{ width:"100%",maxWidth:"680px",margin:"0 auto" }}>
      <svg viewBox="0 0 700 340" style={{ width:"100%",height:"auto",display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes sdDown  { 0%{stroke-dashoffset:220;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes sdFloor { 0%{stroke-dashoffset:240;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes sdUp    { 0%{stroke-dashoffset:260;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          .sd-d1{animation:sdDown  2.2s linear infinite 0.0s}
          .sd-d2{animation:sdDown  2.2s linear infinite 0.55s}
          .sd-d3{animation:sdDown  2.2s linear infinite 1.1s}
          .sd-fl{animation:sdFloor 2.0s linear infinite 0.0s}
          .sd-fl2{animation:sdFloor 2.0s linear infinite 0.5s}
          .sd-up{animation:sdUp   2.4s linear infinite 0.0s}
          .sd-up2{animation:sdUp  2.4s linear infinite 0.6s}
        `}</style>
        <rect x="80" y="60" width="520" height="200" fill="none" stroke="#222" strokeWidth="3"/>
        <rect x="88"  y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="140" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="192" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="244" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="296" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="348" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="598" y="60" width="22" height="130" rx="0" fill="#e5e7eb" stroke="#888" strokeWidth="1.5"/>
        <rect x="595" y="192" width="28" height="38" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="595" y="234" width="28" height="26" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="608" y="8" width="30" height="54" rx="2" fill="#bbb" stroke="#888" strokeWidth="1.5"/>
        <line x1="110" y1="60" x2="110" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd-d1"/>
        <polygon points="104,256 110,268 116,256" fill="#22c55e"/>
        <line x1="214" y1="60" x2="214" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd-d2"/>
        <polygon points="208,256 214,268 220,256" fill="#22c55e"/>
        <line x1="318" y1="60" x2="318" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd-d3"/>
        <polygon points="312,256 318,268 324,256" fill="#22c55e"/>
        <line x1="82"  y1="258" x2="596" y2="258" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd-fl"/>
        <polygon points="590,252 602,258 590,264" fill="#22c55e"/>
        <line x1="82"  y1="266" x2="596" y2="266" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeDasharray="20 10" className="sd-fl2"/>
        <line x1="609" y1="258" x2="609" y2="10" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd-up"/>
        <polygon points="603,10 609,0 615,10" fill="#22c55e"/>
        <line x1="617" y1="258" x2="617" y2="10" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeDasharray="20 10" className="sd-up2"/>
        <text x="220" y="32" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">CEILING INTAKE FILTERS</text>
        <text x="660" y="212" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">EXHAUST</text>
        <text x="660" y="226" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">FILTERS</text>
        <text x="623" y="315" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">EXHAUST</text>
        <text x="623" y="328" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">STACK</text>
      </svg>
    </div>
  );
}
