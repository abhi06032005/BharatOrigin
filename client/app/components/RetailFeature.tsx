import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Store, Navigation, ShoppingBag, ArrowUpRight } from 'lucide-react';

const RetailFeatureSection = () => {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, 80]); // Parallax downward

  const highlights = [
    { title: "Local Discovery", desc: "Made-in-India shops in your radius", icon: <MapPin /> },
    { title: "Smart Geolocation", desc: "Real-time location-based filtering", icon: <Navigation /> },
    { title: "In-Store Inventory", desc: "See available categories nearby", icon: <Store /> }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden bg-[#050505]">
      {/* Dynamic Background Accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-green-600/5 rounded-full blur-[140px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Interactive Map-Style Card */}
        <motion.div 
          style={{ y: yPos }}
          className="relative order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, x: -80, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="p-1 rounded-[2.5rem] bg-gradient-to-br from-green-500/20 to-transparent border border-white/10"
          >
            <div className="bg-[#0f0f0f] p-10 rounded-[2.4rem] backdrop-blur-3xl relative overflow-hidden">
              {/* Animated Location Pulse */}
              <div className="absolute top-8 right-8">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                </span>
              </div>

              <div className="space-y-8">
                {highlights.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.15 }}
                    className="flex gap-6 items-start group"
                  >
                    <div className="mt-1 w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 group-hover:bg-green-500 group-hover:text-black transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl">{item.title}</h4>
                      <p className="text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mock Shop Preview */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="mt-10 p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-500">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Nearby Artisan Hub</p>
                    <p className="text-green-500 text-xs">0.8 km away • Open Now</p>
                  </div>
                </div>
                <ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors" size={20} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <span className="px-5 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-black tracking-widest uppercase">
            Retail Shops
          </span>
          <h2 className="mt-8 text-5xl md:text-6xl font-extrabold text-white leading-[1.1]">
            Locate Shops <br />
            <span className="text-green-500">Near You.</span>
          </h2>
          <p className="mt-8 text-lg text-gray-400 leading-relaxed max-w-lg">
            Support the backbone of our economy. Discover local vendors selling verified 
            Indian-made goods using real-time geolocation.
          </p>
          
          <blockquote className="mt-8 pl-6 border-l-2 border-green-500/50 italic text-gray-300">
            "A movement that supports small Indian stores and local buyers."
          </blockquote>

          <div className="mt-12">
            <button className="relative px-10 py-4 font-bold text-white group">
              <span className="absolute inset-0 w-full h-full bg-green-600 rounded-xl transition-all duration-300 group-hover:bg-green-500"></span>
              <span className="relative flex items-center gap-2">
                Open Map Discovery <Navigation size={18} />
              </span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default RetailFeatureSection;