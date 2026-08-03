/**
 * SideDowndraftAirflowSVG — Animated FRONT VIEW airflow diagram for Side Downdraft booths.
 *
 * Matches hand sketch:
 *  1. Fresh air enters from INTAKE PLENUM at top-center ceiling
 *  2. Air flows DOWN through the booth work zone
 *  3. Air sweeps along the floor toward BOTH SIDE WALLS
 *  4. Fans on BOTH SIDE WALLS pull air UP through side exhaust plenums and out the top
 *
 * Front view: left fan plenum | booth interior | right fan plenum
 */

export default function SideDowndraftAirflowSVG() {
  return (
    <div style={{ width: "100%", maxWidth: "680px", margin: "0 auto" }}>
      <svg
        viewBox="0 0 680 370"
        style={{ width: "100%", height: "auto", display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="sdd-arr-down" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
            <path d="M2,1 L4,7 L6,1" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id="sdd-arr-up" markerWidth="8" markerHeight="8" refX="4" refY="1" orient="auto">
            <path d="M2,7 L4,1 L6,7" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id="sdd-arr-left" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto">
            <path d="M7,2 L1,4 L7,6" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id="sdd-arr-right" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M1,2 L7,4 L1,6" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        <style>{`
          @keyframes sddDown {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: -36; }
          }
          @keyframes sddUp {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: -36; }
          }
          @keyframes sddFloor {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: -36; }
          }
          .sdd-d1 { stroke-dasharray:10 8; animation: sddDown  1.5s linear infinite 0.0s; }
          .sdd-d2 { stroke-dasharray:10 8; animation: sddDown  1.5s linear infinite 0.3s; }
          .sdd-d3 { stroke-dasharray:10 8; animation: sddDown  1.5s linear infinite 0.6s; }
          .sdd-d4 { stroke-dasharray:10 8; animation: sddDown  1.5s linear infinite 0.9s; }
          .sdd-fl { stroke-dasharray:10 8; animation: sddFloor 1.5s linear infinite 0.0s; }
          .sdd-fr { stroke-dasharray:10 8; animation: sddFloor 1.5s linear infinite 0.3s; }
          .sdd-ul { stroke-dasharray:10 8; animation: sddUp    1.5s linear infinite 0.0s; }
          .sdd-ur { stroke-dasharray:10 8; animation: sddUp    1.5s linear infinite 0.3s; }
        `}</style>

        {/* ── BACKGROUND ── */}
        <rect width="680" height="370" fill="#F8FAFC" rx="6" />

        {/* ══════════════════════════════════════════
            LEFT EXHAUST PLENUM (fan housing)
        ══════════════════════════════════════════ */}
        {/* Plenum box */}
        <rect x="22" y="55" width="80" height="220" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
        {/* Fan circle */}
        <circle cx="62" cy="165" r="28" fill="#1B3A6B" stroke="#1e40af" strokeWidth="2" />
        <text x="62" y="162" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" letterSpacing="0.06em">EXHAUST</text>
        <text x="62" y="174" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" letterSpacing="0.06em">FAN</text>
        {/* Fan blade lines */}
        <line x1="62" y1="140" x2="62" y2="190" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="37" y1="165" x2="87" y2="165" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="45" y1="148" x2="79" y2="182" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="79" y1="148" x2="45" y2="182" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {/* Label */}
        <text x="62" y="293" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" letterSpacing="0.06em">LEFT EXHAUST</text>
        <text x="62" y="303" textAnchor="middle" fill="#64748B" fontSize="7" fontFamily="'Inter',sans-serif">PLENUM</text>

        {/* ══════════════════════════════════════════
            RIGHT EXHAUST PLENUM (fan housing)
        ══════════════════════════════════════════ */}
        <rect x="578" y="55" width="80" height="220" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
        <circle cx="618" cy="165" r="28" fill="#1B3A6B" stroke="#1e40af" strokeWidth="2" />
        <text x="618" y="162" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" letterSpacing="0.06em">EXHAUST</text>
        <text x="618" y="174" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" letterSpacing="0.06em">FAN</text>
        <line x1="618" y1="140" x2="618" y2="190" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="593" y1="165" x2="643" y2="165" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="601" y1="148" x2="635" y2="182" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="635" y1="148" x2="601" y2="182" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="618" y="293" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" letterSpacing="0.06em">RIGHT EXHAUST</text>
        <text x="618" y="303" textAnchor="middle" fill="#64748B" fontSize="7" fontFamily="'Inter',sans-serif">PLENUM</text>

        {/* ══════════════════════════════════════════
            BOOTH INTERIOR
        ══════════════════════════════════════════ */}
        <rect x="102" y="55" width="476" height="220" fill="#F0F4F8" stroke="#64748B" strokeWidth="2" />

        {/* ══════════════════════════════════════════
            INTAKE PLENUM — top center ceiling
        ══════════════════════════════════════════ */}
        <rect x="182" y="30" width="316" height="30" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
        {/* Filter grid lines */}
        {[202,222,242,262,282,302,322,342,362,382,402,422,442,462,482].map((x) => (
          <line key={x} x1={x} y1="30" x2={x} y2="60" stroke="#93C5FD" strokeWidth="0.8" />
        ))}
        <text x="340" y="50" textAnchor="middle" fill="#1D4ED8" fontSize="9" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" letterSpacing="0.08em">INTAKE PLENUM — CEILING FILTERS</text>

        {/* Intake entry arrows (ceiling → booth) */}
        <line x1="340" y1="60" x2="340" y2="75" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#sdd-arr-down)" />

        {/* ══════════════════════════════════════════
            WORK ZONE LABEL
        ══════════════════════════════════════════ */}
        <text x="340" y="170" textAnchor="middle" fill="#CBD5E1" fontSize="14" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" letterSpacing="0.12em">WORK ZONE</text>

        {/* ══════════════════════════════════════════
            FLOOR GRATING
        ══════════════════════════════════════════ */}
        <rect x="102" y="263" width="476" height="12" rx="1" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
        {[120,140,160,180,200,220,240,260,280,300,320,340,360,380,400,420,440,460,480,500,520,540,560].map((x) => (
          <line key={x} x1={x} y1="263" x2={x} y2="275" stroke="#94A3B8" strokeWidth="0.8" />
        ))}

        {/* ══════════════════════════════════════════
            STEP 1 — ANIMATED INTAKE (DOWN)
            4 streams flowing down through booth
        ══════════════════════════════════════════ */}
        <line x1="220" y1="75" x2="220" y2="260" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" className="sdd-d1" markerEnd="url(#sdd-arr-down)" />
        <line x1="290" y1="75" x2="290" y2="260" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" className="sdd-d2" markerEnd="url(#sdd-arr-down)" />
        <line x1="390" y1="75" x2="390" y2="260" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" className="sdd-d3" markerEnd="url(#sdd-arr-down)" />
        <line x1="460" y1="75" x2="460" y2="260" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" className="sdd-d4" markerEnd="url(#sdd-arr-down)" />

        {/* ══════════════════════════════════════════
            STEP 2 — FLOOR SWEEP (LEFT & RIGHT)
        ══════════════════════════════════════════ */}
        {/* Left sweep */}
        <path d="M290,263 Q290,282 250,282 Q190,282 110,282" stroke="#3B82F6" strokeWidth="2.5" fill="none" strokeLinecap="round" className="sdd-fl" markerEnd="url(#sdd-arr-left)" />
        {/* Right sweep */}
        <path d="M390,263 Q390,282 430,282 Q490,282 570,282" stroke="#3B82F6" strokeWidth="2.5" fill="none" strokeLinecap="round" className="sdd-fr" markerEnd="url(#sdd-arr-right)" />

        {/* ══════════════════════════════════════════
            STEP 3 — EXHAUST UP THROUGH SIDE PLENUMS
        ══════════════════════════════════════════ */}
        {/* Left plenum — up */}
        <line x1="62" y1="265" x2="62" y2="70" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" className="sdd-ul" markerEnd="url(#sdd-arr-up)" />
        {/* Right plenum — up */}
        <line x1="618" y1="265" x2="618" y2="70" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" className="sdd-ur" markerEnd="url(#sdd-arr-up)" />

        {/* Exhaust exit at top */}
        <path d="M62,58 L62,36" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#sdd-arr-up)" />
        <path d="M618,58 L618,36" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#sdd-arr-up)" />
        <text x="62" y="30" textAnchor="middle" fill="#B45309" fontSize="8" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" letterSpacing="0.06em">OUT</text>
        <text x="618" y="30" textAnchor="middle" fill="#B45309" fontSize="8" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" letterSpacing="0.06em">OUT</text>

        {/* ══════════════════════════════════════════
            STEP BADGES
        ══════════════════════════════════════════ */}
        <circle cx="340" cy="22" r="11" fill="#1B3A6B" />
        <text x="340" y="27" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="900" fill="#fff">1</text>

        <circle cx="340" cy="125" r="11" fill="#1B3A6B" />
        <text x="340" y="130" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="900" fill="#fff">2</text>

        <circle cx="200" cy="310" r="11" fill="#1B3A6B" />
        <text x="200" y="315" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="900" fill="#fff">3</text>

        <circle cx="62" cy="115" r="11" fill="#dc2626" />
        <text x="62" y="120" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="900" fill="#fff">4</text>
        <circle cx="618" cy="115" r="11" fill="#dc2626" />
        <text x="618" y="120" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="900" fill="#fff">4</text>

        {/* ══════════════════════════════════════════
            LEGEND
        ══════════════════════════════════════════ */}
        <rect x="102" y="318" width="476" height="38" rx="3" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
        <line x1="122" y1="337" x2="148" y2="337" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="6 4" />
        <text x="154" y="341" fill="#1D4ED8" fontSize="8.5" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700">INTAKE AIRFLOW (DOWN + FLOOR SWEEP)</text>
        <line x1="122" y1="352" x2="148" y2="352" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="6 4" />
        <text x="154" y="356" fill="#B45309" fontSize="8.5" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700">EXHAUST AIRFLOW (UP THROUGH SIDE PLENUMS)</text>
      </svg>
    </div>
  );
}
