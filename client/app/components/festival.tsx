import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Sparkles, ShoppingBag, BookOpen, PartyPopper } from 'lucide-react';

// 1. Define the shape of the data for each festival
interface FestivalData {
  color: string;
  bg: string;
  text: string;
}

// 2. Define the allowed festival names
type FestivalType = 'Diwali' | 'Holi' | 'Onam';

const FestivalModeSection: React.FC = () => {
  // 3. Initialize state with the strict FestivalType
  const [activeFestival, setActiveFestival] = useState<FestivalType>('Diwali');

  // 4. Properly type the festivals object
  const festivals: Record<FestivalType, FestivalData> = {
    Diwali: { 
      color: 'from-orange-500 to-yellow-500', 
      bg: 'rgba(234, 88, 12, 0.1)', 
      text: 'The Festival of Lights' 
    },
    Holi: { 
      color: 'from-pink-500 to-purple-500', 
      bg: 'rgba(219, 39, 119, 0.1)', 
      text: 'The Festival of Colors' 
    },
    Onam: { 
      color: 'from-green-500 to-yellow-400', 
      bg: 'rgba(22, 163, 74, 0.1)', 
      text: 'The Harvest Festival' 
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden bg-[#050505]">
      {/* Dynamic Festival Glow */}
      <motion.div 
        key={activeFestival}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[160px] pointer-events-none transition-all duration-1000"
        style={{ background: festivals[activeFestival].bg }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Mock Mobile App Preview */}
        <div className="relative order-2 lg:order-1 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-[360px] aspect-[9/19] rounded-[3rem] bg-zinc-900 border-[8px] border-zinc-800 shadow-2xl overflow-hidden"
          >
            {/* App UI Header */}
            <div className={`p-6 bg-gradient-to-br ${festivals[activeFestival].color} text-black`}>
              <div className="flex justify-between items-center mb-4">
                <CalendarDays size={20} />
                <span className="text-[10px] font-black uppercase">Live Festival Mode</span>
              </div>
              <h4 className="text-2xl font-black italic">{activeFestival}</h4>
              <p className="text-[10px] font-bold opacity-80">{festivals[activeFestival].text}</p>
            </div>

            {/* App UI Content */}
            <div className="p-4 space-y-4">
               <div className="grid grid-cols-2 gap-3">
                  <div className="h-24 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                    <ShoppingBag className="text-white/20" />
                  </div>
                  <div className="h-24 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                    <Sparkles className="text-white/20" />
                  </div>
               </div>
               <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-1/2 h-2 bg-white/20 rounded-full mb-2" />
                  <div className="w-full h-2 bg-white/5 rounded-full" />
               </div>
            </div>

            {/* Floating Cultural Story Badge */}
            <motion.div 
              key={activeFestival + "-badge"}
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              className="absolute bottom-20 -right-6 p-4 rounded-2xl bg-white text-black shadow-xl max-w-[140px]"
            >
               <BookOpen size={16} className="mb-2 text-orange-600" />
               <p className="text-[10px] font-bold leading-tight">Read the story of {activeFestival}</p>
            </motion.div>
          </motion.div>

          {/* Festival Switcher */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            {/* 5. Cast keys to FestivalType[] to avoid string indexing errors */}
            {(Object.keys(festivals) as FestivalType[]).map((fest) => (
              <button
                key={fest}
                onClick={() => setActiveFestival(fest)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeFestival === fest 
                  ? 'bg-white text-black border-white' 
                  : 'bg-black text-gray-500 border-white/10 hover:border-white/30'
                }`}
              >
                {fest}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white text-xs font-black tracking-widest uppercase mb-8">
            <PartyPopper size={14} className="text-yellow-500" /> Cultural Personalization
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Celebrate <br />
            <span className={`bg-gradient-to-r ${festivals[activeFestival].color} bg-clip-text text-transparent transition-all duration-1000`}>
                In Festival Mode.
            </span>
          </h2>
          
          <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-lg">
            Bharat Origin adapts to our calendar. From Diwali lamps to Holi colors, the platform 
            transforms to prioritize <span className="text-white">artisan-made festive essentials</span> and the stories behind them.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default FestivalModeSection;