'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';

import { NavItems } from './NavbarData';

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`pointer-events-auto relative transition-all duration-500 flex items-center justify-between
          ${scrolled
            ? "w-full max-w-4xl px-5 py-3 rounded-full glass-warm shadow-lg border border-orange-200/40"
            : "w-full max-w-6xl px-8 py-4 rounded-3xl bg-white/30 backdrop-blur-md border border-orange-100/30"
          }`}
      >

        {/* Logo Section */}
        <div className="shrink-0 flex items-center gap-2.5 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-md shadow-orange-500/20">
            <span className="font-black text-sm text-white">B</span>
          </div>
          <span className="text-slate-800 text-lg font-black tracking-tight">
            Bharat<span className="font-light text-amber-700">Origin</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {NavItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-slate-500 hover:text-amber-700 transition-colors text-[11px] font-bold tracking-widest uppercase"
            >
              {item.name}
            </a>
          ))}

          <div className="flex items-center gap-4 ml-6 pl-6 border-l border-orange-200/40">
            <button className="text-slate-400 hover:text-orange-500 transition-colors">
              <Search className="w-4 h-4" />
            </button>
            {!isSignedIn ? (
              <SignInButton>
                <div role="button" className="px-5 py-2.5 rounded-full font-bold text-[11px] tracking-wider transition-all flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                  PARTNER LOGIN
                </div>
              </SignInButton>
            ) : (
              <UserButton />
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-800 p-2 hover:bg-orange-100/50 rounded-full transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-4 mx-2 md:hidden glass-warm rounded-3xl p-6 shadow-2xl border border-orange-200/40"
            >
              <div className="space-y-4 flex flex-col items-center text-center">
                {NavItems.map((item) => (
                  <a key={item.name} href={item.href} className="block text-base font-medium text-slate-600 hover:text-orange-500">
                    {item.name}
                  </a>
                ))}

                {!isSignedIn ? (
                  <SignInButton>
                    <div role="button" className="w-full mt-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white py-3.5 rounded-xl font-bold tracking-wider text-[11px] shadow-lg cursor-pointer flex justify-center">
                      PARTNER LOGIN
                    </div>
                  </SignInButton>
                ) : (
                  <div className="flex items-center justify-center pt-4 w-full border-t border-orange-200/40">
                    <UserButton />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default Navbar;