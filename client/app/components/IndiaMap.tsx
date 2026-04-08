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
    <section className="relative min-h-screen bg-[#4D0000] py-24 px-6 overflow-hidden">
      
      {/* 1. Subtle Radial Glow for Depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(212,175,55,0.15),transparent_70%)] pointer-events-none" />
      
      {/* 2. Seamless Pattern Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/pichari.png')` }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] font-sans tracking-[0.4em] text-[10px] uppercase font-bold">The Heritage Map</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </motion.div>
          
          <h3 className="text-white font-serif font-light text-5xl md:text-7xl mb-12 text-center">
            Regional <span className="text-[#D4AF37] italic">Excellence</span>
          </h3>

          {/* REFINED SEARCH BAR */}
          <div className="relative w-full max-w-xl group">
            <div className="absolute -inset-0.5 bg-[#D4AF37] rounded-none opacity-20 blur-sm group-hover:opacity-40 transition duration-500" />
            <div className="relative flex items-center bg-[#4D0000] border border-[#D4AF37]/40 px-8 py-5">
              <Search className="text-[#D4AF37]/60 mr-4" size={20} />
              <input 
                type="text"
                placeholder="Search by state or craft..."
                className="bg-transparent border-none outline-none text-white w-full placeholder:text-stone-500 font-light tracking-wide text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* REFINED GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredStates.map((state) => (
              <motion.div
                layout
                key={state.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -12 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                {/* THE "GALLERY FRAME" CARD */}
                <div className="relative aspect-[4/5] bg-[#3D0000] overflow-hidden border border-[#D4AF37]/20">
                  
                  {/* Subtle Inner Border Overlay */}
                  <div className="absolute inset-3 border border-[#D4AF37]/10 z-20 pointer-events-none group-hover:inset-5 transition-all duration-500" />

                  {/* High Quality Image */}
                  <img 
                    src={state.image} 
                    alt={state.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Elegant Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D0000] via-transparent to-transparent opacity-90" />

                  {/* SCORE BADGE */}
                  <div className="absolute top-6 left-6 z-30">
                    <div className="bg-[#4D0000]/80 backdrop-blur-md border border-[#D4AF37]/30 px-3 py-1 flex items-center gap-2">
                       <Star size={10} className="text-[#D4AF37] fill-[#D4AF37]" />
                       <span className="text-white text-[9px] font-black tracking-widest">{state.score} BHARAT SCORE</span>
                    </div>
                  </div>

                  {/* BOTTOM CONTENT */}
                  <div className="absolute bottom-0 inset-x-0 p-8 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <ShieldCheck size={14} className="text-[#D4AF37]" />
                      <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase">Authentic Origin</span>
                    </div>
                    
                    <h4 className="text-white font-serif text-4xl mb-2 tracking-tight group-hover:italic transition-all">
                      {state.name}
                    </h4>
                    
                    <p className="text-stone-400 text-xs font-light tracking-wide mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {state.craft}
                    </p>

                    <button className="w-full py-4 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#D4AF37] hover:text-[#4D0000] transition-all duration-300">
                      View Artisan Directory
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* EMPTY STATE */}
        {filteredStates.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 border border-dashed border-[#D4AF37]/20">
            <p className="text-[#D4AF37] font-serif italic text-xl">The archives find no match for "{searchTerm}"</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}