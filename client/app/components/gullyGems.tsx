'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Store, Camera, Diamond, Navigation } from 'lucide-react';

const GullyGemsSection = () => {

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
      
      {/* ── Spotlight Amber Glows ── */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Indian motif */}
      <svg className="absolute top-10 right-10 w-[200px] h-[200px] opacity-[0.04] pointer-events-none" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#C87533" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="#C87533" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="#C87533" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#FF9933" strokeWidth="0.5" />
      </svg>

      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        
          {/* ── Left Side: Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="z-10 order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-warm border border-amber-200/40 text-amber-700 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
              <Camera size={14} /> Hyperlocal Discovery
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-slate-800 leading-[1.05] tracking-tight">
              Uncover the <br />
              <span className="text-gradient-saffron">Gully Gems.</span>
            </h2>
            
            <p className="mt-8 text-lg text-slate-600 font-medium leading-relaxed max-w-lg">
              Not every great product is online. Point your camera at a local shop, and our AI fetches their verified catalog, origins, and owner details instantly.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
              <div className="p-5 rounded-3xl glass-warm border border-orange-200/40 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mb-3 shadow-sm">
                   <Navigation className="w-5 h-5 text-amber-600" />
                 </div>
                 <p className="font-bold text-slate-800">Geo-Framing</p>
                 <p className="text-sm text-slate-500 font-medium mt-1">AR based shop tagging</p>
              </div>
              <div className="p-5 rounded-3xl glass-warm border border-orange-200/40 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center mb-3 shadow-sm">
                   <Diamond className="w-5 h-5 text-emerald-600" />
                 </div>
                 <p className="font-bold text-slate-800">Hidden Inventory</p>
                 <p className="text-sm text-slate-500 font-medium mt-1">Unlock offline exclusives</p>
              </div>
            </div>
          </motion.div>

          {/* ── Right Side: Radar Animation on Dark Glass ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="z-10 order-2 flex items-center justify-center"
          >
            <div className="w-full max-w-[420px] aspect-square rounded-[3rem] p-1.5 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl relative overflow-hidden mx-auto">
              <div className="absolute inset-0 bg-slate-900/90 rounded-[2.7rem] flex items-center justify-center m-1.5 overflow-hidden">
                
                {/* Radar Rings */}
                <div className="absolute w-[80%] h-[80%] rounded-full border border-emerald-500/20" />
                <div className="absolute w-[55%] h-[55%] rounded-full border border-emerald-500/30" />
                <div className="absolute w-[30%] h-[30%] rounded-full border border-emerald-500/40" />
                <div className="absolute w-[14%] h-[14%] rounded-full border-2 border-emerald-400/60 bg-emerald-500/15 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                  <Store className="w-5 h-5 text-emerald-400" />
                </div>

                {/* Sweeping Radar Beam */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[40%] h-[40%] origin-bottom-right bottom-1/2 right-1/2"
                  style={{ 
                    background: 'conic-gradient(from 0deg at 100% 100%, transparent 0deg, rgba(16, 185, 129, 0.4) 30deg, transparent 60deg)',
                  }}
                />

                {/* Ping Dots (Hidden Gems) */}
                {[
                  { top: '22%', left: '68%', delay: 0 },
                  { top: '62%', left: '22%', delay: 1.5 },
                  { top: '72%', left: '75%', delay: 3 },
                  { top: '35%', left: '32%', delay: 4.5 },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0.5, 0], scale: [0, 1.2, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: pos.delay }}
                    className="absolute w-3 h-3"
                    style={{ top: pos.top, left: pos.left }}
                  >
                    <div className="w-full h-full bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                  </motion.div>
                ))}

                {/* Cross-hair gridlines */}
                <div className="absolute w-full h-[1px] bg-emerald-500/10" />
                <div className="absolute h-full w-[1px] bg-emerald-500/10" />

              </div>
              
              {/* Floating label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
                className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-800/90 backdrop-blur-md border border-slate-700/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Diamond className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">3 Gems Found</p>
                      <p className="text-emerald-400 text-[10px] font-bold tracking-wider">SCANNING NEARBY...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        
        </div>
      </div>
    </section>
  );
};

export default GullyGemsSection;