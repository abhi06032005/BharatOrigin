'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight, MapPin, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

const statesData = [
  { id: 1, name: 'Andhra Pradesh', craft: 'Kalamkari & Kondapalli Toys', score: 90, color: 'from-rose-400 to-pink-500', emoji: '🎨' },
  { id: 2, name: 'Arunachal Pradesh', craft: 'Applique Work & Handwoven Textiles', score: 85, color: 'from-violet-400 to-purple-500', emoji: '🧵' },
  { id: 3, name: 'Assam', craft: 'Muga Silk & Cane Crafts', score: 88, color: 'from-amber-400 to-orange-500', emoji: '🌿' },
  { id: 4, name: 'Bihar', craft: 'Madhubani Painting & Manjusha Art', score: 87, color: 'from-yellow-400 to-amber-500', emoji: '🖌️' },
  { id: 5, name: 'Chhattisgarh', craft: 'Bell Metal & Tribal Crafts', score: 84, color: 'from-orange-400 to-red-500', emoji: '🔔' },
  { id: 6, name: 'Goa', craft: 'Azulejos Tiles & Pottery', score: 86, color: 'from-cyan-400 to-teal-500', emoji: '🏺' },
  { id: 7, name: 'Gujarat', craft: 'Patola Silk & Lippan Art', score: 96, color: 'from-orange-500 to-amber-600', emoji: '✨' },
  { id: 8, name: 'Haryana', craft: 'Phulkari & Pottery', score: 82, color: 'from-lime-400 to-green-500', emoji: '🌸' },
  { id: 9, name: 'Himachal Pradesh', craft: 'Kullu Shawls & Chamba Rumal', score: 88, color: 'from-sky-400 to-blue-500', emoji: '🧣' },
  { id: 10, name: 'Jharkhand', craft: 'Dokra Art & Bamboo Crafts', score: 83, color: 'from-emerald-400 to-green-600', emoji: '🎋' },
  { id: 11, name: 'Karnataka', craft: 'Channapatna Toys & Sandalwood', score: 92, color: 'from-amber-500 to-orange-600', emoji: '🧸' },
  { id: 12, name: 'Kerala', craft: 'Kasavu Sarees & Coir Art', score: 94, color: 'from-emerald-500 to-teal-600', emoji: '🌴' },
  { id: 13, name: 'Madhya Pradesh', craft: 'Chanderi & Maheshwari Sarees', score: 90, color: 'from-rose-500 to-pink-600', emoji: '🧶' },
  { id: 14, name: 'Maharashtra', craft: 'Paithani Sarees & Warli Painting', score: 93, color: 'from-orange-500 to-red-600', emoji: '🎭' },
  { id: 15, name: 'Manipur', craft: 'Handloom & Bamboo Crafts', score: 87, color: 'from-fuchsia-400 to-pink-500', emoji: '🎪' },
  { id: 16, name: 'Meghalaya', craft: 'Basketry & Weaving', score: 85, color: 'from-teal-400 to-cyan-500', emoji: '🧺' },
  { id: 17, name: 'Mizoram', craft: 'Handloom Textiles & Bamboo Crafts', score: 84, color: 'from-indigo-400 to-blue-500', emoji: '🪄' },
  { id: 18, name: 'Nagaland', craft: 'Naga Shawls & Wood Carving', score: 86, color: 'from-red-400 to-rose-500', emoji: '🪵' },
  { id: 19, name: 'Odisha', craft: 'Pattachitra & Silver Filigree', score: 91, color: 'from-amber-400 to-yellow-500', emoji: '🪬' },
  { id: 20, name: 'Punjab', craft: 'Phulkari & Blue Pottery', score: 89, color: 'from-sky-400 to-indigo-500', emoji: '💙' },
  { id: 21, name: 'Rajasthan', craft: 'Blue Pottery & Block Prints', score: 98, color: 'from-orange-500 to-amber-600', emoji: '🏰' },
  { id: 22, name: 'Sikkim', craft: 'Thangka Painting & Handicrafts', score: 83, color: 'from-violet-400 to-indigo-500', emoji: '🎑' },
  { id: 23, name: 'Tamil Nadu', craft: 'Kanchipuram Silk & Tanjore Painting', score: 92, color: 'from-red-500 to-orange-600', emoji: '🎨' },
  { id: 24, name: 'Telangana', craft: 'Pochampally Ikat & Bidriware', score: 90, color: 'from-emerald-400 to-teal-500', emoji: '⚱️' },
  { id: 25, name: 'Tripura', craft: 'Bamboo & Cane Crafts', score: 82, color: 'from-lime-400 to-emerald-500', emoji: '🎋' },
  { id: 26, name: 'Uttar Pradesh', craft: 'Banarasi Silk & Chikankari', score: 95, color: 'from-orange-500 to-rose-600', emoji: '🧵' },
  { id: 27, name: 'Uttarakhand', craft: 'Woolen Shawls & Wood Carving', score: 88, color: 'from-sky-400 to-blue-600', emoji: '🏔️' },
  { id: 28, name: 'West Bengal', craft: 'Terracotta & Jamdani', score: 89, color: 'from-rose-400 to-red-500', emoji: '🏺' },
];

