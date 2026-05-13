import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

export default function BirthdayLetter(_props: { key?: React.Key } = {}) {
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    // Trigger confetti when component mounts
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // Show letter after a brief delay
    setTimeout(() => {
      setShowLetter(true);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center w-full max-w-2xl text-center px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
        className="w-20 h-20 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/50 mb-8 mx-auto shadow-sm"
      >
        <span className="text-pink-500 text-3xl">♥</span>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="font-serif text-5xl md:text-6xl text-slate-800 mb-12"
      >
        Happy Birthday
      </motion.h1>

      <motion.div
        animate={{ opacity: showLetter ? 1 : 0, y: showLetter ? 0 : 20 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-3xl p-8 md:p-12 shadow-2xl w-full text-left relative overflow-hidden"
      >
        {/* EDIT HERE: Change the greeting */}
        <p className="font-serif text-slate-800 text-xl md:text-2xl leading-relaxed mb-6 italic">
          To my favorite person,
        </p>
        
        {/* EDIT HERE: Change the first paragraph of the letter */}
        <p className="font-sans text-slate-600 text-lg md:text-xl leading-relaxed mb-6">
          I hope this little surprise brought a smile to your face. From the big adventures to the quiet moments we share, everything is better because you're in it. 
        </p>
        
        {/* EDIT HERE: Change the second paragraph */}
        <p className="font-sans text-slate-600 text-lg md:text-xl leading-relaxed mb-10">
          Thank you for being you. Here's to celebrating you today and loving you always. May all your wishes come true.
        </p>
        
        {/* EDIT HERE: Change the sign-off */}
        <p className="font-serif italic text-2xl text-pink-500 font-medium">
          Forever yours.
        </p>
      </motion.div>
    </motion.div>
  );
}
