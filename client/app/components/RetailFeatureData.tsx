import React from 'react';
import { Sparkles, Brain, MessageSquare, ShieldCheck, Zap, SlidersHorizontal } from 'lucide-react';

export const aiFeatures = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Understands Natural Language',
    desc: 'Just say "Show me kurtas under ₹2000 for women" — no filters needed.',
    color: 'orange',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Bharat Score™ Verified',
    desc: 'Every recommendation is ranked by how Indian-owned and Indian-made it truly is.',
    color: 'emerald',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Instant Smart Matching',
    desc: 'Scans 500+ verified Indian brands and finds your best match in milliseconds.',
    color: 'amber',
  },
];

export const demoMessages = [
  {
    role: 'user' as const,
    text: 'Looking for organic skincare under ₹1000',
  },
  {
    role: 'ai' as const,
    text: 'Found 3 products from Mamaearth & Biotique — both high Bharat Score! Avg BS: 84/100 🇮🇳',
    chips: ['Show premium picks', 'Under ₹500 only'],
  },
];
