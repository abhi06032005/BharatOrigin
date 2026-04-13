import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, MapPin, ShieldCheck, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';

const B2CFeatureSection = () => {
  // Setup for scroll-based parallax
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const features = [
    { title: "Verified Products", desc: "Browse & shop authentic goods", icon: <ShoppingBag /> },
    { title: "Smart Discovery", desc: "Category-wise local search", icon: <MapPin /> },
    { title: "Origin Data", desc: "Full breakdown of product roots", icon: <ShieldCheck /> },
    { title: "Bharat Score", desc: "Trust & transparency indicator", icon: <BarChart3 /> },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden bg-[#0a0a0a]">
      {/* Background Glow Decor */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content & Why it Matters */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          viewport={{ once: true }}
        >
          <span className="px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-semibold tracking-widest uppercase">
            B2C Marketplace
          </span>
          <h2 className="mt-6 text-5xl md:text-6xl font-bold text-white leading-tight">
            The User <span className="text-orange-500">Shopping</span> Experience.
          </h2>
          <p className="mt-6 text-xl text-gray-400 max-w-lg">
            Empowering consumers with data-driven transparency. 
            <span className="text-white"> A safer, transparent, “Indian-first” shopping ecosystem.</span>
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center gap-2">
              Start Shopping <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Right Side: Animated Card Stack */}
        <motion.div 
          style={{ y: yPos }} // Parallax effect
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "anticipate" }}
            viewport={{ once: true }}
            className="relative z-10 p-8 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="grid grid-cols-1 gap-6">
              {features.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-orange-500/50 hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-500/20 text-orange-500 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="ml-5">
                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                  <CheckCircle2 className="ml-auto text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decorative Floating Element */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full blur-3xl opacity-20"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default B2CFeatureSection;