"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const PRODUCT_MAP: Record<string, string> = {
  "8901030745858": "Dove Shampoo",
  "8906087770007": "Mamaearth Shampoo",
};

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }

        reader.decodeFromVideoDevice('', videoRef.current!, (res : any) => {
          if (res) {
            const code = res.getText();
            console.log("Scanned:", code);

            if (PRODUCT_MAP[code]) {
              setResult(PRODUCT_MAP[code]);

              // Stop camera
              stream.getTracks().forEach((t) => t.stop());
              reader.reset();
            }
          }
        });
      })
      .catch((err) => console.error("Camera error:", err));

    return () => reader.reset();
  }, []);

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center text-white p-4 relative">
      <h1 className="text-3xl font-bold mt-4">Scan a Product</h1>

      {!result ? (
        <div className="relative w-full max-w-md mt-6">

          {/* LIVE CAMERA FEED */}
          <video
            ref={videoRef}
            className="w-full rounded-xl border-2 border-yellow-500"
          />

          {/* GOLDEN SCANNER FRAME */}
          <div className="absolute inset-0 border-4 border-yellow-500 rounded-xl pointer-events-none shadow-[0_0_25px_gold]" />

          {/* ANIMATED LASER */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="laser"></div>
          </div>
        </div>
      ) : (
        <div className="mt-10 p-6 bg-gray-900 rounded-xl border border-yellow-500 shadow-xl">
          <h2 className="text-2xl font-semibold">Product Found</h2>
          <p className="mt-2 text-xl text-yellow-400">{result}</p>
        </div>
      )}

      {/* CSS FOR LASER */}
      <style jsx>{`
        .laser {
          position: absolute;
          top: -10%;
          left: 0;
          width: 100%;
          height: 4px;
          background: red;
          box-shadow: 0 0 12px red;
          animation: scan 2s linear infinite;
        }

        @keyframes scan {
          0% {
            top: 0%;
          }
          50% {
            top: 95%;
          }
          100% {
            top: 0%;
          }
        }
      `}</style>
    </div>
  );
}