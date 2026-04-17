"use client";

import { useEffect, useRef, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Product, PRODUCT_DATA } from "./scanProductData";

export default function ScanPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchStep, setFetchStep] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [scannedCode, setScannedCode] = useState("");
  const html5QrCode = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (html5QrCode.current) {
        html5QrCode.current.stop().catch(() => { });
      }
    };
  }, []);

  useEffect(() => {
    if (isMounted && !product && !isFetching && !notFound) {
      initScanner();
    }
  }, [isMounted, product, isFetching, notFound]);

  const initScanner = async () => {
    const { Html5Qrcode } = await import("html5-qrcode");
    if (!html5QrCode.current) {
      html5QrCode.current = new Html5Qrcode("reader");
    }

    try {
      await html5QrCode.current.start(
        { facingMode: "environment" },
        { fps: 30, aspectRatio: 1.0 },
        (decodedText: string) => handleScanSuccess(decodedText),
        () => { }
      );
    } catch (err) {
      console.error("Scanner error:", err);
    }
  };

  const handleScanSuccess = async (value: string) => {
    if (isFetching) return;
    if (html5QrCode.current) await html5QrCode.current.stop();

    setScannedCode(value);
    setIsFetching(true);
    setNotFound(false);

    const steps = ["Decrypting Code", "Searching Registry", "Verifying Origin"];
    for (const step of steps) {
      setFetchStep(step);
      await new Promise((res) => setTimeout(res, 600));
    }

    const found = PRODUCT_DATA[value];
    if (found) {
      setProduct(found);
    } else {
      setNotFound(true);
    }
    setIsFetching(false);
  };

  const reset = () => {
    setProduct(null);
    setNotFound(false);
    setScannedCode("");
    setIsFetching(false);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans antialiased">
      {/* --- Immersive Scanner --- */}
      {!product && !isFetching && !notFound && (
        <div className="relative h-screen w-full overflow-hidden bg-black">
          <div id="reader" className="h-full w-full object-cover" />
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-0 bg-black/20" />
            {/* Smooth Laser Animation */}
            <div className="absolute top-0 left-0 w-full h-0.75 bg-liinear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] animate-scan-laser" />
            <div className="absolute bottom-0 left-0 w-full p-10 pb-20 bg-linear-to-t from-black/90 to-transparent text-center">
              <h1 className="text-white text-3xl font-light tracking-tight">
                Bharat <span className="font-bold text-cyan-400">Origin</span>
              </h1>
              <p className="text-slate-300 text-xs mt-3 uppercase tracking-[0.2em] opacity-70">
                Scanning for Indian Ownership
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- Professional Loading --- */}
      {isFetching && (
        <div className="h-screen flex flex-col items-center justify-center bg-white">
          <div className="w-16 h-16 rounded-full border-[3px] border-slate-100 border-t-cyan-500 animate-spin" />
          <p className="mt-8 text-slate-400 font-medium tracking-widest uppercase text-[10px]">
            {fetchStep}...
          </p>
        </div>
      )}

      {/* --- Not Found State --- */}
      {notFound && !isFetching && (
        <div className="h-screen flex flex-col items-center justify-center p-8 bg-white text-center">
          <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-8 border border-slate-100">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">No Match Found</h2>
          <p className="text-slate-500 mt-4 max-w-xs leading-relaxed">
            Barcode <span className="font-mono font-bold text-slate-900 underline decoration-cyan-400 underline-offset-4">{scannedCode}</span> is not in our database yet.
          </p>
          <div className="mt-10 space-y-3 w-full max-w-xs">
            <button onClick={reset} className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-black transition-all">
              Try Another
            </button>
            <button className="w-full py-4 rounded-2xl bg-white border border-slate-200 text-slate-500 font-semibold text-sm">
              Request Manual Review
            </button>
          </div>
        </div>
      )}

      {/* --- Results Dashboard --- */}
      {product && !isFetching && (
        <main className="max-w-5xl mx-auto px-6 py-12">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 text-[10px] font-bold rounded-full mb-3 uppercase tracking-widest">
                {product.category}
              </span>
              <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">
                {product.name}
              </h2>
              <p className="text-xl text-slate-500 mt-2">{product.brand}</p>
            </div>
            <div className="flex items-center gap-4 bg-white border border-slate-100 p-5 rounded-3xl shadow-sm">
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</p>
                <p className={`text-4xl font-black ${product.score > 70 ? "text-emerald-500" : "text-orange-500"}`}>
                  {product.score}
                </p>
              </div>
              <div className="h-10 w-px bg-slate-100" />
              <div className={`w-3 h-3 rounded-full ${product.score > 70 ? "bg-emerald-500 shadow-[0_0_12px_#10b981]" : "bg-orange-500"}`} />
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard title="Ownership" value={product.owner} />
              <StatCard title="Manufacturing" value={product.origin} />
              <StatCard title="Headquarters" value={product.headquarters} />
              <StatCard title="Revenue" value={product.revenue} />
              <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Background</h3>
                <p className="text-slate-600 leading-relaxed italic text-lg">"{product.about}"</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Ownership Mix</h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Indian", value: product.indianShare },
                          { name: "Foreign", value: product.foreignShare },
                        ]}
                        dataKey="value"
                        innerRadius={55}
                        outerRadius={75}
                        stroke="none"
                        paddingAngle={8}
                      >
                        <Cell fill="#22d3ee" />
                        <Cell fill="#334155" />
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#000', color: '#fff', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between mt-6 text-[11px] font-bold uppercase tracking-widest">
                  <span className="text-cyan-400">Indian {product.indianShare}%</span>
                  <span className="text-slate-500">Foreign {product.foreignShare}%</span>
                </div>
              </div>
              <button onClick={reset} className="w-full py-5 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold transition-all transform active:scale-[0.98] shadow-2xl">
                Scan Next Product
              </button>
            </div>
          </div>
        </main>
      )}

      <style jsx global>{`
        @keyframes scan-laser {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-laser { animation: scan-laser 3s ease-in-out infinite; }
        #reader video { object-fit: cover !important; height: 100vh !important; }
      `}</style>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value?: string }) {
  return (
    <div className="bg-white p-6 rounded-[1.8rem] border border-slate-100 shadow-sm transition-all hover:shadow-md">
      <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400 font-bold mb-2">{title}</p>
      <p className="text-slate-900 font-bold text-base leading-tight">{value || "—"}</p>
    </div>
  );
}