'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, ShieldCheck, Star } from 'lucide-react';

const BHARAT_VERSIONS = [
  { text: 'भारत', lang: 'Hindi', sub: 'The Land of Heritage' },
  { text: 'Bhārat', lang: 'Sanskrit', sub: 'The Ancient Civilization' },
  { text: 'பாரதம்', lang: 'Tamil', sub: 'The Cradle of Craft' },
  { text: 'ভারত', lang: 'Bengali', sub: 'The Canvas of Culture' },
  { text: 'ભારત', lang: 'Gujarati', sub: 'The Pride of Artisans' },
];

const HERITAGE_CARDS = [
  {
    title: 'Banarasi Silk',
    origin: 'Varanasi, UP',
    score: 98,
    img: '/hero4.png',
    craft: 'Handloom Weaving',
  },
  {
    title: 'Blue Pottery',
    origin: 'Jaipur, Rajasthan',
    score: 96,
    img: '/hero3.png',
    craft: 'Ceramic Art',
  },
  {
    title: 'Organic Spices',
    origin: 'Munnar, Kerala',
    score: 94,
    img: '/hero1.png',
    craft: 'Traditional Farming',
  },
];

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
          <div className="lg:col-span-5 flex flex-col items-start">

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tight mb-6">
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
                    className="absolute left-0 top-0 text-gradient-saffron"
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

          {/* ── Center Column: Heritage Card Stack ── */}
          <div className="lg:col-span-4 relative h-[520px] flex items-center justify-center">
            
            {/* Decorative diya glow behind the card */}
            <div className="absolute w-[300px] h-[300px] bg-orange-400/15 rounded-full blur-[60px] animate-diya pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, scale: 0.92, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotateY: -15 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative w-full max-w-[320px] aspect-[3/4] rounded-[36px] glass-warm shadow-2xl overflow-hidden p-1.5 border border-orange-200/40"
              >
                <div className="w-full h-full rounded-[28px] overflow-hidden relative">
                  <img 
                    src={HERITAGE_CARDS[activeCard].img} 
                    alt={HERITAGE_CARDS[activeCard].title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  
                  {/* Card overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="px-2.5 py-1 rounded-full bg-orange-500/90 text-white text-[10px] font-black tracking-wider">
                        BHARAT SCORE {HERITAGE_CARDS[activeCard].score}
                      </div>
                    </div>
                    <h3 className="text-white font-black text-2xl tracking-tight">{HERITAGE_CARDS[activeCard].title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-3.5 h-3.5 text-orange-300" />
                      <span className="text-orange-200 text-sm font-bold">{HERITAGE_CARDS[activeCard].origin}</span>
                    </div>
                    <p className="text-white/60 text-xs font-bold mt-1 tracking-wider uppercase">{HERITAGE_CARDS[activeCard].craft}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Card position indicators */}
            <div className="absolute -bottom-2 flex gap-2">
              {HERITAGE_CARDS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveCard(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeCard ? 'w-8 bg-orange-500' : 'w-3 bg-orange-300/40'
                  }`} 
                />
              ))}
            </div>
          </div>

          {/* ── Right Column: Stats + Floating Info Cards ── */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            
            {/* Trust badge */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="p-5 rounded-3xl glass-warm border border-orange-200/40 shadow-lg animate-float-gentle"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm">100% Verified</p>
                  <p className="text-xs text-slate-500 font-medium">Cryptographic Origin</p>
                </div>
              </div>
              <div className="h-2 w-full bg-orange-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-orange-400 to-emerald-500 rounded-full"
                />
              </div>
            </motion.div>

            {/* Artisan stat card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="p-5 rounded-3xl glass-warm border border-orange-200/40 shadow-lg animate-float-gentle"
              style={{ animationDelay: '1.5s' }}
            >
              <p className="text-3xl font-black text-gradient-saffron">2.8M+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Verified Artisans</p>
              <p className="text-xs text-slate-400 font-medium mt-2">Across 29 states & 7 union territories</p>
            </motion.div>

            {/* Rating card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="p-5 rounded-3xl glass-warm border border-orange-200/40 shadow-lg animate-float-gentle"
              style={{ animationDelay: '3s' }}
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="font-black text-slate-800 text-sm">Trusted by 50,000+ Buyers</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Globally sourced, heritage certified</p>
            </motion.div>
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