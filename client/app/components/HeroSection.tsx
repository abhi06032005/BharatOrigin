'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, ShieldCheck, Star } from 'lucide-react';

import { BHARAT_VERSIONS, HERITAGE_CARDS } from './HeroSectionData';

export default function HeroSection() {
  const [langIdx, setLangIdx] = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setLangIdx((prev) => (prev + 1) % BHARAT_VERSIONS.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % HERITAGE_CARDS.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      
      {/* ── Indian Decorative SVG Elements ── */}
      {/* Top-right Mandala */}
      <svg className="absolute -top-32 -right-32 w-[500px] h-[500px] opacity-[0.06] pointer-events-none" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="#C87533" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#C87533" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="#C87533" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="30" fill="none" stroke="#C87533" strokeWidth="0.5" />
        {[...Array(12)].map((_, i) => (
          <line key={i} x1="100" y1="10" x2="100" y2="190" stroke="#C87533" strokeWidth="0.3" 
                transform={`rotate(${i * 30} 100 100)`} />
        ))}
        {[...Array(8)].map((_, i) => (
          <path key={`p${i}`} d={`M100 100 Q${80 + i * 5} ${50 - i * 3} ${100 + 40 * Math.cos(i * Math.PI / 4)} ${100 + 40 * Math.sin(i * Math.PI / 4)}`} 
                fill="none" stroke="#FF9933" strokeWidth="0.5" />
        ))}
      </svg>

      {/* Bottom-left Lotus outline */}
      <svg className="absolute -bottom-20 -left-20 w-[350px] h-[350px] opacity-[0.05] pointer-events-none" viewBox="0 0 100 100">
        <path d="M50 20 Q55 40 50 55 Q45 40 50 20Z" fill="#FF9933" opacity="0.3" />
        <path d="M50 20 Q65 35 60 55 Q55 40 50 20Z" fill="#FF9933" opacity="0.2" />
        <path d="M50 20 Q35 35 40 55 Q45 40 50 20Z" fill="#FF9933" opacity="0.2" />
        <path d="M50 20 Q75 30 65 55 Q55 38 50 20Z" fill="#10B981" opacity="0.15" />
        <path d="M50 20 Q25 30 35 55 Q45 38 50 20Z" fill="#10B981" opacity="0.15" />
        <circle cx="50" cy="55" r="6" fill="none" stroke="#C87533" strokeWidth="0.5" />
      </svg>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        
        {/* ── Top Row: Badge + Language indicator ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full glass-warm"
          >
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold tracking-widest text-amber-800 uppercase">India&apos;s Heritage Marketplace</span>
          </motion.div>

          {/* Animated language badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={langIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="hidden lg:flex items-center gap-3 px-5 py-2 rounded-full glass border border-orange-200/50"
            >
              <span className="text-sm font-bold text-amber-700">{BHARAT_VERSIONS[langIdx].text}</span>
              <span className="text-[10px] tracking-widest text-amber-600/60 uppercase font-bold">{BHARAT_VERSIONS[langIdx].lang}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ── Left Column: Giant Typography ── */}
          <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-8">

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.5rem] font-black leading-[1.05] tracking-tight mb-6">
              <span className="text-slate-800">Discover</span> <br />
              <span className="text-slate-800">the Soul of</span> <br />
              <span className="relative inline-block h-[1.15em] w-full mt-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={langIdx}
                    initial={{ y: 50, opacity: 0, filter: 'blur(10px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -50, opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.7, ease: "anticipate" }}
                    className="absolute left-0 top-0 text-gradient-saffron whitespace-nowrap"
                  >
                    {BHARAT_VERSIONS[langIdx].text}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={langIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-bold text-amber-600/80 tracking-wider uppercase mb-6"
              >
                — {BHARAT_VERSIONS[langIdx].sub}
              </motion.p>
            </AnimatePresence>
            
            <p className="text-base md:text-lg text-slate-600 font-medium mb-10 max-w-md leading-relaxed">
              The world&apos;s first transparent cultural supply chain. Trace every product back to the hands that made it — from 29 states, directly to your doorstep.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold tracking-wider hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group">
                EXPLORE TRADITIONS
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-2xl glass-warm font-bold text-amber-800 tracking-wider hover:bg-white/80 transition-all duration-300 flex items-center justify-center gap-2">
                VIEW ARTISANS
              </button>
            </div>
          </div>

          {/* ── Right Column: Dynamic Hero Image ── */}
          <div className="lg:col-span-6 relative h-[450px] lg:h-[520px] xl:h-[580px] w-full rounded-[40px] overflow-hidden shadow-2xl group border border-orange-200/50">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeCard}
                src={HERITAGE_CARDS[activeCard].img}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

            {/* Bottom Content Area */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex items-end justify-between">
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={`score-${activeCard}`}
                  className="px-3 py-1.5 bg-orange-500 text-white text-[10px] font-black rounded-full mb-4 tracking-widest inline-block shadow-lg"
                >
                  BHARAT SCORE {HERITAGE_CARDS[activeCard].score}
                </motion.div>
                
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={`title-${activeCard}`}
                  className="text-white text-3xl md:text-4xl xl:text-5xl font-black mb-3 tracking-tight"
                >
                  {HERITAGE_CARDS[activeCard].title}
                </motion.h3>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={`loc-${activeCard}`}
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <span className="text-orange-100 font-bold md:text-lg">{HERITAGE_CARDS[activeCard].origin}</span>
                  <span className="text-white/40 mx-2 hidden sm:inline">•</span>
                  <span className="text-orange-200 tracking-wider text-sm font-bold uppercase hidden sm:inline">{HERITAGE_CARDS[activeCard].craft}</span>
                </motion.div>
              </div>

              {/* Floating Stat Block inside Image */}
              <div className="hidden md:flex flex-col items-end gap-3 translate-y-2">
                <div className="p-5 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-right">
                  <p className="text-4xl font-black text-white">2.8M+</p>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest font-bold mt-1">Verified Artisans</p>
                </div>
              </div>
            </div>

            {/* Top Right Trust Badge */}
            <div className="absolute top-6 right-6 hidden sm:block">
              <div className="p-3 pr-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <div>
                   <p className="font-bold text-white text-xs leading-tight">100% Verified</p>
                   <p className="text-[9px] text-white/70 uppercase tracking-wider">Origin Tracking</p>
                </div>
              </div>
            </div>

            {/* Position Indicators */}
            <div className="absolute top-8 left-8 flex gap-2">
              {HERITAGE_CARDS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveCard(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeCard ? 'w-8 bg-orange-500' : 'w-3 bg-white/40 hover:bg-white/60'
                  }`} 
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Inline SVG: Paisley wave divider at the bottom ── */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0,60 Q180,20 360,40 Q540,60 720,30 Q900,0 1080,40 Q1260,80 1440,50 L1440,80 L0,80Z" 
                fill="rgba(255,248,240,0.5)" />
        </svg>
      </div>
    </section>
  );
}