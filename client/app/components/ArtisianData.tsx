import React from 'react';
import { Users, Award, Sparkles } from 'lucide-react';

export const features = [
  { 
    title: "Exclusive Portal", 
    desc: "Only 100% verified artisans.", 
    icon: <Users className="text-emerald-500" /> 
  },
  { 
    title: "GI-Tag Certified", 
    desc: "Authentic & protected crafts.", 
    icon: <Award className="text-orange-500" /> 
  },
  { 
    title: "Zero Middlemen", 
    desc: "Direct-to-consumer income.", 
    icon: <Sparkles className="text-indigo-500" /> 
  }
];
