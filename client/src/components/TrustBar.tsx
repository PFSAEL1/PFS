/*
 * PFS Trust Bar - GFS Corporate Style
 * Clean white bar with compliance badges, no shadows or offsets
 */

export default function TrustBar() {
  const badges = [
    { code: "ETL", sub: "CLASSIFIED", label: "Intertek 5022693" },
    { code: "OSHA", sub: "", label: "Safety Standards" },
    { code: "NFPA", sub: "STD 33", label: "Fire Safety Standard" },
    { code: "CSA", sub: "C22.1", label: "Canadian Electrical Code" },
    { code: "BBB", sub: "", label: "Accredited Business" },
  ];

  return (
    <div className="bg-white border-b border-gray-200 py-5">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p
            style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}
          >
            Certified &amp; Compliant
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {badges.map((b) => (
              <div key={b.code} className="flex items-center gap-2.5">
                <div
                  className="flex flex-col items-center justify-center border-2 border-gray-300 px-3 py-1.5"
                  style={{ minWidth: "52px" }}
                >
                  <span
                    style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}
                  >
                    {b.code}
                  </span>
                  {b.sub && (
                    <span
                      style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.55rem", color: "#666", letterSpacing: "0.05em", lineHeight: 1.3 }}
                    >
                      {b.sub}
                    </span>
                  )}
                </div>
                <span
                  style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.78rem", color: "#555" }}
                >
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
