'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItems, type NavItem } from './NavbarData';

const PRIMARY_NAV = NavItems.slice(0, 5);
const SECONDARY_NAV = NavItems.slice(5);

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 w-full z-50 pointer-events-none">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`pointer-events-auto w-full transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-white/80 border-b border-orange-100/60 shadow-[0_4px_30px_rgba(0,0,0,0.06)]'
            : 'backdrop-blur-md bg-white/40 border-b border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
          <Link href="/" className="shrink-0 flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-md shadow-orange-500/25 group-hover:shadow-orange-500/40 group-hover:scale-105 transition-all duration-300">
              <span className="font-black text-sm text-white">B</span>
            </div>
            <div className="text-slate-800 font-black text-lg tracking-tight">
              Bharat<span className="font-light text-amber-600">Origin</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {PRIMARY_NAV.map((item: NavItem) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3.5 py-2 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all duration-200 whitespace-nowrap ${
                  isActive(item.href)
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
                }`}
              >
                {isActive(item.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-xl bg-orange-50 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                {item.name}
              </Link>
            ))}

            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all duration-200 whitespace-nowrap ${
                  SECONDARY_NAV.some((i: NavItem) => isActive(i.href))
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
                }`}
              >
                More
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    moreOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-1.5 overflow-hidden"
                  >
                    {SECONDARY_NAV.map((item: NavItem) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all ${
                          isActive(item.href)
                            ? 'text-orange-600 bg-orange-50'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              id="navbar-search-btn"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200"
            >
              <Search className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-slate-200 rounded-full" />
            {!isSignedIn ? (
              <SignInButton>
                <div
                  id="navbar-login-btn"
                  role="button"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[11px] tracking-wider bg-slate-900 text-white hover:bg-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 cursor-pointer whitespace-nowrap"
                >
                  USER LOGIN
                </div>
              </SignInButton>
            ) : (
              <UserButton />
            )}
          </div>

          <button
            id="navbar-mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="pointer-events-auto overflow-hidden lg:hidden border-b border-orange-100/60 bg-white/95 backdrop-blur-xl shadow-lg"
          >
            <div className="max-w-[1400px] mx-auto px-6 py-5 space-y-1">
              {NavItems.map((item: NavItem) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold tracking-wider uppercase transition-all ${
                    isActive(item.href)
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100 mt-2">
                {!isSignedIn ? (
                  <SignInButton>
                    <div
                      role="button"
                      className="w-full flex justify-center bg-slate-900 text-white py-3.5 rounded-xl font-bold tracking-wider text-[11px] hover:bg-orange-500 transition-all duration-300 cursor-pointer"
                    >
                      USER LOGIN
                    </div>
                  </SignInButton>
                ) : (
                  <div className="flex items-center justify-center py-2">
                    <UserButton />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;