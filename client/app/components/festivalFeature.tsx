'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Sparkles, ShoppingBag, BookOpen, PartyPopper } from 'lucide-react';

import { FestivalData, FestivalType, festivals } from './festivalFeatureData';

const FestivalModeSection: React.FC = () => {
  const [activeFestival, setActiveFestival] = useState<FestivalType>('Diwali');


  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
      
      {/* ── Dynamic Festival Glow ── */}
      <motion.div
        key={activeFestival}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: festivals[activeFestival].glow }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center z-10 w-full">

        {/* ── Left Side: Glass Mobile App Preview ── */}
        <div className="relative order-2 lg:order-1 flex justify-center">
          
          <motion.div
            initial={{ opacity: 0, y: 50, rotateY: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full max-w-[340px] aspect-[9/19] rounded-[40px] glass border-white/60 shadow-2xl overflow-hidden p-2"
          >
            <div className="bg-white/80 w-full h-full rounded-[32px] overflow-hidden flex flex-col relative mask-image-phone">
              
              {/* App UI Header */}
              <motion.div 
                key={activeFestival + "header"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`p-6 pb-8 bg-gradient-to-br ${festivals[activeFestival].gradientBg} text-white relative`}
              >
                <div className="flex justify-between items-center mb-6 pt-2">
                  <CalendarDays size={20} className="opacity-80" />
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full">Live Mode</span>
                </div>
                <h4 className="text-3xl font-black">{activeFestival}</h4>
                <p className="text-xs font-bold opacity-90 mt-1">{festivals[activeFestival].text}</p>
                
                {/* Curve decoration */}
                <div className="absolute -bottom-6 left-0 right-0 h-10 bg-white rounded-t-[30px]" />
              </motion.div>

              {/* App UI Content */}
              <div className="px-5 pt-2 flex-1 glass rounded-t-[30px] -mt-5 relative z-10 flex flex-col gap-4 border-none shadow-none">
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="h-24 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <ShoppingBag className="text-slate-400" />
                  </div>
                  <div className="h-24 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                    <Sparkles className={`text-transparent bg-clip-text bg-gradient-to-br ${festivals[activeFestival].gradientText}`} />
                  </div>
                </div>
                
                <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm mt-2">
                  <div className="w-1/2 h-2.5 bg-slate-200 rounded-full mb-3" />
                  <div className="w-full h-2.5 bg-slate-100 rounded-full mb-2" />
                  <div className="w-3/4 h-2.5 bg-slate-100 rounded-full" />
                </div>
              </div>
            </div>

            {/* Floating Cultural Story Badge */}
            <motion.div
              key={activeFestival + "-badge"}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute bottom-24 -right-10 p-5 rounded-3xl glass border-white/60 shadow-xl max-w-[160px] hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm text-slate-800">
                <BookOpen size={18} />
              </div>
              <p className="text-[11px] font-bold text-slate-900 leading-tight">Read the story of {activeFestival} →</p>
            </motion.div>
          </motion.div>

          {/* ── Festival Switcher ── */}
          <div className="absolute -left-16 lg:-left-24 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            {(Object.keys(festivals) as FestivalType[]).map((fest, idx) => (
              <motion.button
                key={fest}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                onClick={() => setActiveFestival(fest)}
                className={`px-5 py-3 rounded-full text-xs font-bold transition-all shadow-sm ${activeFestival === fest
                    ? 'bg-slate-900 text-white scale-110 shadow-xl'
                    : 'glass text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
              >
                {fest}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Right Side: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-fuchsia-500/30 text-fuchsia-600 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
            <PartyPopper size={14} /> Cultural Personalization
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Celebrate <br />
            <span className={`bg-gradient-to-r ${festivals[activeFestival].gradientText} bg-clip-text text-transparent transition-all duration-1000`}>
              In Festival Mode.
            </span>
          </h2>

          <p className="mt-8 text-lg text-slate-600 font-medium leading-relaxed max-w-lg">
            Bharat Origin adapts to our calendar. From Diwali lamps to Holi colors, the platform
            transforms to prioritize <span className="text-slate-900 font-bold">artisan-made festive essentials</span> and the stories behind them.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default FestivalModeSection;