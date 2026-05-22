'use client';

import React from 'react';

import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import ArtisanFeatureSection from './components/Artisian';
import BrandStorySection from './components/Brand';
import GullyGemsSection from './components/gullyGems';
import RetailFeatureSection from './components/RetailFeature';
import AIScanSection from './components/scan';
import B2BWholesaleSection from './components/wholeSale';

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden w-full min-h-screen">
      {/* Global Animated Aurora Background */}
      <div className="aurora-bg" />

      {/* Indian Mandala Pattern Overlay */}
      <div className="indian-pattern-overlay" />

      {/* Warm Rangoli corner decorations */}
      <div className="rangoli-corner rangoli-corner--tl" />
      <div className="rangoli-corner rangoli-corner--br" />

      <Navbar />
      <HeroSection />

      <div className="section-divider" />
      <ArtisanFeatureSection />

      <div className="section-divider" />
      <BrandStorySection />

      <div className="section-divider" />
      <GullyGemsSection />

      <div className="section-divider" />
      <RetailFeatureSection />

      <div className="section-divider" />
      <AIScanSection />

      <div className="section-divider" />
      <B2BWholesaleSection />

    </main>
  );
}