export default function StateDiscoveryGrid() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = statesData.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.craft.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Aurora Background */}
      <div className="aurora-bg" />
      <div className="indian-pattern-overlay" />
      <div className="rangoli-corner rangoli-corner--tl" />
      <div className="rangoli-corner rangoli-corner--br" />

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-orange-400/40" />
            <span className="text-orange-600 font-black tracking-[0.4em] text-[10px] uppercase">Heritage Archives</span>
            <div className="h-px w-10 bg-orange-400/40" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
            The <span className="text-gradient-saffron italic">Provenance</span> List
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto mb-10">
            Every Indian state carries a legacy of craft, colour, and culture. Explore them all.
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-lg mx-auto">
            <div className="flex items-center glass-warm border border-orange-200/50 px-6 py-4 rounded-2xl shadow-md focus-within:border-orange-400 focus-within:shadow-orange-500/10 transition-all">
              <Search className="text-orange-400 mr-4 flex-shrink-0" size={18} />
              <input
                type="text"
                placeholder="Find a state or craft..."
                className="bg-transparent border-none outline-none text-slate-800 w-full placeholder:text-slate-400 font-medium text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { val: '28', label: 'States & UTs' },
              { val: '2,400+', label: 'GI Tagged Crafts' },
              { val: '100%', label: 'Origin Verified' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black text-slate-900">{s.val}</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredStates.map((state, i) => (
              <motion.div
                layout
                key={state.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group"
              >
                <Link href={`/state/${state.name.toLowerCase().replace(/ /g, '-')}`}>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-orange-100/60 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/15 hover:border-orange-200 transition-all duration-400 h-full">
                    {/* Gradient Top Strip */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${state.color}`} />

                    {/* Bharat Score Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-[10px] font-black text-slate-500 group-hover:text-orange-600 transition-colors">
                        BS #{state.score}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Emoji + Name */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${state.color} flex items-center justify-center text-xl shadow-md flex-shrink-0`}>
                          {state.emoji}
                        </div>
                        <div>
                          <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-orange-700 transition-colors">
                            {state.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 text-orange-400" />
                            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">India</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-5 line-clamp-2">
                        {state.craft}
                      </p>

                      {/* Verified + Explore Row */}
                      <div className="flex items-center justify-between pt-4 border-t border-orange-100/60">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                          <ShieldCheck className="w-3 h-3" /> GI Verified
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-black text-orange-600 group-hover:gap-2 transition-all">
                          EXPLORE <ArrowUpRight size={12} />
                        </span>
                      </div>

                      {/* Hover bottom line */}
                      <div className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${state.color} transition-all duration-500 mt-3 rounded-full`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredStates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-bold text-slate-700 mb-1">No states found</p>
            <p className="text-sm text-slate-400">Try searching a different name or craft</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}