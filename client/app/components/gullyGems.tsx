import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, MapPin, Search, Compass, MoveUpRight, Info } from 'lucide-react';

const GullyGemsSection = () => {
  const { scrollYProgress } = useScroll();
  // Parallax for the 'hidden gems' icons
  const float = useTransform(scrollYProgress, [0.8, 1], [0, -40]);

  const gemCategories = [
    { label: "Master Potters", distance: "2.4 km", color: "bg-orange-500" },
    { label: "Traditional Weavers", distance: "4.1 km", color: "bg-blue-500" },
    { label: "Tribal Craft Artists", distance: "7.8 km", color: "bg-emerald-500" },
    { label: "Handicraft Workers", distance: "3.2 km", color: "bg-amber-500" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden bg-[#050505]">
      {/* Radial Gradient Glow - Earthy Tones */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-xs font-black tracking-widest uppercase mb-8">
            <Compass size={14} className="animate-spin-slow" /> Hyperlocal Discovery
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Discover <br />
            <span className="text-orange-500">Gully Gems.</span>
          </h2>
          
          <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-lg">
            The invisible backbone of Indian craft is now visible. Find world-class artisans 
            hiding in the lanes within <span className="text-white font-bold">5–10 km of your current location.</span>
          </p>

          <div className="mt-10 p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
             <Info className="text-orange-500 shrink-0" size={20} />
             <p className="text-sm text-gray-500 italic">
               "No platform currently maps hyperlocal artisans. We are bridging the gap between 
               traditional talent and the modern buyer."
             </p>
          </div>

          <div className="mt-12">
            <button className="flex items-center gap-4 px-8 py-4 bg-orange-600 rounded-2xl font-bold text-white hover:bg-orange-500 transition-all group">
              Find Gems Near You <MoveUpRight className="group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Right Side: Radar Discovery Map */}
        <div className="relative order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 p-2 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 overflow-hidden"
          >
            <div className="bg-[#0f0f0f] rounded-[2.8rem] p-8 aspect-square flex items-center justify-center relative overflow-hidden">
              
              {/* Radar Rings */}
              <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full" />
              <div className="absolute w-[60%] h-[60%] border border-white/5 rounded-full" />
              <div className="absolute w-[40%] h-[40%] border border-white/10 rounded-full" />
              
              {/* Center Point (User) */}
              <div className="relative z-20 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(234,88,12,0.5)]">
                 <MapPin size={24} className="text-white" />
              </div>

              {/* Floating Artisan Points */}
              {gemCategories.map((gem, i) => (
                <motion.div
                  key={i}
                  style={{ y: float }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + (i * 0.2) }}
                  className={`absolute p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col gap-1 items-center shadow-xl
                    ${i === 0 ? 'top-12 left-12' : ''}
                    ${i === 1 ? 'top-20 right-8' : ''}
                    ${i === 2 ? 'bottom-16 left-16' : ''}
                    ${i === 3 ? 'bottom-24 right-12' : ''}
                  `}
                >
                  <div className={`w-2 h-2 rounded-full ${gem.color} animate-pulse`} />
                  <span className="text-[10px] font-bold text-white uppercase">{gem.label}</span>
                  <span className="text-[8px] text-gray-500">{gem.distance}</span>
                </motion.div>
              ))}

              {/* Radar Scanning Line */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-full border-t-2 border-orange-500/20 rounded-full z-10 origin-center"
              />
            </div>
          </motion.div>

          {/* Background Decorative Map Icon */}
          <div className="absolute -bottom-10 -left-10 opacity-10">
            <Map size={200} className="text-orange-500" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default GullyGemsSection;