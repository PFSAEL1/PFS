import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: "#0a0a0a" }}>
      <div className="text-center px-6 max-w-xl">
        <p className="text-xs tracking-[0.25em] text-gray-400 uppercase mb-4">PFS</p>
        <h1 className="text-6xl font-black text-white mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.02em" }}>
          Page Not Found
        </h1>
        <p className="text-gray-400 mb-10 text-lg leading-relaxed">
          The page you're looking for doesn't exist or has moved.<br />
          Let us help you find the right finishing system for your application.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setLocation("/contact/request-a-quote")}
            className="px-8 py-3 text-sm font-bold tracking-widest uppercase text-white transition-all duration-200"
            style={{ background: "#c8102e", letterSpacing: "0.12em" }}
          >
            Request Information
          </button>
          <button
            onClick={() => setLocation("/")}
            className="px-8 py-3 text-sm font-bold tracking-widest uppercase text-white border border-white/20 hover:border-white/50 transition-all duration-200"
            style={{ letterSpacing: "0.12em" }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
