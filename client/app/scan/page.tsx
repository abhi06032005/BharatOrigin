"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts";
import Navbar from "../components/Navbar";
import { Product, PRODUCT_DATA } from "./scanProductData";

// ── Scanner config tuned for real product labels (linear barcodes) ────────────
const SCANNER_CONFIG = {
  fps: 60,                    // High FPS for fast-moving labels
  aspectRatio: 1.7778,        // 16:9 — wide viewport, ideal for horizontal barcodes
  qrbox: { width: 320, height: 150 }, // Wide rectangle, not square
  formatsToSupport: [         // Explicitly list common retail formats
    0,  // QR_CODE
    2,  // EAN_13  ← most common on Indian products
    3,  // EAN_8
    4,  // UPC_A   ← US imports on shelves
    5,  // UPC_E
    6,  // CODE_39
    7,  // CODE_93
    8,  // CODE_128 ← very common on cartons
    10, // ITF      ← used on outer packaging
    11, // CODABAR
  ],
  experimentalFeatures: {
    useBarCodeDetectorIfSupported: true, // Use native BarcodeDetector API where available (faster)
  },
  rememberLastUsedCamera: true,
  supportedScanTypes: [0], // 0 = SCAN_TYPE_CAMERA (not file)
  videoConstraints: {
    facingMode: { exact: "environment" }, // Force back camera
    width: { ideal: 1920 },              // Request highest available resolution
    height: { ideal: 1080 },
    focusMode: "continuous",             // Continuous autofocus
    exposureMode: "continuous",
  },
};

