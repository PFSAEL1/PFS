// ABC Filters iOS — AI Filter Scanner v6
// Real working scanner: camera capture → Forge/Claude vision → product match
import { useState, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { SEO } from '@/components/SEO';
import { Camera, X, Scan, ArrowLeft, Loader2, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const FORGE_API_URL = import.meta.env.VITE_FRONTEND_FORGE_API_URL || 'https://forge.manus.im';
const FORGE_API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY || '';

interface ScanResult {
  filterType: string;
  confidence: string;
  description: string;
  recommendedProducts: Array<{ name: string; handle: string; reason: string }>;
  tips: string;
}

export default function FilterScanner() {
  const [, navigate] = useLocation();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const analyzeImage = async (imageDataUrl: string) => {
    setScanning(true);
    setError(null);
    setResult(null);
    try {
      const base64 = imageDataUrl.split(',')[1];
      const mimeType = imageDataUrl.split(';')[0].split(':')[1];
      const response = await fetch(`${FORGE_API_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${FORGE_API_KEY}` },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 800,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: mimeType, data: base64 } },
              {
                type: 'text',
                text: 'You are an expert in paint booth filtration products for ABC Filters (abcfilters.net). Analyze this image and identify the filter type.\n\nRespond ONLY with valid JSON:\n{\n  "filterType": "Fiberglass Arrestor Pad",\n  "confidence": "High",\n  "description": "Brief description (1-2 sentences)",\n  "recommendedProducts": [{"name": "Product name", "handle": "shopify-handle-slug", "reason": "Why this matches"}],\n  "tips": "One practical tip"\n}\n\nfilterType must be one of: "Fiberglass Arrestor Pad", "Tacky Panel Filter", "Ceiling Blanket", "Roll Media", "MERV Intake Filter", "Unknown Filter"\nconfidence must be: "High", "Medium", or "Low"\nProduct handles: fiberglass-paint-arrestor-pads, tacky-panel-filters, ceiling-filter-media, fiberglass-roll-media, merv-paint-booth-filter'
              }
            ]
          }]
        })
      });
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Invalid response format');
      setResult(JSON.parse(jsonMatch[0]));
    } catch (err) {
      console.error('Scan error:', err);
      setError('Could not analyze the image. Please try again with a clearer photo.');
      toast.error('Scan failed', { description: 'Try a clearer, well-lit photo of the filter.' });
    } finally {
      setScanning(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setCapturedImage(dataUrl);
      analyzeImage(dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleReset = () => { setResult(null); setCapturedImage(null); setError(null); setScanning(false); };
  const confidenceColor = (c: string) => c === 'High' ? '#34c759' : c === 'Medium' ? '#ff9f0a' : '#ff3b30';

  return (
    <div className="min-h-screen safe-bottom" style={{ background: '#000' }}>
      <SEO title="AI Filter Scanner — ABC Filters" description="Scan your paint booth filter with AI." />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button onClick={() => navigate('/')} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <span className="text-white text-[17px] font-semibold">Filter Scanner</span>
        <div className="w-9" />
      </div>

      <div className="px-4 pt-2">
        {/* Idle state */}
        {!capturedImage && !scanning && !result && (
          <>
            <div className="relative w-full rounded-3xl overflow-hidden flex flex-col items-center justify-center mt-2" style={{ height: 340, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: 'rgba(0,102,204,0.6)' }} />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: 'rgba(0,102,204,0.6)' }} />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: 'rgba(0,102,204,0.6)' }} />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: 'rgba(0,102,204,0.6)' }} />
              <Scan className="w-14 h-14 mb-4" style={{ color: 'rgba(255,255,255,0.15)' }} />
              <p className="text-[15px] font-medium text-white mb-1">Point at your filter</p>
              <p className="text-[12px] text-center px-8" style={{ color: 'rgba(255,255,255,0.38)' }}>Take a photo or upload an image of your paint booth filter</p>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => cameraInputRef.current?.click()} className="flex-1 py-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-transform active:scale-95" style={{ background: '#0066cc', color: '#fff' }}>
                <Camera className="w-6 h-6" />
                <span className="text-[13px] font-semibold">Take Photo</span>
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="flex-1 py-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-transform active:scale-95" style={{ background: '#111', color: '#fff', border: '0.5px solid rgba(255,255,255,0.12)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[13px] font-semibold">Upload Photo</span>
              </button>
            </div>

            <div className="mt-6 rounded-2xl p-4" style={{ background: '#0a0a0a', border: '0.5px solid rgba(255,255,255,0.07)' }}>
              <p className="text-white text-[13px] font-semibold mb-3">How it works</p>
              {[
                { step: '1', text: 'Take or upload a photo of your filter' },
                { step: '2', text: 'AI identifies the filter type instantly' },
                { step: '3', text: 'Get matched to the right ABC Filters product' },
              ].map(item => (
                <div key={item.step} className="flex items-center gap-3 py-1.5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold" style={{ background: '#0066cc', color: '#fff' }}>{item.step}</div>
                  <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.65)' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Scanning state */}
        {scanning && capturedImage && (
          <div className="mt-2">
            <div className="relative w-full rounded-3xl overflow-hidden" style={{ height: 280 }}>
              <img src={capturedImage} alt="Scanning" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: 'rgba(0,0,0,0.65)' }}>
                <Loader2 className="w-10 h-10 text-white animate-spin mb-3" />
                <p className="text-white text-[15px] font-semibold">Analyzing filter...</p>
                <p className="text-[12px] mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>AI is identifying your filter type</p>
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && !scanning && (
          <div className="mt-4 rounded-2xl p-5 flex flex-col items-center text-center" style={{ background: '#1a0a0a', border: '0.5px solid rgba(255,59,48,0.3)' }}>
            <AlertCircle className="w-10 h-10 mb-3" style={{ color: '#ff3b30' }} />
            <p className="text-white text-[15px] font-semibold mb-1">Scan Failed</p>
            <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{error}</p>
            <button onClick={handleReset} className="mt-4 px-6 py-2.5 rounded-full text-[13px] font-semibold" style={{ background: '#0066cc', color: '#fff' }}>Try Again</button>
          </div>
        )}

        {/* Result state */}
        {result && !scanning && (
          <div className="mt-2">
            {capturedImage && (
              <div className="relative w-full rounded-3xl overflow-hidden mb-4" style={{ height: 220 }}>
                <img src={capturedImage} alt="Scanned filter" className="w-full h-full object-cover" />
                <button onClick={handleReset} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            )}

            <div className="rounded-2xl overflow-hidden" style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.10)' }}>
              <div className="px-4 py-4 flex items-center gap-3" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
                <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#34c759' }} />
                <div className="flex-1">
                  <p className="text-white text-[16px] font-bold">{result.filterType}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: confidenceColor(result.confidence) }} />
                    <p className="text-[11px] font-medium" style={{ color: confidenceColor(result.confidence) }}>{result.confidence} Confidence</p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
                <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{result.description}</p>
              </div>

              {result.recommendedProducts?.length > 0 && (
                <div className="px-4 py-3" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Recommended Products</p>
                  {result.recommendedProducts.map((prod, i) => (
                    <Link key={i} href={`/product/${prod.handle}`}>
                      <div className="flex items-center justify-between py-2.5 transition-opacity active:opacity-70">
                        <div className="flex-1">
                          <p className="text-white text-[14px] font-medium">{prod.name}</p>
                          <p className="text-[12px] mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{prod.reason}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 flex-shrink-0 ml-2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {result.tips && (
                <div className="px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Pro Tip</p>
                  <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{result.tips}</p>
                </div>
              )}
            </div>

            <button onClick={handleReset} className="w-full mt-4 py-3.5 rounded-2xl text-[14px] font-semibold transition-transform active:scale-95" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '0.5px solid rgba(255,255,255,0.12)' }}>
              Scan Another Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
