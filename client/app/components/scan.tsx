import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScanText, Cpu, Search, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

const AIScanSection = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.8, 1], [0.9, 1.1]);

  const detectionStats = [
    { label: "Manufacturing Country", status: "Detecting...", icon: <Cpu className="w-4 h-4" /> },
    { label: "Brand Ownership", status: "Verified", icon: <CheckCircle className="w-4 h-4 text-cyan-400" /> },
    { label: "Indian Alternative", status: "Available", icon: <RefreshCw className="w-4 h-4 text-purple-400" /> }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden bg-[#030303]">
      {/* Tech-Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Mock AI Scanner */}
        <div className="relative order-2 lg:order-1 flex justify-center">
          <motion.div 
            style={{ scale }}
            className="relative w-full max-w-[400px] aspect-[3/4] rounded-[2.5rem] bg-zinc-900/50 border border-white/10 p-6 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.1)]"
          >
            {/* Scanning Laser Line */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
            />

            {/* Simulated OCR Viewfinder */}
            <div className="relative h-full w-full rounded-2xl border-2 border-dashed border-cyan-500/30 bg-black/40 flex flex-col items-center justify-center overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <ScanText size={120} className="text-cyan-500" />
               </div>
               
               {/* Result Popups */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1 }}
                 className="absolute bottom-4 left-4 right-4 space-y-2"
               >
                 {detectionStats.map((stat, i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md">
                     <div className="flex items-center gap-2 text-xs text-gray-300">
                       {stat.icon} <span>{stat.label}</span>
                     </div>
                     <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{stat.status}</span>
                   </div>
                 ))}
               </motion.div>
            </div>
          </motion.div>

          {/* Floating 'Found' Alternative Badge */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="absolute -top-6 -right-10 p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 border border-white/20 shadow-xl z-30 max-w-[180px]"
          >
            <div className="flex gap-2 items-center mb-1 text-[10px] font-bold text-purple-200">
               <AlertCircle size={12} /> NON-INDIAN DETECTED
            </div>
            <p className="text-white text-xs font-bold leading-tight">Switch to: <br/> <span className="underline decoration-cyan-400">BharatArtisan Silk</span></p>
          </motion.div>
        </div>

        {/* Right Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-black tracking-widest uppercase mb-8">
            <Cpu size={14} className="animate-pulse" /> Advanced AI Detection
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1]">
            Scan. Detect. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Transform.
            </span>
          </h2>
          
          <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-lg">
            Instant transparency in your pocket. Our AI identifies product roots and 
            instantly recommends <span className="text-white font-bold">Indian alternatives</span> to keep your capital local.
          </p>

          <div className="mt-12">
            <button className="group relative px-10 py-5 bg-transparent border-2 border-cyan-500 text-cyan-400 font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:text-black">
              <span className="absolute inset-0 w-0 bg-cyan-500 transition-all duration-300 group-hover:w-full -z-10"></span>
              <span className="flex items-center gap-3">
                Try AI Scanner <Search size={20} />
              </span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AIScanSection;