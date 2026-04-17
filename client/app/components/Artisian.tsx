'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, ShieldCheck, Users, Sparkles, ArrowRight } from 'lucide-react';
import { features } from './ArtisianData';

const ArtisanFeatureSection = () => {
  const { scrollYProgress } = useScroll();
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, 60]);


  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* ── Left Side: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="lg:w-5/12 z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-emerald-500/30 text-emerald-600 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
            <ShieldCheck size={14} /> 100% Verified Marketplace
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Crafted by <br />
            <span className="text-gradient-emerald">
              Hands, Not Hubs.
            </span>
          </h2>
          
          <p className="mt-8 text-lg text-slate-600 font-medium leading-relaxed max-w-lg">
            An exclusive space for traditional creators. We ensure every item carries the 
            weight of history and the promise of authenticity.
          </p>

          <div className="mt-10 space-y-4">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-5 p-4 rounded-3xl glass hover:bg-white/70 transition-colors border border-white/50 shadow-sm"
              >
                <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100 flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">{f.title}</p>
                  <p className="text-slate-500 text-sm font-medium">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            className="mt-10 group flex items-center gap-3 px-8 py-4 bg-emerald-500 rounded-2xl font-bold tracking-wider text-white hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/30"
          >
            MEET THE ARTISANS <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* ── Right Side: Bento Grid Showcase ── */}
        <div className="lg:w-7/12 relative h-[700px] w-full z-10 flex items-center justify-center">
          
          <div className="grid grid-cols-2 gap-6 w-full h-[600px] relative">
            
            {/* Top Left Tall Card */}
            <motion.div
              style={{ y: yParallax1 }}
              className="col-span-1 row-span-2 glass rounded-[40px] p-2 border-white/60 shadow-2xl overflow-hidden relative group"
            >
              <div className="w-full h-full rounded-[32px] overflow-hidden relative">
                <img src="/hero2.png" alt="Artisan 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <p className="text-white font-bold text-xl">Heritage Weavers</p>
                  <p className="text-emerald-400 font-semibold text-sm">Varanasi, UP</p>
                </div>
              </div>
            </motion.div>
            
            {/* Top Right Square Card */}
            <motion.div
              style={{ y: yParallax2 }}
              className="col-span-1 row-span-1 glass rounded-[40px] p-8 border-white/60 shadow-xl flex flex-col justify-center items-start group hover:bg-white/80 transition-colors"
            >
               <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                 <ShieldCheck size={28} />
               </div>
               <p className="text-slate-900 font-black text-3xl">100%</p>
               <p className="text-slate-500 font-bold text-sm tracking-wide uppercase mt-1">Traceable Origin</p>
            </motion.div>

            {/* Bottom Right Wide Card */}
            <motion.div
              style={{ y: yParallax2 }}
              className="col-span-1 row-span-1 glass rounded-[40px] p-2 border-white/60 shadow-2xl overflow-hidden relative group"
            >
              <div className="w-full h-full rounded-[32px] overflow-hidden relative">
                <img src="/hero4.png" alt="Artisan detail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <p className="text-white font-bold text-xl">GI-Tagged Silk</p>
                </div>
              </div>
            </motion.div>

          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-emerald-500/10 rounded-full border-dashed -z-10"
          />
        </div>

      </div>
    </section>
  );
};

export default ArtisanFeatureSection;