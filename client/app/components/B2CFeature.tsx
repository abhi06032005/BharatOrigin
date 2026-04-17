'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, MapPin, ShieldCheck, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import { features } from './B2CFeatureData';

const B2CFeatureSection = () => {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -80]);


  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden">
      
      {/* Localized Aurora Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* ── Left Content ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="px-4 py-2 rounded-full glass border-orange-500/30 text-orange-600 text-xs font-bold tracking-widest uppercase shadow-sm inline-block mb-6">
            B2C Marketplace
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            The Consumer <br />
            <span className="text-gradient-saffron">Shopping Ecosystem.</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-600 font-medium max-w-lg leading-relaxed">
            Empowering modern consumers with data-driven transparency. 
            <span className="text-slate-900 font-bold block mt-2"> Shop authentically with our cryptographically verified Indian-first supply chain.</span>
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-slate-900 text-white font-bold tracking-wider rounded-2xl hover:bg-orange-500 transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-orange-500/20 group">
              START SHOPPING <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* ── Right Side Animated Cards ── */}
        <motion.div style={{ y: yPos }} className="relative z-10 w-full max-w-lg mx-auto lg:ml-auto">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="p-8 rounded-[40px] glass shadow-2xl border-white/60"
          >
            <div className="space-y-4">
              {features.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center p-4 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/50 hover:bg-white hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600 group-hover:scale-110 shadow-sm transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="ml-5">
                    <h4 className="text-slate-900 font-bold text-lg">{item.title}</h4>
                    <p className="text-slate-500 font-medium text-sm mt-0.5">{item.desc}</p>
                  </div>
                  <CheckCircle2 className="ml-auto text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-orange-400 to-indigo-500 rounded-full blur-[40px] opacity-20 -z-10"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default B2CFeatureSection;