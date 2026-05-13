import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  key?: React.Key;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="text-center w-full max-w-2xl px-6 py-12 bg-white/30 backdrop-blur-2xl border border-white/50 rounded-[40px] shadow-2xl relative overflow-hidden text-slate-800"
    >
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-xs md:text-sm text-slate-500 uppercase tracking-[0.2em] mb-4 font-bold"
      >
        A special day, a special person
      </motion.p>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="font-serif text-5xl md:text-7xl mb-8 selection:bg-pink-200"
      >
        Happy Birthday <br />
        <span className="font-serif italic text-6xl md:text-8xl text-pink-500 mt-2 block opacity-90">My Love</span>
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="mt-12"
      >
        <button
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-700 transition-all duration-300 ease-in-out border border-white/40 rounded-full bg-white/60 hover:bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 overflow-hidden"
        >
          <span className="relative flex items-center gap-2">
            Begin the Journey <Sparkles size={18} className="group-hover:rotate-12 transition-transform text-pink-500" />
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}
