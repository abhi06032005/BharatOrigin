'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@clerk/nextjs';
import { 
  Store, 
  Factory, 
  Palette, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';

import { Persona, PersonaInfo, PERSONAS } from './onboardingData';

// ─── Component ────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const { userId } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clerkUserId: userId,
          persona,
          ...formData
        })
      });

      if (response.ok) {
        setStep(4);
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (err) {
      alert("Network Error: Could not connect to verification server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation Variants
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  };

  return (
    <div className="relative min-h-screen text-slate-900 pb-20 overflow-hidden flex flex-col items-center">
      
      {/* Background Utilities */}
      <div className="aurora-bg" />
      <div className="indian-pattern-overlay" />
      
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-32 pb-24 z-10 relative flex flex-col items-center justify-center">
        
        {/* Progress Bar (Hidden on success) */}
        {step < 4 && (
          <div className="w-full max-w-2xl mb-12">
             <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
                <span className={step >= 1 ? 'text-orange-500' : ''}>Select Role</span>
                <span className={step >= 2 ? 'text-orange-500' : ''}>Basic Info</span>
                <span className={step >= 3 ? 'text-orange-500' : ''}>Details</span>
             </div>
             <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" as const }}
                  className="h-full bg-gradient-to-r from-orange-400 to-amber-500"
                />
             </div>
          </div>
        )}

        <div className="w-full relative">
          <AnimatePresence mode="wait">
            
            {/* ─── STEP 1: Select Persona ─────────────────────────────── */}
            {step === 1 && (
              <motion.div
                key="step-1"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                    Join the <span className="text-gradient-saffron">Bharat Origin</span> Network
                  </h1>
                  <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                    Tell us how you fit into the ecosystem. We verify every partner to ensure a 100% authentic supply chain.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {PERSONAS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => { setPersona(p.id); setStep(2); }}
                      className="group relative text-left rounded-[32px] glass-warm border border-orange-200/40 p-8 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                    >
                      {/* Hover mesh background inside card */}
                      <div className={`absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-tr ${p.gradient} blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                      
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} text-white flex items-center justify-center mb-6 shadow-lg shadow-${p.gradient.split(' ')[0].replace('from-', '')}/20`}>
                        {p.icon}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">{p.title}</h3>
                      <p className="text-slate-600 font-medium mb-6">{p.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm font-bold text-orange-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        SELECT ROLE <ChevronRight size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ─── STEP 2: Basic Contact Info ─────────────────────────────── */}
            {step === 2 && (
              <motion.div
                key="step-2"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-xl mx-auto"
              >
                <div className="glass-warm rounded-[40px] border border-orange-200/50 p-8 md:p-12 shadow-xl">
                  <button onClick={() => setStep(1)} className="text-slate-400 hover:text-orange-500 flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back
                  </button>
                  
                  <h2 className="text-3xl font-black text-slate-900 mb-2">Basic Details</h2>
                  <p className="text-slate-500 font-medium mb-8">How can our onboarding team reach you?</p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                      <input 
                        type="text" name="name" required
                        value={formData.name || ''} onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm"
                        placeholder="Vijay Kumar"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Phone Number</label>
                        <input 
                          type="tel" name="phone" required
                          value={formData.phone || ''} onChange={handleChange}
                          className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                        <input 
                          type="email" name="email" required
                          value={formData.email || ''} onChange={handleChange}
                          className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm"
                          placeholder="vijay@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">State / Location</label>
                      <input 
                        type="text" name="state" required
                        value={formData.state || ''} onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm"
                        placeholder="Karnataka, India"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if(formData.name && formData.phone && formData.email) setStep(3);
                    }}
                    disabled={!formData.name || !formData.phone || !formData.email}
                    className="w-full mt-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold tracking-wider hover:shadow-xl hover:shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                  >
                    CONTINUE <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 3: Persona Specific Info ─────────────────────────────── */}
            {step === 3 && (
              <motion.div
                key="step-3"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-xl mx-auto"
              >
                <form onSubmit={handleSubmit} className="glass-warm rounded-[40px] border border-orange-200/50 p-8 md:p-12 shadow-xl">
                  <button type="button" onClick={() => setStep(2)} className="text-slate-400 hover:text-orange-500 flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back
                  </button>
                  
                  <h2 className="text-3xl font-black text-slate-900 mb-2 capitalize">{persona} Profile</h2>
                  <p className="text-slate-500 font-medium mb-8">Help us understand your specific operations.</p>

                  <div className="space-y-6">
                    {/* ARTISAN FIELDS */}
                    {persona === 'artisan' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Primary Craft / Specialty</label>
                          <input type="text" name="craft" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm" placeholder="e.g. Madhubani Painting, Kanjivaram Weaving" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Years of Experience</label>
                          <input type="number" name="experience" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm" placeholder="e.g. 15" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Do you hold a GI Tag or Artisan Card?</label>
                          <input type="text" name="giTag" onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm" placeholder="Yes / No" />
                        </div>
                      </>
                    )}

                    {/* SHOP OWNER FIELDS */}
                    {persona === 'shop' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Shop Legal Name</label>
                          <input type="text" name="shopName" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm" placeholder="Enter shop name" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">GST / Registration Number</label>
                          <input type="text" name="gst" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm" placeholder="XX XXXXX XXXXXX XX" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Describe Your Inventory</label>
                          <textarea name="inventory" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm" rows={3} placeholder="Local garments, spices, handicrafts..."></textarea>
                        </div>
                      </>
                    )}

                    {/* MANUFACTURER FIELDS */}
                    {persona === 'manufacturer' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Factory Legal Name</label>
                          <input type="text" name="factoryName" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm" placeholder="Enter factory name" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Primary Sector (e.g., Textiles, Electronics)</label>
                          <input type="text" name="sector" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm" placeholder="Textile Manufacturing" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Monthly Production Capacity</label>
                          <input type="text" name="capacity" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm" placeholder="e.g. 50,000 units" />
                        </div>
                      </>
                    )}

                    {/* BRAND FIELDS */}
                    {persona === 'brand' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Brand Name</label>
                          <input type="text" name="brandName" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm" placeholder="Bharat Naturals" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Brand Tagline / Mission</label>
                          <input type="text" name="tagline" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm" placeholder="Authentic Ayurveda..." />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Year of Inception</label>
                          <input type="number" name="inception" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-orange-200/50 bg-white/60 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all shadow-sm" placeholder="e.g. 2015" />
                        </div>
                      </>
                    )}
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-10 py-5 rounded-2xl bg-slate-900 text-white font-bold tracking-wider hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-xl"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">COMPLETE REGISTRATION <CheckCircle2 size={18} /></span>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* ─── STEP 4: Success Phase ─────────────────────────────── */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-full max-w-lg mx-auto text-center"
              >
                <div className="glass-warm rounded-[40px] border border-orange-200/50 p-12 shadow-2xl flex flex-col items-center">
                  <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white mb-8 shadow-xl shadow-emerald-500/30">
                    <CheckCircle2 size={48} />
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">You're on the list!</h1>
                  <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
                    Thank you for applying, <span className="font-bold text-orange-600">{formData.name}</span>. We've received your {persona} details. Our curation team will review your application and reach out to you within 24-48 hours.
                  </p>
                  
                  <div className="p-4 rounded-2xl bg-orange-100 border border-orange-200/50 w-full mb-8">
                    <p className="text-sm font-bold text-orange-800 tracking-widest uppercase mb-1">Next Steps</p>
                    <p className="text-xs text-orange-600 font-medium">Keep your identity proofs and shop certificates ready for the verification call.</p>
                  </div>

                  <a href="/" className="w-full py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 font-bold tracking-wider hover:bg-slate-50 transition-all flex items-center justify-center shadow-sm">
                    RETURN HOME
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
