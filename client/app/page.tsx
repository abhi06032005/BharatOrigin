'use client';

import React from 'react';

import HeroSection from './components/HeroSection';

import ManifestoSection from './/components/ManifestoSection';
import Navbar from './components/Navbar';
import IndiaMap from './components/IndiaMap';
import B2CFeatureCard from './components/B2CFeature';
import ArtisanFeatureSection from './components/Artisian';
import BrandStorySection from './components/Brand';
import FestivalModeSection from './components/festival';
import GullyGemsSection from './components/gullyGems';
import RetailFeatureSection from './components/RetailFeature';
import AIScanSection from './components/scan';
import StatePrideSection from './components/statePride';
import B2BWholesaleSection from './components/wholeSale';

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden" style={{ background: '#FAF7F2' }}>
      <Navbar />
      <HeroSection />
      <B2CFeatureCard />
      <ArtisanFeatureSection />
      <BrandStorySection />
      <FestivalModeSection />
      <GullyGemsSection />
      <RetailFeatureSection />
      <AIScanSection />
      <StatePrideSection />
      <B2BWholesaleSection />
      <IndiaMap />
      <ManifestoSection />

  
    </main>
  );
}