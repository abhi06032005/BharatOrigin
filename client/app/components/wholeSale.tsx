'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Factory, Truck, PackageCheck, BarChart4, ArrowRight, Zap, Boxes } from 'lucide-react';
import { b2bHighlights, wholesaleOrders } from './wholeSaleData';

const B2BWholesaleSection = () => {
  const { scrollYProgress } = useScroll();
  const xMove = useTransform(scrollYProgress, [0.6, 1], [-60, 0]);



  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
      
      {/* ── Ambient Glows ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* ── Left Side: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-indigo-500/30 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
            <Boxes size={14} /> B2B Wholesale Engine
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Scale the <br />
            <span className="text-gradient-indigo">Supply Chain.</span>
          </h2>
          
          <p className="mt-8 text-lg text-slate-600 font-medium leading-relaxed max-w-lg">
            Empowering Indian manufacturers to reach retailers nationwide. 
            <span className="text-slate-900 font-bold block mt-2"> Strengthen our economy by sourcing bulk, made-in-India inventory.</span>
          </p>

          <div className="mt-12 space-y-6">
            {b2bHighlights.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="flex items-start gap-5 p-4 rounded-3xl glass hover:bg-white/60 transition-all duration-300 border border-white/50 group cursor-default"
              >
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white flex items-center justify-center text-indigo-500 shadow-sm border border-indigo-100 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 transform">
                  {item.icon}
                </div>
                <div className="pt-1">
                  <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                  <p className="text-slate-500 font-medium text-sm mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold tracking-wider hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 flex items-center gap-3 group">
            ACCESS B2B PORTAL <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* ── Right Side: Mock Glass B2B Interface ── */}
        <motion.div style={{ x: xMove }} className="relative z-10 w-full max-w-lg mx-auto lg:ml-auto">
          
          <div className="p-8 rounded-[40px] glass border-white/60 shadow-2xl relative overflow-hidden backdrop-blur-3xl bg-white/70">
            {/* Header of Mock App */}
            <div className="flex justify-between items-center mb-8 border-b border-indigo-100/50 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                  <BarChart4 size={24} />
                </div>
                <span className="text-slate-900 font-black text-xl tracking-tight">Wholesale Hub</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold font-mono border border-emerald-200">LIVE SYNC</span>
            </div>

            {/* Bulk Order Ticker Animation */}
            <div className="space-y-4">
               {wholesaleOrders.map((order, i) => (
                 <motion.div 
                   key={i}
                   animate={{ opacity: [0.6, 1, 0.6], y: [0, -2, 0] }}
                   transition={{ duration: 4, repeat: Infinity, delay: i * 0.7 }}
                   className="p-5 rounded-2xl bg-white/50 border border-white/80 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                 >
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-400">
                       <PackageCheck size={18} />
                     </div>
                     <div>
                       <div className="font-bold text-slate-900 text-sm">{order.item}</div>
                       <div className="text-slate-400 text-xs font-medium">{order.time}</div>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-indigo-600 font-black font-mono text-sm">QTY: {order.qty}</p>
                     <p className="text-[10px] font-bold text-emerald-500 tracking-wider mt-0.5">{order.status}</p>
                   </div>
                 </motion.div>
               ))}
            </div>

            {/* Decorative Grid Lines within card */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M39 39H1V1h38v38zM0 0v40h40V0H0z' fill='%234F46E5' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} 
            />
          </div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-[80px] opacity-20 -z-10"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default B2BWholesaleSection;