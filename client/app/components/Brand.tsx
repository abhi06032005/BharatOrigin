'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Fingerprint, History, PieChart, Sparkles } from 'lucide-react';
import { storyPoints } from './BrandData';

const BrandStorySection = () => {
  const { scrollYProgress } = useScroll();
  const cardFloat = useTransform(scrollYProgress, [0.4, 0.8], [50, -50]);



  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
      
      {/* Aurora Ambient Lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* ── Left Side: Glass Metric Card ── */}
        <div className="relative order-2 lg:order-1 pt-12 lg:pt-0">
          
          {/* Main Background Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="p-10 rounded-[40px] glass shadow-2xl border-white/60 relative z-10"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-orange-600 shadow-sm">
                <PieChart size={26} />
              </div>
              <div>
                <h4 className="text-slate-900 font-bold text-lg">Ownership Transparency</h4>
                <p className="text-slate-500 text-sm font-medium mt-0.5">Verified Supply Chain Data</p>
              </div>
            </div>

            {/* Metric Bar */}
            <div className="space-y-4 mb-10">
              <div className="flex justify-between items-end">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 font-black text-5xl">100%</span>
                <span className="text-slate-500 font-bold text-sm tracking-widest uppercase pb-1">Indian Owned</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner flex">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-orange-400 to-rose-500 rounded-full shadow-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {storyPoints.map((item, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 border border-white/50 hover:bg-white hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 group cursor-default">
                   <div className="text-orange-400 group-hover:text-orange-500 transition-colors group-hover:scale-110 transform duration-300">{item.icon}</div>
                   <span className="text-slate-700 font-bold group-hover:text-slate-900 transition-colors">{item.label}</span>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Floating Founder Card */}
          <motion.div
            style={{ y: cardFloat }}
            className="absolute -bottom-12 -right-6 lg:-right-12 p-6 rounded-3xl glass border-white/60 shadow-2xl max-w-[260px] z-20 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-400 to-rose-500 mb-5 p-[3px] shadow-lg shadow-orange-500/30">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <Sparkles className="text-orange-500" size={32} />
                </div>
              </div>
              <h5 className="text-slate-900 font-black text-lg">The Founder's Tale</h5>
              <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">Every brand has a heartbeat. We bring the faces behind the labels to the forefront.</p>
            </div>
          </motion.div>
        </div>

        {/* ── Right Side: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <span className="px-4 py-2 rounded-full glass border-orange-500/30 text-orange-600 text-xs font-bold tracking-widest uppercase shadow-sm inline-block mb-6">
            Founder Stories
          </span>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Know the <span className="text-gradient-saffron">People</span> <br />
            Behind the Product.
          </h2>
          
          <p className="mt-8 text-lg font-medium text-slate-600 leading-relaxed max-w-lg">
            We don't just list products. We tell the story of the makers. Discover the struggles, the triumphs, and the vision of Indian entrepreneurs building for the world.
          </p>

          <button className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold tracking-wider hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300">
            READ THEIR STORIES
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default BrandStorySection;