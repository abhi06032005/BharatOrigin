'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "BharatOrigin changed how I shop. I discovered a Kutch embroidery cooperative that now gets 40% of my textile budget.",
    name: "Priya Nambiar",
    role: "Sustainable Lifestyle Blogger",
    location: "Bangalore",
    score: "Avg Bharat Score: 96",
    color: '#FF6B00',
  },
  {
    quote: "As a procurement manager, I use the Bharat Score to ensure our gifting partners are genuinely Indian-owned businesses.",
    name: "Arjun Mehta",
    role: "Corporate Procurement Manager",
    location: "Mumbai",
    score: "Verified 120+ vendors",
    color: '#00C97A',
  },
  {
    quote: "My Dhokra craft collective is now discoverable by buyers across India. BharatOrigin gave us a digital presence we never had.",
    name: "Sukanti Pradhan",
    role: "Dhokra Metal Craft Artisan",
    location: "Bastar, Chhattisgarh",
    score: "Bharat Score: 100",
    color: '#FF6B00',
  },
];

const stats = [
  { value: '2.4M+', label: 'Products Verified', sub: 'Across 28 states' },
  { value: '18K+', label: 'Indian Brands', sub: 'Scored & certified' },
  { value: '98.2', label: 'Avg Bharat Score', sub: 'For top 1000 brands' },
  { value: '4.2L+', label: 'Artisans Supported', sub: 'Direct income impact' },
];

export default function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      ref={ref}
      className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ borderTop: '1px solid rgba(180,140,80,0.12)', background: '#F5F0E8' }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-150 h-100"
          style={{ background: 'radial-gradient(ellipse, rgba(26,122,74,0.05) 0%, transparent 70%)' }} />
        <div className="absolute top-0 right-0 w-150 h-100"
          style={{ background: 'radial-gradient(ellipse, rgba(212,96,10,0.05) 0%, transparent 70%)' }} />
      </div>
      <div className="max-w-6xl mx-auto">

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats?.map((stat, i) => (
            <motion.div
              key={stat?.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-5 text-center"
              style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(180,140,80,0.15)', boxShadow: '0 2px 12px rgba(28,20,16,0.05)' }}
            >
              <div className="font-display font-black text-2xl md:text-3xl mb-1" style={{ color: i % 2 === 0 ? '#D4600A' : '#1A7A4A' }}>
                {stat?.value}
              </div>
              <div className="font-body text-sm font-semibold mb-0.5" style={{ color: '#1C1410' }}>{stat?.label}</div>
              <div className="font-mono text-xs" style={{ color: 'rgba(28,20,16,0.35)' }}>{stat?.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Manifesto headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2
            className="font-display font-black mb-6 tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#1C1410' }}
          >
            Buy Indian.{' '}
            <span style={{ color: '#D4600A' }}>Verified</span>
            {' '}Indian.
          </h2>
          <p className="font-body text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(28,20,16,0.5)' }}>
            Every rupee spent on a genuinely Indian product stays in India — employing artisans, funding cooperatives, preserving heritage crafts. BharatOrigin makes that choice effortless.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials?.map((t, i) => (
            <motion.div
              key={t?.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.85)', border: `1px solid ${t?.color}20`, minHeight: '220px', boxShadow: '0 4px 16px rgba(28,20,16,0.06)' }}
            >
              <div className="absolute top-4 right-5">
                <Quote className="w-8 h-8 opacity-[0.08]" style={{ color: t?.color }} />
              </div>

              <p className="font-body text-sm leading-relaxed mb-5" style={{ color: 'rgba(28,20,16,0.6)' }}>
                "{t?.quote}"
              </p>

              <div>
                <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, ${t?.color}30, transparent)` }} />
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-display font-semibold text-sm" style={{ color: '#1C1410' }}>{t?.name}</div>
                    <div className="font-body text-xs mt-0.5" style={{ color: 'rgba(28,20,16,0.4)' }}>{t?.role}</div>
                    <div className="font-mono text-xs mt-0.5" style={{ color: 'rgba(28,20,16,0.3)' }}>{t?.location}</div>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-full font-mono text-xs shrink-0"
                    style={{ background: `${t?.color}10`, border: `1px solid ${t?.color}25`, color: t?.color }}
                  >
                    {t?.score}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(212,96,10,0.25)' }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-display font-bold text-sm tracking-wide"
            style={{ background: '#D4600A', color: '#FAF7F2', boxShadow: '0 4px 16px rgba(212,96,10,0.2)' }}
          >
            Start Discovering
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-8 py-4 rounded-full font-display font-semibold text-sm tracking-wide transition-all duration-200"
            style={{ border: '1.5px solid rgba(180,140,80,0.3)', color: 'rgba(28,20,16,0.7)', background: 'rgba(255,255,255,0.7)' }}
          >
            Get Certified for Your Brand
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}