import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// EDIT HERE: Add or change the quotes you want to reveal step-by-step
const quotes = [
  "They say you only fall in love once...",
  "But that can't be true.",
  "Because every time I look at you...",
  "I fall in love all over again.",
  "You make every ordinary moment feel like a fairy tale.",
  "And today, I just want to celebrate YOU."
];

export default function QuoteReveal({ onComplete }: { onComplete: () => void; key?: React.Key }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < quotes.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 5000); // 5 seconds per quote
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500); // Slight pause before transitioning
      return () => clearTimeout(timer);
    }
  }, [currentIndex, onComplete]);

  return (
    <div className="w-full max-w-4xl px-4 min-h-[50vh] flex flex-col items-center justify-center relative">
      <AnimatePresence mode="wait">
        {currentIndex < quotes.length && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)", scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 md:p-16 shadow-lg w-full max-w-2xl text-center"
          >
            <span className="text-pink-400 text-4xl md:text-6xl font-serif block mb-4 opacity-50">"</span>
            <h2 className="font-serif italic text-2xl md:text-4xl text-slate-700 leading-relaxed font-medium">
              {quotes[currentIndex]}
            </h2>
            <div className="mt-8 flex items-center justify-center space-x-4 opacity-70">
              <div className="h-[1px] w-12 bg-pink-300"></div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500">Thoughts of you</span>
              <div className="h-[1px] w-12 bg-pink-300"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Progress indicators */}
      <div className="absolute -bottom-8 md:bottom-0 flex gap-2">
        {quotes.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-1000 ${
              idx === currentIndex 
                ? 'w-8 bg-pink-400 shadow-[0_0_10px_rgba(244,114,182,0.5)]' 
                : idx < currentIndex 
                  ? 'w-2 bg-pink-300/60' 
                  : 'w-2 bg-white/50 border border-white/20'
            }`} 
          />
        ))}
      </div>
    </div>
  );
}
