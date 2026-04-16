'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Star, ShoppingBag, Users, Award, ChevronRight } from 'lucide-react';

interface StateInfo {
  accent: string;
  glow: string;
  border: string;
  items: string[];
}

type StateName = 'Karnataka' | 'Rajasthan' | 'Kerala';

const StatePrideSection: React.FC = () => {
  const [selectedState, setSelectedState] = useState<StateName>('Karnataka');

  const stateData: Record<StateName, StateInfo> = {
    Karnataka: { 
      accent: 'text-amber-500', 
      glow: 'bg-amber-500/10',
      border: 'border-amber-500/50', 
      items: ['Channapatna Toys', 'Mysore Silk', 'Dharwad Pedha'] 
    },
    Rajasthan: { 
      accent: 'text-rose-500', 
      glow: 'bg-rose-500/10',
      border: 'border-rose-500/50', 
      items: ['Blue Pottery', 'Bandhani Textiles', 'Makrana Marble'] 
    },
    Kerala: { 
      accent: 'text-emerald-500', 
      glow: 'bg-emerald-500/10',
      border: 'border-emerald-500/50', 
      items: ['Aranmula Kannadi', 'Kasavu Sarees', 'Coir Products'] 
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
      
      {/* ── Ambient Background Glows ── */}
      <motion.div
        key={selectedState}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none transition-colors duration-700 ${stateData[selectedState].glow}`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[140px] mix-blend-screen" />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <Map size={800} strokeWidth={0.5} className="text-slate-900" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* ── Left Side Content ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/50 text-slate-800 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm transition-colors duration-500`}>
            <Star size={14} className={`${stateData[selectedState].accent}`} /> State Pride Mode
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Made In <br />
            <span className={`${stateData[selectedState].accent} transition-colors duration-700`}>
              My {selectedState}.
            </span>
          </h2>
          
          <p className="mt-8 text-lg font-medium text-slate-600 leading-relaxed max-w-lg">
            Celebrate the craftsmanship of your roots. We filter the entire ecosystem to bring 
            you the <span className="text-slate-900 font-bold">best brands, artisans, and GI-tagged specialties</span> from your home state.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            {(Object.keys(stateData) as StateName[]).map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`px-6 py-3.5 rounded-2xl font-bold transition-all border shadow-sm ${
                  selectedState === state 
                  ? `bg-slate-900 text-white ${stateData[state].border} shadow-lg scale-105` 
                  : 'glass text-slate-600 border-white/60 hover:bg-white/80 hover:text-slate-900'
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Right Side Glass Showcase ── */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedState}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`p-10 rounded-[40px] glass backdrop-blur-3xl border-2 ${stateData[selectedState].border} shadow-2xl bg-white/70`}
            >
              <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-200/50">
                <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">State Specialties</h4>
                <div className={`p-3 rounded-2xl bg-white shadow-sm ${stateData[selectedState].accent}`}>
                  <Award size={24} />
                </div>
              </div>

              <div className="space-y-4">
                {stateData[selectedState].items.map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    key={idx} 
                    className="flex items-center justify-between p-5 rounded-2xl bg-white/60 hover:bg-white border border-white/80 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <div className="flex gap-4 items-center">
                      <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center transition-colors group-hover:bg-slate-100 ${stateData[selectedState].accent}`}>
                        <ShoppingBag size={18} />
                      </div>
                      <span className="text-slate-800 font-bold group-hover:text-slate-900">{item}</span>
                    </div>
                    <ChevronRight className="text-slate-400 group-hover:text-slate-900 transition-colors" size={20} />
                  </motion.div>
                ))}
              </div>

              {/* Verified Artisans stat bottom row */}
              <div className="mt-10 p-5 rounded-3xl bg-slate-900 flex justify-between items-center text-white border border-slate-800 shadow-xl overflow-hidden relative">
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[40px] rounded-full opacity-30 ${stateData[selectedState].glow.replace('/10', '')}`} />
                <div className="flex items-center gap-3 relative z-10">
                  <Users size={20} className="text-slate-300" />
                  <span className="font-bold tracking-wide">Verified Makers</span>
                </div>
                <div className={`font-mono font-black text-2xl relative z-10 ${stateData[selectedState].accent}`}>
                  2,400+
                </div>
              </div>
              
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default StatePrideSection;