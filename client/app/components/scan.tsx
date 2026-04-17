'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScanText, Cpu, Search, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { detectionStats } from './scanData';

const AIScanSection = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.8, 1], [0.95, 1.05]);



  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
      
      {/* ── Ambient Glows ── */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* ── Left Side: Holographic Scanner ── */}
        <div className="relative order-2 lg:order-1 flex justify-center z-10">
          <motion.div 
            style={{ scale }}
            className="relative w-full max-w-[380px] aspect-[3/4] rounded-[40px] glass p-6 overflow-hidden shadow-2xl border-white/60"
          >
            {/* Scanning Laser Line */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
            />

            {/* Simulated Glass Viewfinder */}
            <div className="relative h-full w-full rounded-3xl border-2 border-dashed border-cyan-400/40 bg-white/40 flex flex-col items-center justify-center overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <ScanText size={140} className="text-cyan-600" />
               </div>
               
               {/* Result Popups */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1 }}
                 viewport={{ once: true }}
                 className="absolute bottom-6 left-5 right-5 space-y-3"
               >
                 {detectionStats.map((stat, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm backdrop-blur-md">
                     <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                       {stat.icon} <span>{stat.label}</span>
                     </div>
                     <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest">{stat.status}</span>
                   </div>
                 ))}
               </motion.div>
            </div>
          </motion.div>

          {/* Floating 'Found' Alternative Badge */}
          <motion.div
            initial={{ x: 50, opacity: 0, rotate: 5 }}
            whileInView={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 1.5, type: "spring" }}
            viewport={{ once: true }}
            className="absolute -top-8 -right-8 p-5 rounded-3xl glass border-white/60 shadow-xl z-30 max-w-[200px]"
          >
            <div className="flex gap-2 items-center mb-2 text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-full border border-rose-100 w-fit">
               <AlertCircle size={12} /> NON-INDIAN DETECTED
            </div>
            <p className="text-slate-900 text-sm font-bold leading-snug">Switch to: <br/> <span className="text-cyan-600 decoration-cyan-400">BharatArtisan Silk</span></p>
          </motion.div>
        </div>

        {/* ── Right Side: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2 z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-cyan-500/30 text-cyan-600 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
            <Cpu size={14} className="animate-pulse" /> Advanced Neural Network
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Scan. Detect. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-400">
              Transform.
            </span>
          </h2>
          
          <p className="mt-8 text-lg font-medium text-slate-600 leading-relaxed max-w-lg">
            Instant algorithmic transparency in your pocket. Our AI identifies product roots via barcode scanning and instantly recommends <span className="text-slate-900 font-bold">authentic Indian alternatives</span> to keep capital local.
          </p>

          <div className="mt-12">
            <button className="group relative px-10 py-5 bg-slate-900 text-white font-bold tracking-wider rounded-2xl hover:bg-cyan-500 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-3">
              TRY AI SCANNER <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AIScanSection;