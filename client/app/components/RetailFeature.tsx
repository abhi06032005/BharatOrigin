'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Store, Navigation, ShoppingBag, ArrowUpRight } from 'lucide-react';

const RetailFeatureSection = () => {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const highlights = [
    { title: "Local Discovery", desc: "Made-in-India shops in your radius", icon: <MapPin /> },
    { title: "Smart Geolocation", desc: "Real-time location-based filtering", icon: <Navigation /> },
    { title: "In-Store Inventory", desc: "See available categories nearby", icon: <Store /> }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
      
      {/* ── Ambient Glows ── */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* ── Left Side: Interactive Glass Card ── */}
        <motion.div style={{ y: yPos }} className="relative order-2 lg:order-1 z-10 w-full max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -80, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="p-10 rounded-[40px] glass shadow-2xl border-white/60 relative overflow-hidden"
          >
            {/* Animated Location Pulse */}
            <div className="absolute top-10 right-10">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
              </span>
            </div>

            <div className="space-y-8 mt-4">
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.15 }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start group"
                >
                  <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl bg-white/60 border border-white/50 text-emerald-600 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-lg">{item.title}</h4>
                    <p className="text-slate-500 font-medium text-sm mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mock Shop Preview */}
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              className="mt-12 p-5 rounded-3xl glass border border-white/60 flex items-center justify-between group cursor-pointer shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                  <ShoppingBag size={22} />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-[15px]">Nearby Artisan Hub</p>
                  <p className="text-emerald-600 font-bold text-xs mt-0.5 tracking-wide">0.8 km away • OPEN NOW</p>
                </div>
              </div>
              <ArrowUpRight className="text-slate-400 group-hover:text-emerald-500 transition-colors duration-300" size={24} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Right Side: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <span className="px-4 py-2 rounded-full glass border-emerald-500/30 text-emerald-600 text-xs font-bold tracking-widest uppercase shadow-sm inline-block mb-6">
            Hyperlocal Retail
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Locate Shops <br />
            <span className="text-gradient-emerald">Near You.</span>
          </h2>
          <p className="mt-8 text-lg font-medium text-slate-600 leading-relaxed max-w-lg">
            Support the backbone of our economy. Discover local vendors selling verified 
            Indian-made goods using our real-time spatial geolocation engine.
          </p>
          
          <button className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold tracking-wider hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 flexitems-center gap-3 group">
            OPEN RADAR
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default RetailFeatureSection;