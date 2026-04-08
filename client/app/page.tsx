'use client';

import React from 'react';

import HeroSection from './components/HeroSection';

import ManifestoSection from './/components/ManifestoSection';
import Navbar from './components/Navbar';
import IndiaMap from './components/IndiaMap';

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden" style={{ background: '#FAF7F2' }}>
      <Navbar />
      <HeroSection />
      <IndiaMap />
      <ManifestoSection />
  
    </main>
  );
}