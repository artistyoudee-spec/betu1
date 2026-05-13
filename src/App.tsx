import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Heart } from 'lucide-react';

import WelcomeScreen from './components/WelcomeScreen';
import QuoteReveal from './components/QuoteReveal';
import ScratchCardSection from './components/ScratchCardSection';
import MemoryGallery from './components/MemoryGallery';
import BirthdayLetter from './components/BirthdayLetter';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextStep = () => setStep((s) => s + 1);

  return (
    <div 
      className="min-h-screen relative overflow-hidden font-sans selection:bg-pink-200 bg-[#fdf2f8]"
      style={{
        background: 'radial-gradient(circle at top left, #fdf2f8 0%, #eef2ff 40%, #fae8ff 100%)'
      }}
    >
      {/* Abstract floating background elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-pink-200/40 rounded-full blur-[80px]"
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-indigo-200/40 rounded-full blur-[100px]"
        />
      </div>

      <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <WelcomeScreen 
              key="welcome" 
              onStart={() => {
                setIsPlaying(true);
                nextStep();
              }} 
            />
          )}

          {step === 1 && (
            <QuoteReveal key="quotes" onComplete={nextStep} />
          )}

          {step === 2 && (
            <ScratchCardSection key="scratch" onComplete={nextStep} />
          )}

          {step === 3 && (
            <MemoryGallery key="gallery" onComplete={nextStep} />
          )}

          {step === 4 && (
            <BirthdayLetter key="letter" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
