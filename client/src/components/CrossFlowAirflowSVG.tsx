/**
 * CrossFlowAirflowSVG — Animated front-view diagram — horizontal airflow, front intake to rear exhaust.
 * Shared between CrossFlowBoothPage and TruckBoothsPage.
 */
export default function CrossFlowAirflowSVG() {
  return (
    <div style={{ width:"100%",maxWidth:"700px",margin:"0 auto" }}>
      <svg viewBox="0 0 700 320" style={{ width:"100%",height:"auto",display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes flowRight { 0%{stroke-dashoffset:200;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes flowUp    { 0%{stroke-dashoffset:80;opacity:0.3}  50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          .af1{animation:flowRight 2.0s linear infinite}
          .af2{animation:flowRight 2.0s linear infinite 0.5s}
          .af3{animation:flowRight 2.0s linear infinite 1.0s}
          .afu{animation:flowUp 1.8s linear infinite}
        `}</style>
        <rect x="80" y="60" width="520" height="200" fill="none" stroke="#222" strokeWidth="3"/>
        <rect x="60" y="80"  width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="60" y="135" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="60" y="190" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="618" y="80"  width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="618" y="135" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="618" y="190" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="610" y="10" width="30" height="52" rx="2" fill="#bbb" stroke="#888" strokeWidth="1.5"/>
        <line x1="82" y1="100" x2="618" y2="100" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="af1"/>
        <polygon points="618,94 634,100 618,106" fill="#22c55e"/>
        <line x1="82" y1="160" x2="618" y2="160" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="af2"/>
        <polygon points="618,154 634,160 618,166" fill="#22c55e"/>
        <line x1="82" y1="220" x2="618" y2="220" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="af3"/>
        <polygon points="618,214 634,220 618,226" fill="#22c55e"/>
        <line x1="625" y1="60" x2="625" y2="12" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="15 8" className="afu"/>
        <polygon points="619,12 625,0 631,12" fill="#22c55e"/>
        <text x="40" y="158" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">INTAKE</text>
        <text x="40" y="172" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">FILTERS</text>
        <text x="660" y="158" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">EXHAUST</text>
        <text x="660" y="172" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">FILTERS</text>
        <text x="625" y="295" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">EXHAUST</text>
        <text x="625" y="308" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">STACK</text>
      </svg>
    </div>
  );
}
