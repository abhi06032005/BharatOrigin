import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, ShieldCheck, Users, Sparkles, ArrowRight } from 'lucide-react';

const ArtisanFeatureSection = () => {
  const { scrollYProgress } = useScroll();
  // Parallax move for the Bharat Score badge
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const features = [
    { 
      title: "Exclusive Portal", 
      desc: "Only 100% verified artisans can list their craft.", 
      icon: <Users className="text-blue-400" /> 
    },
    { 
      title: "GI-Tag Certified", 
      desc: "Authentic traditional crafts with geographic protection.", 
      icon: <Award className="text-yellow-400" /> 
    },
    { 
      title: "Zero Middlemen", 
      desc: "Direct-to-consumer income for local creators.", 
      icon: <Sparkles className="text-purple-400" /> 
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden bg-[#080808]">
      {/* Background Accent */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
            <ShieldCheck size={14} /> 100% Verified Marketplace
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Crafted by <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Hands, Not Hubs.
            </span>
          </h2>
          
          <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-lg">
            An exclusive space for traditional creators. We ensure every item carries the 
            weight of history and the promise of authenticity.
          </p>

          <div className="mt-10 space-y-6">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  {f.icon}
                </div>
                <div className="text-gray-200">
                  <span className="font-bold">{f.title}:</span> {f.desc}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            className="mt-12 group flex items-center gap-3 px-8 py-4 bg-blue-600 rounded-2xl font-bold text-white hover:bg-blue-500 transition-all"
          >
            Meet the Artisans <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Right Side: Visual Showcase */}
        <div className="relative">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 p-1 rounded-[3rem] bg-gradient-to-b from-blue-500/30 to-transparent border border-white/10 overflow-hidden"
          >
            <div className="bg-[#111] p-10 rounded-[2.9rem] backdrop-blur-xl">
              <div className="h-64 w-full rounded-2xl bg-gradient-to-br from-blue-900/40 to-black border border-white/5 flex items-center justify-center">
                <p className="text-blue-500/50 italic">Artisan Craft Preview</p>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-white">Traditional Handloom Silk</h3>
                <div className="flex gap-2 mt-3">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-400">GI-Tag</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-400">Handmade</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Bharat Score Badge */}
          <motion.div
            style={{ y: badgeY }}
            className="absolute -top-12 -right-6 z-20 p-6 rounded-3xl bg-white text-black shadow-2xl shadow-blue-500/20 flex flex-col items-center justify-center text-center border-4 border-blue-600"
          >
            <span className="text-xs font-black text-blue-600 uppercase tracking-tighter">Bharat Score</span>
            <span className="text-5xl font-black italic leading-none">100</span>
            <div className="mt-2 flex items-center gap-1 text-[10px] font-bold">
              <ShieldCheck size={12} className="fill-green-500 text-white" /> FULLY INDIAN
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ArtisanFeatureSection;