'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Main container handles centering and vertical position
    <nav className="fixed top-0 w-full z-[100] flex justify-center transition-all duration-500 pt-4 md:pt-6">
      
      {/* The Floating Pill */}
      <div 
        className={`relative transition-all duration-500 ease-in-out flex items-center justify-between
          ${scrolled 
            ? "w-[90%] md:w-[85%] lg:w-[75%] px-6 py-2 rounded-full bg-[#4D0000]/80 border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl" 
            : "w-[95%] px-8 py-4 rounded-2xl bg-transparent border border-transparent"
          }`}
      >
        
        {/* Logo Section */}
        <div className="shrink-0 flex items-center gap-2 group cursor-pointer">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
            scrolled ? "bg-[#D4AF37]" : "bg-white/10 backdrop-blur-md border border-white/20"
          }`}>
            <span className={`font-bold text-lg ${scrolled ? "text-[#4D0000]" : "text-[#D4AF37]"}`}>B</span>
          </div>
          <span className="text-white text-lg font-serif font-bold tracking-tight ml-1">
            Bharat <span className="text-[#D4AF37] font-light">Origin</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'Artisans', 'States Map', 'Bharat Score'].map((item) => (
            <a 
              key={item}
              href="#" 
              className="text-white/80 hover:text-[#D4AF37] transition-all text-[10px] font-bold tracking-[0.2em] uppercase"
            >
              {item}
            </a>
          ))}
          
          <div className="flex items-center gap-5 ml-4 border-l border-white/10 pl-6">
            <Search className="text-white/60 cursor-pointer w-4 h-4 hover:text-[#D4AF37] transition-colors" />
            <button className={`px-5 py-2 rounded-full font-black text-[9px] tracking-widest transition-all flex items-center gap-2 group shadow-xl ${
              scrolled 
                ? "bg-[#D4AF37] text-[#4D0000] hover:bg-white" 
                : "bg-white text-[#4D0000] hover:bg-[#D4AF37]"
            }`}>
              SHOP NOW
              <ShoppingBag className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-[#D4AF37] p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu (Inside the pill for better UX) */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 mx-2 md:hidden bg-[#3D0000]/95 backdrop-blur-2xl border border-[#D4AF37]/20 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="space-y-4 flex flex-col items-center text-center">
              {['Home', 'Artisans', 'States Map', 'Bharat Score'].map((item) => (
                <a key={item} href="#" className="block text-lg text-white font-serif italic hover:text-[#D4AF37]">{item}</a>
              ))}
              <button className="w-full mt-2 bg-[#D4AF37] text-[#4D0000] py-3 rounded-full font-black tracking-widest text-[10px]">
                SHOP NOW
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;