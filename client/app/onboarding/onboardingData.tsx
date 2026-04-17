import React from 'react';
import { Store, Factory, Palette, Sparkles } from 'lucide-react';

export type Persona = 'artisan' | 'shop' | 'manufacturer' | 'brand';

export interface PersonaInfo {
  id: Persona;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

export const PERSONAS: PersonaInfo[] = [
  {
    id: 'artisan',
    title: 'Artisan / Maker',
    description: 'I create handcrafted goods, textiles, or traditional art.',
    icon: <Palette size={32} />,
    gradient: 'from-emerald-400 to-emerald-600',
  },
  {
    id: 'shop',
    title: 'Retail Shop Owner',
    description: 'I own a physical store selling local or traditional goods.',
    icon: <Store size={32} />,
    gradient: 'from-amber-400 to-amber-600',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
    description: 'I manage a factory producing goods at scale in India.',
    icon: <Factory size={32} />,
    gradient: 'from-indigo-400 to-indigo-600',
  },
  {
    id: 'brand',
    title: 'Heritage Brand',
    description: 'I represent a brand focused on Indian heritage and culture.',
    icon: <Sparkles size={32} />,
    gradient: 'from-rose-400 to-rose-600',
  }
];
