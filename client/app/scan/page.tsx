"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

// 1. Audit Data Mockup
const PRODUCT_DATA: Record<string, any> = {
  "6281006438842": { 
    name: "Dove Shampoo", 
    score: 45, 
    brand: "Unilever", 
    owner: "Foreign (PLC)", 
    origin: "India", 
    auditLogs: ["Checking GS1 Prefix...", "Parent: Unilever found", "FDI Analysis: 100%", "Locating regional plants..."] 
  },
  "8906087772859": { 
    name: "Mamaearth Shampoo", 
    score: 92, 
    brand: "Honasa", 
    owner: "Indian", 
    origin: "India", 
    auditLogs: ["GS1: 890 Verified", "Entity: Honasa Consumer Ltd", "Ownership: Indian Majority", "Verifying 'Made in India' cert..."] 
  },
};

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scannedData, setScannedData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditStep, setAuditStep] = useState(0);

  useEffect(() => {
    let isMounted = true;
    
    // We use numeric keys for Hints to avoid the "DecodeHintType undefined" error
    // 2 = POSSIBLE_FORMATS. [2, 3, 4, 11] = EAN_13, EAN_8, UPC_A, UPC_E
  
    const reader = new BrowserMultiFormatReader( );
    let streamRef: MediaStream | null = null;
      const hints = new Map();
    hints.set(2, [2, 3, 4, 11]); 
    (reader as any).hints = hints;
    const startScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: "environment", 
            width: { ideal: 1280 }, 
            height: { ideal: 720 } 
          } 
        });
        
        if (!isMounted) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        streamRef = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          await videoRef.current.play();

          reader.decodeFromVideoDevice(undefined as any, videoRef.current, (res) => {
            if (res && isMounted && !isAnalyzing && !scannedData) {
              const code = res.getText();
              if (PRODUCT_DATA[code]) {
                handleMatch(PRODUCT_DATA[code], stream);
              }
            }
          });
        }
      } catch (err) {
        console.error("Scanner Error:", err);
      }
    };

    const handleMatch = (data: any, stream: MediaStream) => {
      setIsAnalyzing(true);
      stream.getTracks().forEach((t) => t.stop());
      reader.reset();

      let step = 0;
      const interval = setInterval(() => {
        step++;
        setAuditStep(step);
        if (step >= 4) {
          clearInterval(interval);
          setTimeout(() => {
            setScannedData(data);
            setIsAnalyzing(false);
          }, 400);
        }
      }, 500);
    };

    startScanner();

    return () => {
      isMounted = false;
      reader.reset();
      if (streamRef) streamRef.getTracks().forEach((t) => t.stop());
    };
  }, [isAnalyzing, scannedData]);

  const getScoreColor = (score: number) => {
    if (score > 80) return "text-green-500";
    if (score > 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col font-sans overflow-hidden select-none">
      
      {/* 1. CAMERA / SCANNING UI */}
      {!isAnalyzing && !scannedData && (
        <div className="flex-1 relative w-full h-full">
          <video 
            ref={videoRef} 
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            playsInline
            muted
            autoPlay
          />
          
          {/* PAYTM STYLE OVERLAY */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            
            {/* VIBRANT SCANNER BOX */}
            <div className="relative w-72 h-48 border-2 border-white/10 rounded-3xl overflow-hidden bg-white/5 backdrop-blur-[2px]">
              
              {/* SOFT SCANNING BEAM */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-orange-500/60 blur-md animate-beam" />
              
              {/* CORNER STARS (PAYTM FEEL) */}
              <div className="star absolute -top-1 -left-1 text-orange-500 text-2xl">✦</div>
              <div className="star absolute -top-1 -right-1 text-orange-400 text-2xl" style={{ animationDelay: '0.2s' }}>✦</div>
              <div className="star absolute -bottom-1 -left-1 text-orange-300 text-2xl" style={{ animationDelay: '0.4s' }}>✦</div>
              <div className="star absolute -bottom-1 -right-1 text-white text-2xl" style={{ animationDelay: '0.6s' }}>✦</div>

              {/* CENTER GLOW */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-orange-500/5 to-transparent animate-pulse" />
            </div>

            <div className="mt-12 text-center">
              <h1 className="text-2xl font-black italic tracking-tighter text-orange-500">BHARAT<span className="text-white">ORIGIN</span></h1>
              <p className="mt-2 text-[10px] font-black tracking-[0.4em] uppercase text-white/40 animate-pulse">
                Align Barcode to Audit
              </p>
            </div>
          </div>

          {/* VIGNETTE */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
        </div>
      )}

      {/* 2. ANALYZING STATE */}
      {isAnalyzing && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-950 animate-in fade-in duration-300">
          <div className="relative mb-12">
            <div className="w-28 h-28 border-[6px] border-orange-500/10 border-t-orange-500 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-orange-500 italic">
               {auditStep * 25}%
            </div>
          </div>
          <div className="w-full max-w-xs space-y-4 text-center">
            <h2 className="text-xl font-black italic text-orange-500 tracking-tighter uppercase">Compiling Origin Audit</h2>
            <div className="bg-zinc-900/60 rounded-[2.5rem] p-6 border border-white/5 backdrop-blur-3xl text-left">
              {PRODUCT_DATA["8906087772859"].auditLogs.map((log: string, i: number) => (
                <p key={i} className={`text-xs mb-3 flex items-center gap-3 transition-all duration-500 ${i < auditStep ? 'opacity-100 text-green-400 font-bold' : 'opacity-10'}`}>
                   {i < auditStep ? "▶" : "○"} {log}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. RESULT STATE */}
      {scannedData && (
        <div className="flex-1 p-6 flex flex-col items-center justify-center bg-black animate-in slide-in-from-bottom-20 duration-500">
          <div className="w-full max-w-sm bg-zinc-900 border-t-4 border-orange-600 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
            
            <div className="flex justify-between items-start mb-10">
              <div className="max-w-[70%]">
                <h2 className="text-3xl font-black italic mb-2 tracking-tighter leading-tight">{scannedData.name}</h2>
                <div className="bg-orange-500/20 text-orange-400 text-[10px] font-black px-3 py-1 rounded-lg inline-block uppercase tracking-widest italic">
                  {scannedData.brand}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-6xl font-black italic tracking-tighter leading-none ${getScoreColor(scannedData.score)}`}>
                  {scannedData.score}
                </div>
                <p className="text-[9px] text-zinc-500 uppercase font-black mt-1">Bharat Score</p>
              </div>
            </div>

            <div className="space-y-3 mb-10">
              <div className="flex items-center justify-between p-5 bg-black/40 rounded-2xl border border-white/5">
                <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Ownership</span>
                <span className="font-bold text-white text-xs">{scannedData.owner}</span>
              </div>
              <div className="flex items-center justify-between p-5 bg-black/40 rounded-2xl border border-white/5">
                <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Plant</span>
                <span className="font-bold text-white text-xs uppercase tracking-tighter">{scannedData.origin}</span>
              </div>
            </div>

            <button 
              onClick={() => { setScannedData(null); setAuditStep(0); }} 
              className="w-full py-6 bg-orange-600 text-white rounded-4xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-orange-900/40 active:scale-95 transition-all"
            >
              Continue Audit
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .star {
          animation: sparkle 1.5s infinite ease-in-out;
          filter: drop-shadow(0 0 8px #f97316);
          will-change: transform, opacity;
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(0.6) rotate(0deg); opacity: 0.4; }
          50% { transform: scale(1.1) rotate(45deg); opacity: 1; }
        }
        .animate-beam {
          will-change: transform;
          animation: beamMove 2.5s infinite ease-in-out;
        }
        @keyframes beamMove {
          0%, 100% { transform: translateY(-70px); opacity: 0.2; }
          50% { transform: translateY(70px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}