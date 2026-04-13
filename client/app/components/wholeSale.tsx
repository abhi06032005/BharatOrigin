import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Factory, Truck, PackageCheck, BarChart4, ArrowRight, Zap } from 'lucide-react';

const B2BWholesaleSection = () => {
  const { scrollYProgress } = useScroll();
  const xMove = useTransform(scrollYProgress, [0.6, 1], [-100, 0]);

  const b2bHighlights = [
    { title: "Bulk Manufacturing", desc: "Direct-from-factory Indian sourcing", icon: <Factory /> },
    { title: "Inventory Sourcing", desc: "Reliable made-in-India stock for retailers", icon: <PackageCheck /> },
    { title: "Supply Chain Power", desc: "Reducing imports, strengthening local ties", icon: <Truck /> }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden bg-[#050505]">
      {/* Background Grid Pattern for Industrial Feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3Map%3Cpath d='M54 48c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zM6 4c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} 
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 text-xs font-bold tracking-widest uppercase mb-8">
            <Zap size={14} className="text-yellow-500 fill-yellow-500" /> Hackathon Demo Ready
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Scale the <br />
            <span className="text-blue-500">Supply Chain.</span>
          </h2>
          
          <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-lg">
            Empowering Indian manufacturers to reach retailers nationwide. 
            <span className="text-white"> Strengthen our economy by sourcing bulk, made-in-India inventory.</span>
          </p>

          <div className="mt-12 space-y-8">
            {b2bHighlights.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="flex items-start gap-5"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                  <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Mock B2B Interface */}
        <motion.div 
          style={{ x: xMove }}
          className="relative"
        >
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/5 backdrop-blur-3xl shadow-2xl">
            {/* Header of Mock App */}
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart4 className="text-white" size={20} />
                </div>
                <span className="text-white font-bold tracking-tight">Wholesale Hub</span>
              </div>
              <span className="text-xs text-green-400 font-mono">LIVE_DEMO_PRELOADED</span>
            </div>

            {/* Bulk Order Ticker Animation */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="p-4 rounded-xl bg-white/5 flex items-center justify-between border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-700 animate-pulse" />
                    <div>
                      <div className="w-24 h-2 bg-slate-700 rounded mb-2" />
                      <div className="w-16 h-1.5 bg-slate-800 rounded" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-400 font-mono text-sm">QTY: 500+</p>
                    <p className="text-[10px] text-gray-600 uppercase">Processing</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Button */}
            <button className="w-full mt-8 py-4 bg-white text-black font-black rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
              Source Inventory <ArrowRight size={20} />
            </button>
          </div>

          {/* Floating 'Impact' Tag */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-6 -right-6 px-6 py-3 bg-green-500 rounded-full shadow-xl shadow-green-900/40"
          >
            <p className="text-[10px] font-black text-black uppercase tracking-tighter">Supply Chain Impact</p>
            <p className="text-sm font-bold text-black leading-none">-40% Imports</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default B2BWholesaleSection;