export default function ScanPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchStep, setFetchStep] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [scannedCode, setScannedCode] = useState("");
  const [camError, setCamError] = useState("");
  const [scanHint, setScanHint] = useState(false);
  const html5QrCode = useRef<any>(null);
  const scannerRunning = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    // Show the alignment hint after 3s to help users
    const t = setTimeout(() => setScanHint(true), 3000);
    return () => {
      clearTimeout(t);
      if (html5QrCode.current && scannerRunning.current) {
        html5QrCode.current.stop().catch(() => { });
      }
    };
  }, []);

  useEffect(() => {
    if (isMounted && !product && !isFetching && !notFound) {
      initScanner();
    }
  }, [isMounted, product, isFetching, notFound]);

  const initScanner = useCallback(async () => {
    if (scannerRunning.current) return;
    const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import("html5-qrcode");

    if (!html5QrCode.current) {
      html5QrCode.current = new Html5Qrcode("reader", { verbose: false });
    }

    // Build explicit supported formats list from the library's enum
    const formatsToSupport = [
      Html5QrcodeSupportedFormats.QR_CODE,
      Html5QrcodeSupportedFormats.EAN_13,
      Html5QrcodeSupportedFormats.EAN_8,
      Html5QrcodeSupportedFormats.UPC_A,
      Html5QrcodeSupportedFormats.UPC_E,
      Html5QrcodeSupportedFormats.CODE_39,
      Html5QrcodeSupportedFormats.CODE_93,
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.ITF,
      Html5QrcodeSupportedFormats.CODABAR,
    ];

    try {
      await html5QrCode.current.start(
        { facingMode: { ideal: "environment" } },
        {
          fps: 60,
          // No qrbox — scan the entire camera frame for easier real-world use
          aspectRatio: 1.7778,
          formatsToSupport,
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true,
          },
          videoConstraints: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1920, min: 640 },
            height: { ideal: 1080, min: 480 },
          },
        },
        (decodedText: string) => handleScanSuccess(decodedText),
        () => { } // suppress decode errors (expected on every frame with no barcode)
      );
      scannerRunning.current = true;
    } catch (err: any) {
      console.error("Scanner error:", err);
      setCamError(
        err?.message?.includes("Permission")
          ? "Camera permission denied. Please allow camera access and refresh."
          : "Could not start camera. Please check your browser settings."
      );
    }
  }, []);

  const handleScanSuccess = async (value: string) => {
    if (isFetching || !scannerRunning.current) return;

    if (html5QrCode.current) {
      await html5QrCode.current.stop();
      scannerRunning.current = false;
    }

    setScannedCode(value);
    setIsFetching(true);
    setNotFound(false);

    const steps = ["Decrypting Code", "Checking Local Registry", "Searching Internet..."];
    for (const step of steps) {
      setFetchStep(step);
      await new Promise((res) => setTimeout(res, 500));
    }

    // 1. Try local exact match first (Offline highly-curated data)
    let found = PRODUCT_DATA[value];
    
    // 2. Fallback to Express real-time scanner API
    if (!found) {
        setFetchStep("Generating Live Profile...");
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/shopping/scan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ barcode: value })
            });
            if (res.ok) {
                found = await res.json();
            }
        } catch (err) {
            console.error("Live scanner api failed", err);
        }
    }

    if (found) {
      setProduct(found);
    } else {
      setNotFound(true);
    }
    setIsFetching(false);
  };

  const reset = async () => {
    setProduct(null);
    setNotFound(false);
    setScannedCode("");
    setIsFetching(false);
    scannerRunning.current = false;
    setScanHint(false);
    if (html5QrCode.current) {
      try { await html5QrCode.current.stop(); } catch {}
      html5QrCode.current = null;
    }
  };

  if (!isMounted) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-900 font-sans antialiased">
      <div className="aurora-bg" />
      <div className="indian-pattern-overlay" />
      <div className="rangoli-corner rangoli-corner--tl" />
      <div className="rangoli-corner rangoli-corner--br" />

      {/* ── Camera Error ──────────────────────────────────────────────── */}
      {camError && (
        <div className="h-screen flex flex-col items-center justify-center p-8 bg-black text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-white font-bold text-lg">{camError}</p>
          <button
            onClick={() => { setCamError(""); initScanner(); }}
            className="mt-8 px-8 py-3 bg-cyan-500 text-black font-bold rounded-2xl"
          >
            Retry
          </button>
        </div>
      )}

      {/* ── Immersive Scanner ─────────────────────────────────────────── */}
      {!product && !isFetching && !notFound && !camError && (
        <div className="relative h-screen w-full overflow-hidden bg-black">
          {/* html5-qrcode mounts the camera feed here */}
          <div id="reader" className="h-full w-full" style={{ border: "none" }} />

          {/* HUD overlaid on top. pointer-events-none so it doesn't block camera */}
          <div className="absolute inset-0 z-10 pointer-events-none flex flex-col">

            {/* Top bar: Branding */}
            <div className="pt-14 pb-6 px-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
              <div>
                <h1 className="text-white text-xl font-black tracking-tight">
                  Bharat <span className="text-cyan-400">Origin</span>
                </h1>
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.25em] mt-0.5">
                  Product Origin Scanner
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white text-[10px] font-bold uppercase tracking-wider">Live</span>
              </div>
            </div>

            {/* Full-screen scan indicator — just a thin animated line across the whole screen */}
            <div className="flex-1 relative">
              {/* Corner accent marks at the very edges to show 'active' */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl opacity-70" />
              <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl opacity-70" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl opacity-70" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-cyan-400 rounded-br-xl opacity-70" />

              {/* Full-width scan laser */}
              <div
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_16px_4px_rgba(34,211,238,0.7)]"
                style={{ animation: "scanLine 2.5s ease-in-out infinite" }}
              />
            </div>

            {/* Bottom: Hints */}
            <div className="pb-safe px-6 pt-6 pb-12 bg-gradient-to-t from-black/90 to-transparent text-center space-y-3">
              <p className="text-slate-300 text-sm font-medium">
                Point camera at any <span className="text-cyan-400 font-bold">barcode</span> — full screen active
              </p>
              {scanHint && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="text-amber-300 text-[11px] font-bold">Tip: Hold steady, ensure good lighting</span>
                </div>
              )}
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em]">
                EAN-13 · UPC-A · QR · Code 128 supported
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Loading ───────────────────────────────────────────────────── */}
      {isFetching && (
        <div className="h-screen flex flex-col items-center justify-center bg-white gap-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-[3px] border-slate-100" />
            <div className="absolute inset-0 rounded-full border-[3px] border-t-cyan-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-slate-900 font-black text-lg">{fetchStep}</p>
            <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest">{scannedCode}</p>
          </div>
          <div className="flex gap-1.5 mt-2">
            {["Decrypting Code", "Searching Registry", "Verifying Origin"].map((s) => (
              <div
                key={s}
                className={`h-1 w-8 rounded-full transition-all duration-500 ${fetchStep === s ? "bg-cyan-500" : "bg-slate-100"}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Not Found ─────────────────────────────────────────────────── */}
      {notFound && !isFetching && (
        <div className="h-screen flex flex-col items-center justify-center p-8 bg-white text-center">
          <div className="w-24 h-24 rounded-3xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 shadow-sm">
            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">No Match Found</h2>
          <p className="text-slate-500 mt-4 max-w-xs leading-relaxed text-sm">
            Barcode{" "}
            <span className="font-mono font-bold text-slate-900 underline decoration-cyan-400 underline-offset-4">
              {scannedCode}
            </span>{" "}
            is not in our database yet.
          </p>
          <div className="mt-10 space-y-3 w-full max-w-xs">
            <button
              onClick={reset}
              className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-cyan-500 transition-all"
            >
              Scan Another
            </button>
            <button className="w-full py-4 rounded-2xl bg-white border border-slate-200 text-slate-500 font-semibold text-sm">
              Request Manual Review
            </button>
          </div>
        </div>
      )}

      {/* ── Results Dashboard ─────────────────────────────────────────── */}
      {product && !isFetching && (
        <>
          <Navbar />
          <main className="max-w-5xl mx-auto px-6 py-12 mt-20 relative z-10 space-y-10">

            {/* ── Non-Indian Alert Banner ───────────────────────────── */}
            {!product.isIndian && (
              <div className="rounded-3xl overflow-hidden border-2 border-red-200 shadow-2xl shadow-red-500/10">
                {/* Alert header stripe */}
                <div className="bg-gradient-to-r from-red-600 to-rose-500 px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 border-2 border-white/30">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-[10px] font-black uppercase tracking-[0.25em] opacity-80">Origin Alert</p>
                      <h3 className="text-white text-2xl font-black tracking-tight">⚠ Non-Indian Product Detected</h3>
                    </div>
                  </div>
                  <div className="sm:ml-auto flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-2">
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Bharat Score</span>
                    <span className="text-white text-3xl font-black">{product.score}</span>
                    <span className="text-white/60 text-sm">/100</span>
                  </div>
                </div>

                {/* Alert body */}
                <div className="bg-red-50 px-8 py-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    {[
                      { label: 'Brand', value: product.brand },
                      { label: 'Owned By', value: product.owner },
                      { label: 'Foreign Share', value: `${product.foreignShare}%` },
                      { label: 'HQ', value: product.headquarters || '—' },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white rounded-2xl px-4 py-3 border border-red-100">
                        <p className="text-[9px] font-black uppercase tracking-widest text-red-400 mb-1">{label}</p>
                        <p className="text-sm font-black text-slate-900 leading-tight">{value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-red-700 font-medium leading-relaxed italic">
                    💸 &quot;{product.about}&quot;
                  </p>
                </div>
              </div>
            )}

            {/* ── Indian Alternatives ───────────────────────────────── */}
            {!product.isIndian && product.alternatives && product.alternatives.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Better Indian Alternatives</h3>
                    <p className="text-sm text-slate-500">Natural · Swadeshi · Profit stays in India 🇮🇳</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {product.alternatives.map((alt, i) => (
                    <div
                      key={i}
                      className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Score bar */}
                      <div
                        className="h-1.5 w-full"
                        style={{
                          background: alt.bharat_score >= 90
                            ? 'linear-gradient(to right, #10b981, #34d399)'
                            : 'linear-gradient(to right, #f97316, #fbbf24)',
                        }}
                      />

                      {/* Image */}
                      <div className="relative h-36 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                        <img
                          src={alt.image_url}
                          alt={alt.name}
                          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              `https://placehold.co/300x200/f0fdf4/16a34a?text=${encodeURIComponent(alt.brand)}`;
                          }}
                        />
                        {/* Bharat Score badge */}
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-white rounded-xl shadow-sm border border-emerald-100 px-2 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[9px] font-black text-emerald-700">BS {alt.bharat_score}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-3">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                            {alt.brand}
                          </span>
                          <h4 className="text-sm font-black text-slate-900 mt-1.5 leading-snug">{alt.name}</h4>
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{alt.why}</p>

                        <div className="flex items-center justify-between">
                          <span className="text-lg font-black text-slate-900">{alt.price}</span>
                        </div>

                        <a
                          href={alt.shop_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          Shop Now
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Standard Info Header (for Indian products only) ────── */}
            {product.isIndian && (
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 text-[10px] font-bold rounded-full mb-3 uppercase tracking-widest">
                    {product.category}
                  </span>
                  <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">{product.name}</h2>
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
            )}

            {/* ── Ownership + About ─────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard title="Ownership" value={product.owner} />
                <StatCard title="Manufacturing" value={product.origin} />
                <StatCard title="Headquarters" value={product.headquarters} />
                <StatCard title="Revenue" value={product.revenue} />
                <div className="md:col-span-2 glass-warm p-8 rounded-[2.5rem] border border-orange-200/40 shadow-sm">
                  <h3 className="text-sm font-black text-orange-600 uppercase tracking-widest mb-4">Background</h3>
                  <p className="text-slate-700 font-medium leading-relaxed italic text-lg">&quot;{product.about}&quot;</p>
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
                        <Tooltip contentStyle={{ borderRadius: "16px", border: "none", backgroundColor: "#000", color: "#fff", fontSize: "12px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between mt-6 text-[11px] font-bold uppercase tracking-widest">
                    <span className="text-cyan-400">Indian {product.indianShare}%</span>
                    <span className="text-slate-500">Foreign {product.foreignShare}%</span>
                  </div>
                  
                  {/* Economic Impact Metric */}
                  <div className="mt-5 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                    <p className="text-xs font-medium text-slate-300 leading-relaxed">
                      <strong className="text-cyan-400">Economic Impact:</strong> For every ₹100 spent on this product, an estimated <strong className="text-teal-400">₹{product.indianShare} stays in the local economy</strong>, while <strong className="text-slate-400">₹{product.foreignShare} leaves the country</strong>.
                    </p>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="w-full py-5 rounded-2xl bg-slate-900 hover:bg-cyan-500 text-white font-bold transition-all transform active:scale-[0.98] shadow-2xl"
                >
                  Scan Next Product
                </button>
              </div>
            </div>

            {/* ── Data Authenticity Footer ────────────────────────────── */}
            <div className="border-t border-slate-200 mt-16 pt-8 text-center px-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full mb-3 border border-slate-200 justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Live Authenticity Verified</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed max-w-2xl mx-auto">
                <strong>How does this work?</strong> BharatOrigin uses real-time API integrations (powered by Google Shopping & Serper) to scrape live product data the moment you scan a barcode. The product is then instantly cross-referenced against our proprietary Swadeshi index. Our heuristic engine calculates the ownership share and economic outflow, ensuring 100% transparency before you buy.
              </p>
            </div>

          </main>
        </>
      )}

      <style jsx global>{`
        @keyframes scanLine {
          0%   { top: 10%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }

        /* Force the html5-qrcode video to fill the container properly */
        #reader {
          width: 100% !important;
          height: 100% !important;
          border: none !important;
        }
        #reader video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        /* Hide the built-in html5-qrcode UI chrome (we draw our own reticle) */
        #reader__scan_region { border: none !important; }
        #reader__dashboard { display: none !important; }
        #reader__dashboard_section_swaplink { display: none !important; }
        #reader__status_span { display: none !important; }
        #reader__filescan_input { display: none !important; }
        #reader__camera_permission_button { display: none !important; }
      `}</style>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value?: string }) {
  return (
    <div className="glass p-6 rounded-[1.8rem] border border-white/60 shadow-sm transition-all hover:shadow-md hover:border-orange-200/50">
      <p className="text-[10px] uppercase tracking-[0.15em] text-orange-500 font-bold mb-2">{title}</p>
      <p className="text-slate-900 font-black text-base leading-tight">{value || "—"}</p>
    </div>
  );
}