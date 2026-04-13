import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Star, ShoppingBag, Users, Award, ChevronRight } from 'lucide-react';

// 1. Define the shape of each state's data
interface StateInfo {
  accent: string;
  border: string;
  items: string[];
}

// 2. Define the valid state names as a type
type StateName = 'Karnataka' | 'Rajasthan' | 'Kerala';

const StatePrideSection: React.FC = () => {
  // 3. Properly initialize state with the union type
  const [selectedState, setSelectedState] = useState<StateName>('Karnataka');

  // 4. Type the data object using a Record
  const stateData: Record<StateName, StateInfo> = {
    Karnataka: { 
      accent: 'text-yellow-500', 
      border: 'border-yellow-500/50', 
      items: ['Channapatna Toys', 'Mysore Silk', 'Dharwad Pedha'] 
    },
    Rajasthan: { 
      accent: 'text-orange-500', 
      border: 'border-orange-500/50', 
      items: ['Blue Pottery', 'Bandhani Textiles', 'Makrana Marble'] 
    },
    Kerala: { 
      accent: 'text-green-500', 
      border: 'border-green-500/50', 
      items: ['Aranmula Kannadi', 'Kasavu Sarees', 'Coir Products'] 
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <Map size={800} strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white text-xs font-black tracking-widest uppercase mb-8">
            <Star size={14} className="text-yellow-500 fill-yellow-500" /> State Pride Mode
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Made In <br />
            {/* selectedState is now strictly typed to index stateData safely */}
            <span className={`${stateData[selectedState].accent} transition-colors duration-500`}>
              My {selectedState}.
            </span>
          </h2>
          
          <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-lg">
            Celebrate the craftsmanship of your roots. We filter the entire ecosystem to bring 
            you the <span className="text-white">best brands, artisans, and GI-tagged specialties</span> from your home state.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {/* Cast Object.keys to our StateName type for the map */}
            {(Object.keys(stateData) as StateName[]).map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`px-6 py-3 rounded-xl font-bold transition-all border ${
                  selectedState === state 
                  ? `bg-white text-black border-white` 
                  : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedState}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-3xl border-2 ${stateData[selectedState].border} shadow-2xl shadow-black`}
            >
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-2xl font-bold text-white uppercase tracking-tighter">State Specialties</h4>
                <Award className={stateData[selectedState].accent} />
              </div>

              <div className="space-y-4">
                {stateData[selectedState].items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <ShoppingBag size={18} className="text-gray-400" />
                      </div>
                      <span className="text-white font-medium">{item}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 border border-white/20" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-black">Featured Local Artisan</p>
                    <p className="text-white font-bold">1,200+ {selectedState} Creators</p>
                  </div>
                  <Users className={`ml-auto ${stateData[selectedState].accent}`} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-3xl opacity-20 bg-current ${stateData[selectedState].accent}`} />
        </div>
      </div>
    </section>
  );
};

export default StatePrideSection;