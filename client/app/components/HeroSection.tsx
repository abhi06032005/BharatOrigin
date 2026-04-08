'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

const showcaseProducts = [
  { image: "/hero4.png", title: "Handloom Saree", origin: "Varanasi, UP" },
  { image: "/hero1.png", title: "Organic Spices", origin: "Kerala" },
  { image: "/hero3.png", title: "Blue Pottery", origin: "Rajasthan" }
];

const bharatVariations = [
  { text: "Bharat", lang: "Sanskrit/English" },
  { text: "भारत", lang: "Hindi" },
  { text: "பாரதம்", lang: "Tamil" },
  { text: "భారత్", lang: "Telugu" },
  { text: "ભારત", lang: "Gujarati" },
  { text: "ভারত", lang: "Bengali" },
  { text: "ਭਾਰਤ", lang: "Punjabi" },
  { text: "ಭಾರತ", lang: "Kannada" },
  { text: "ഭാരതം"      , lang: "Malayalam" },
];

export default function CompactCinematicHero() {
  const [index, setIndex] = useState(0);
  const [langIndex, setLangIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % showcaseProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const langTimer = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % bharatVariations.length);
    }, 2500);
    return () => clearInterval(langTimer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#4D0000]">
      
      {/* 1. BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-y-0 right-0 w-[70%] z-0 h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={showcaseProducts[index].image} 
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. THE MASTER FADE (Maroon Gradient) */}
      <div className="absolute inset-0 z-10 pointer-events-none" 
        style={{ 
          background: 'linear-gradient(90deg, #4D0000 0%, #4D0000 30%, rgba(77,0,0,0.7) 50%, rgba(77,0,0,0) 80%)'
        }} 
      />

      {/* 3. MAIN CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-10 lg:px-20 w-full">
        
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            {/* ANIMATED BHARAT (TOP) */}
            <div className="h-24 flex items-end mb-2 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={langIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="text-[#D4AF37] font-serif font-black text-6xl md:text-8xl tracking-tighter uppercase leading-none"
                >
                  {bharatVariations[langIndex].text}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* BRAND NAME: ORIGIN (MIDDLE) */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#D4AF37]/40" />
              <span className="text-white font-serif tracking-[0.6em] text-lg md:text-xl uppercase font-light italic"
                style={{ textShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}>
                Origin
              </span>
              <div className="h-px w-4 bg-[#D4AF37]/40" />
            </div>

            {/* SUBHEADING (BOTTOM) */}
            <h1 className="mb-10">
              <span className="block text-stone-200 font-serif italic text-3xl md:text-5xl leading-tight">
                Discover the products <br /> of India
              </span>
            </h1>

            {/* CALL TO ACTION */}
            <div className="flex flex-col gap-8">
              <p className="text-sm text-stone-400 max-w-xs font-light leading-relaxed border-l border-[#D4AF37]/30 pl-4">
                Hand-picked heritage crafts and indigenous innovations, verified for authenticity.
              </p>

              <button className="group relative flex items-center gap-4 px-10 py-4 bg-[#D4AF37] text-[#4D0000] text-xs font-bold tracking-[0.2em] transition-all hover:bg-white hover:gap-6">
                EXPLORE COLLECTION
                <ArrowRight size={18} className="transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PRODUCT IDENTIFIER (Bottom Right) */}
      <div className="absolute bottom-10 right-10 z-30 hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-6 py-3 border border-white/10 rounded-sm"
          >
            <MapPin size={14} className="text-[#D4AF37]" />
            <p className="text-white text-[11px] font-medium tracking-widest uppercase">
              {showcaseProducts[index].title} <span className="mx-2 text-white/30">|</span> <span className="text-[#D4AF37]">{showcaseProducts[index].origin}</span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}