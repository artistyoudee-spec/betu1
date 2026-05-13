import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';

// EDIT HERE: Replace the urls and captions with your own memories
// 'type' can be 'photo' or 'video'
const memories = [
  { id: 1, type: 'photo', url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop', caption: "That time we laughed until it hurt" },
  { id: 2, type: 'photo', url: 'https://images.unsplash.com/photo-1622323533610-85fb913ee861?q=80&w=800&auto=format&fit=crop', caption: "Our quiet mornings together" },
  { id: 3, type: 'video', url: 'https://cdn.pixabay.com/video/2020/05/21/40003-424364239_large.mp4', caption: "Just us being us", isPlaying: false },
  { id: 4, type: 'photo', url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop', caption: "Looking forward to forever" },
];

export default function MemoryGallery({ onComplete }: { onComplete: () => void; key?: React.Key }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMemory = () => {
    if (currentIndex < memories.length - 1) {
      setCurrentIndex(curr => curr + 1);
    }
  };

  const isComplete = currentIndex === memories.length - 1;

  const currentMemory = memories[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center justify-center w-full max-w-4xl"
    >
      <h2 className="font-serif text-3xl md:text-5xl text-slate-800 mb-12 text-center text-shadow-sm">
        A few glimpses of us...
      </h2>

      <div className="relative w-full max-w-md mx-auto aspect-[3/4] flex justify-center perspective-[1000px] z-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentMemory.id}
            initial={{ opacity: 0, x: 200, rotateY: -30, rotateZ: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, rotateZ: (currentIndex % 2 === 0 ? -2 : 3), scale: 1 }}
            exit={{ opacity: 0, x: -200, rotateY: 30, rotateZ: -10, scale: 0.8 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className="absolute inset-0 bg-white/70 backdrop-blur-2xl p-4 pb-20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl border border-white/80"
          >
            <div className="w-full h-full rounded-xl overflow-hidden shadow-inner bg-slate-100/50">
              {currentMemory.type === 'photo' ? (
                <img 
                  src={currentMemory.url} 
                  alt={currentMemory.caption}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center group overflow-hidden">
                   <video 
                    src={currentMemory.url} 
                    controls
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop"
                  />
                </div>
              )}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-20 flex items-center justify-center px-4">
              <p className="font-serif italic text-xl md:text-2xl text-slate-700 text-center">{currentMemory.caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-16 flex gap-4 z-10">
        {!isComplete ? (
          <button
            onClick={nextMemory}
            className="px-8 py-3 bg-white/60 hover:bg-white/80 backdrop-blur-md rounded-full text-slate-700 font-medium tracking-wide transition-all border border-white/40 shadow-sm flex items-center gap-2 transform hover:-translate-y-1"
          >
            Next Memory <ArrowRight size={18} />
          </button>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onComplete}
            className="px-8 py-4 bg-pink-400 hover:bg-pink-500 text-white rounded-full font-medium tracking-wide transition-all shadow-lg flex items-center gap-2 border border-pink-300"
          >
            One Last Thing... <ArrowRight size={18} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
