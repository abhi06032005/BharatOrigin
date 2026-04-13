import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Fingerprint, History, PieChart, ExternalLink } from 'lucide-react';

const BrandStorySection = () => {
  const { scrollYProgress } = useScroll();
  // Parallax for the "Founder Card" overlay
  const cardFloat = useTransform(scrollYProgress, [0.4, 0.8], [50, -50]);

  const storyPoints = [
    { label: "Brand Origin", icon: <Fingerprint className="w-5 h-5" /> },
    { label: "Founder Details", icon: <Users className="w-5 h-5" /> },
    { label: "Journey & Mission", icon: <History className="w-5 h-5" /> }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden bg-[#070707]">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Visual Storytelling Card */}
        <div className="relative order-2 lg:order-1">
          {/* Main Background Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                <PieChart size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold">Ownership Transparency</h4>
                <p className="text-gray-500 text-sm">Verified Equity Data</p>
              </div>
            </div>

            {/* Ownership Bar */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-amber-400 font-bold text-3xl">100%</span>
                <span className="text-gray-400 text-sm pb-1">Indian Owned</span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-amber-600 to-orange-400"
                />
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4">
               {storyPoints.map((item, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                   <div className="text-amber-500/80">{item.icon}</div>
                   <span className="text-gray-300 font-medium">{item.label}</span>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Floating Founder Card */}
          <motion.div
            style={{ y: cardFloat }}
            className="absolute -bottom-10 -right-6 lg:-right-12 p-6 rounded-2xl bg-[#151515] border border-amber-500/30 shadow-2xl max-w-[240px]"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 mb-4 p-1">
                <div className="w-full h-full rounded-full bg-[#151515] flex items-center justify-center">
                  <Users className="text-amber-500" size={32} />
                </div>
              </div>
              <h5 className="text-white font-bold italic">The Founder's Tale</h5>
              <p className="text-xs text-gray-500 mt-2">Every brand has a heartbeat. We bring the faces behind the labels to the forefront.</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <span className="px-5 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-black tracking-[0.2em] uppercase">
            Founder Stories
          </span>
          
          <h2 className="mt-8 text-5xl md:text-6xl font-bold text-white leading-tight">
            Know the <span className="text-amber-500 italic">People</span> <br />
            Behind the Product.
          </h2>
          
          <p className="mt-8 text-lg text-gray-400 leading-relaxed max-w-lg">
            We don't just show you products; we show you the mission. Discover the entrepreneurs, 
            the percent of Indian equity, and the grit that built your favorite brands.
          </p>

          <div className="mt-10 p-6 rounded-3xl bg-white/5 border-l-4 border-amber-500">
            <p className="text-white font-medium italic leading-relaxed">
              "Humanizes Indian brands and builds a lasting emotional connection through radical transparency."
            </p>
          </div>

          <div className="mt-12 flex gap-6">
            <button className="flex items-center gap-2 text-white font-bold hover:text-amber-500 transition-colors group">
              Explore Brand Journeys <ExternalLink size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BrandStorySection;