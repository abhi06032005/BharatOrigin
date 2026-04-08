'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ArrowUpRight, Star, ShieldCheck } from 'lucide-react';

const statesData = [
  { id: 1, name: 'Andhra Pradesh', craft: 'Kalamkari & Kondapalli Toys', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 90 },
  { id: 2, name: 'Arunachal Pradesh', craft: 'Applique Work & Handwoven Textiles', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 85 },
  { id: 3, name: 'Assam', craft: 'Muga Silk & Cane Crafts', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 88 },
  { id: 4, name: 'Bihar', craft: 'Madhubani Painting & Manjusha Art', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 87 },
  { id: 5, name: 'Chhattisgarh', craft: 'Bell Metal & Tribal Crafts', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 84 },
  { id: 6, name: 'Goa', craft: 'Azulejos Tiles & Pottery', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 86 },
  { id: 7, name: 'Gujarat', craft: 'Patola Silk & Lippan Art', image: 'https://images.unsplash.com/photo-1599932025732-f2560374e2d4', score: 96 },
  { id: 8, name: 'Haryana', craft: 'Phulkari & Pottery', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 82 },
  { id: 9, name: 'Himachal Pradesh', craft: 'Kullu Shawls & Chamba Rumal', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 88 },
  { id: 10, name: 'Jharkhand', craft: 'Dokra Art & Bamboo Crafts', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 83 },
  { id: 11, name: 'Karnataka', craft: 'Channapatna Toys & Sandalwood', image: 'https://images.unsplash.com/photo-1582234373443-41c38f45a720', score: 92 },
  { id: 12, name: 'Kerala', craft: 'Kasavu Sarees & Coir Art', image: 'https://images.unsplash.com/photo-1593439343833-21c61833075c', score: 94 },
  { id: 13, name: 'Madhya Pradesh', craft: 'Chanderi & Maheshwari Sarees', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 90 },
  { id: 14, name: 'Maharashtra', craft: 'Paithani Sarees & Warli Painting', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 93 },
  { id: 15, name: 'Manipur', craft: 'Handloom & Bamboo Crafts', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 87 },
  { id: 16, name: 'Meghalaya', craft: 'Basketry & Weaving', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 85 },
  { id: 17, name: 'Mizoram', craft: 'Handloom Textiles & Bamboo Crafts', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 84 },
  { id: 18, name: 'Nagaland', craft: 'Naga Shawls & Wood Carving', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 86 },
  { id: 19, name: 'Odisha', craft: 'Pattachitra & Silver Filigree', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 91 },
  { id: 20, name: 'Punjab', craft: 'Phulkari & Blue Pottery', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 89 },
  { id: 21, name: 'Rajasthan', craft: 'Blue Pottery & Block Prints', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 98 },
  { id: 22, name: 'Sikkim', craft: 'Thangka Painting & Handicrafts', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 83 },
  { id: 23, name: 'Tamil Nadu', craft: 'Kanchipuram Silk & Tanjore Painting', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 92 },
  { id: 24, name: 'Telangana', craft: 'Pochampally Ikat & Bidriware', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 90 },
  { id: 25, name: 'Tripura', craft: 'Bamboo & Cane Crafts', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 82 },
  { id: 26, name: 'Uttar Pradesh', craft: 'Banarasi Silk & Chikankari', image: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38', score: 95 },
  { id: 27, name: 'Uttarakhand', craft: 'Woolen Shawls & Wood Carving', image: 'https://images.unsplash.com/photo-1590001158193-79cd76306f94', score: 88 },
  { id: 28, name: 'West Bengal', craft: 'Terracotta & Jamdani', image: 'https://images.unsplash.com/photo-1621360341396-4886616ca88a', score: 89 }
];

export default function StateDiscoveryGrid() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = statesData.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // THEME CHANGE: bg-[#1A1A1A] (Charcoal)
    <section className="relative min-h-screen bg-[#1A1A1A] py-24 px-6 overflow-hidden">
      
      {/* Subtle Gradient Glow (Champagne Gold) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(197,160,89,0.08),transparent_60%)] pointer-events-none" />
      
      {/* Overlay Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen" 
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-10 bg-[#C5A059]/40" />
            <span className="text-[#C5A059] font-sans tracking-[0.5em] text-[9px] uppercase font-black">Heritage Archives</span>
            <div className="h-px w-10 bg-[#C5A059]/40" />
          </motion.div>
          
          <h3 className="text-white font-serif font-light text-5xl md:text-6xl mb-12 text-center tracking-tight">
            The <span className="text-[#C5A059] italic font-medium">Provenance</span> List
          </h3>

          {/* SEARCH BAR: Dark Minimalist Style */}
          <div className="relative w-full max-w-lg">
            <div className="flex items-center bg-[#242424] border border-white/5 focus-within:border-[#C5A059]/50 px-6 py-4 transition-all duration-300">
              <Search className="text-[#C5A059]/40 mr-4" size={18} />
              <input 
                type="text"
                placeholder="Find a region..."
                className="bg-transparent border-none outline-none text-white w-full placeholder:text-stone-600 font-light tracking-widest text-xs uppercase"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredStates.map((state) => (
              <motion.div
                layout
                key={state.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* MODERN GALLERY CARD */}
                <div className="relative aspect-[3/4] bg-[#242424] overflow-hidden border border-white/5 group-hover:border-[#C5A059]/30 transition-colors duration-500">
                  
                  <img 
                    src={state.image} 
                    alt={state.name} 
                    className="w-full h-full object-cover grayscale-[100%] group-hover:grayscale-0 transition-all duration-1000 scale-[1.02] group-hover:scale-110 opacity-40 group-hover:opacity-80"
                  />
                  
                  {/* Subtle Dark Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />

                  {/* SCORE BADGE: Bottom Right Minimalist */}
                  <div className="absolute top-0 right-0 p-6 z-30">
                    <span className="text-[10px] text-white/40 font-mono group-hover:text-[#C5A059] transition-colors tracking-tighter">
                      RANK #{state.score}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="absolute bottom-0 inset-x-0 p-8 z-30">
                    <h4 className="text-white font-serif text-3xl mb-1 tracking-tighter group-hover:text-[#C5A059] transition-colors">
                      {state.name}
                    </h4>
                    
                    <p className="text-stone-500 text-[11px] font-medium tracking-wide mb-6 uppercase">
                      {state.craft}
                    </p>

                    <div className="h-px w-0 group-hover:w-full bg-[#C5A059]/50 transition-all duration-700 mb-6" />

                    <button className="flex items-center gap-3 text-white text-[9px] font-black tracking-[0.4em] uppercase group-hover:gap-5 transition-all">
                      EXPLORE <ArrowUpRight size={14} className="text-[#C5A059]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}