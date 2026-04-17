'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';

import { statesData } from './IndiaMapData';

export default function StateDiscoveryGrid() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = statesData.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) || state.craft.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="relative min-h-screen py-24 px-6 overflow-hidden">
      
      {/* ── Spotlight Amber/Cyan Glows ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-emerald-500/30 text-emerald-600 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm"
          >
            <MapPin size={14} /> The Heritage Map
          </motion.div>
          
          <h3 className="text-slate-900 font-black text-5xl md:text-7xl mb-12 tracking-tight">
            Regional <span className="text-gradient-emerald">Excellence.</span>
          </h3>

          {/* Search Bar */}
          <div className="relative w-full max-w-xl group">
            <div className="relative flex items-center glass rounded-2xl px-6 py-4 shadow-sm border border-white/60 focus-within:shadow-lg focus-within:border-emerald-500/50 transition-all">
              <Search className="text-emerald-500 mr-4" size={20} />
              <input 
                type="text"
                placeholder="Search by state or craft..."
                className="bg-transparent border-none outline-none text-slate-900 w-full placeholder:text-slate-400 font-medium tracking-wide text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Ambient glow behind search */}
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity -z-10 rounded-2xl" />
          </div>
        </div>

        {/* REFINED GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStates.map((state) => (
               <motion.div
                 layout
                 key={state.id}
                 initial={{ opacity: 0, y: 30, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 whileHover={{ y: -8 }}
                 transition={{ duration: 0.5, ease: "easeOut" }}
                 className="group relative"
               >
                 <a href={state.link} className="block relative aspect-[4/5] glass overflow-hidden rounded-3xl shadow-lg border border-white/60 group-hover:shadow-xl group-hover:shadow-emerald-500/10 transition-all cursor-pointer">
                   
                   {/* Background Image with animated zoom */}
                   <div className="absolute inset-0.5 rounded-[22px] overflow-hidden">
                     <img 
                       src={state.image} 
                       alt={state.name} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                   </div>

                   {/* Overlay Content */}
                   <div className="absolute inset-0 p-6 flex flex-col justify-end">
                     
                     {/* Score Badge */}
                     <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/50 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm">
                       <ShieldCheck size={14} className="text-emerald-400" />
                       {state.score} Score
                     </div>

                     <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                       <h4 className="text-white font-black text-2xl tracking-tight drop-shadow-md">
                         {state.name}
                       </h4>
                       
                       <p className="text-emerald-300 text-xs font-bold tracking-wider mt-2 mb-4 uppercase drop-shadow-sm line-clamp-1">
                         {state.craft}
                       </p>

                       {/* Reveal on hover button row */}
                       <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 pt-4 border-t border-white/20">
                         <span className="text-white text-sm font-bold flex-1">Explore Heritage</span>
                         <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                           <ArrowUpRight className="text-white w-4 h-4" />
                         </div>
                       </div>
                     </div>
                     
                   </div>
                 </a>
               </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredStates.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 font-medium text-lg">No states or crafts found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}