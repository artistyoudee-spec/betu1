import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ScratchCardSectionProps {
  onComplete: () => void;
  key?: React.Key;
}

export default function ScratchCardSection({ onComplete }: ScratchCardSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [percentRevealed, setPercentRevealed] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    
    if (!canvas || !ctx || !containerRef.current) return;

    // Set canvas dimensions to match container
    const resizeCanvas = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      fillCanvas();
    };

    const fillCanvas = () => {
      ctx.fillStyle = '#C0C0C0'; // Silver metallic
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some noise/texture to look like a scratch card
      for (let i = 0; i < 5000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#A9A9A9' : '#D3D3D3';
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
      }
      
      // Add text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = 'bold 12px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('HOLD & SCRATCH', canvas.width / 2, canvas.height / 2 + 30);
      
      // Add icon
      ctx.font = '24px Inter';
      ctx.fillText('✨', canvas.width / 2, canvas.height / 2 - 10);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const getCoordinates = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const draw = (x: number, y: number) => {
      if (!isDrawing || isRevealed) return;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();

      // Check how much is scratched off occasionally
      if (Math.random() > 0.9) {
        checkPercentage();
      }
    };

    const checkPercentage = () => {
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparentCount = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) transparentCount++;
      }
      const percent = (transparentCount / (pixels.length / 4)) * 100;
      setPercentRevealed(percent);
      if (percent > 60 && !isRevealed) {
        setIsRevealed(true);
        // Fade out rest of canvas
        canvas.style.transition = 'opacity 1s ease';
        canvas.style.opacity = '0';
      }
    };

    const startDraw = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      isDrawing = true;
      const { x, y } = getCoordinates(e);
      lastX = x;
      lastY = y;
      draw(x, y);
    };

    const moveDraw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      const { x, y } = getCoordinates(e);
      draw(x, y);
    };

    const endDraw = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', moveDraw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mouseleave', endDraw);
    
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', moveDraw, { passive: false });
    canvas.addEventListener('touchend', endDraw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', startDraw);
      canvas.removeEventListener('mousemove', moveDraw);
      canvas.removeEventListener('mouseup', endDraw);
      canvas.removeEventListener('mouseleave', endDraw);
      canvas.removeEventListener('touchstart', startDraw);
      canvas.removeEventListener('touchmove', moveDraw);
      canvas.removeEventListener('touchend', endDraw);
    };
  }, [isRevealed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1 }}
      className="bg-white/30 backdrop-blur-2xl border border-white/50 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden w-full max-w-3xl flex flex-col items-center"
    >
      <div className="absolute top-0 right-0 p-6 pointer-events-none">
        <span className="text-[80px] md:text-[120px] font-serif text-pink-500/10 leading-none select-none italic">03</span>
      </div>

      <h2 className="font-serif text-3xl md:text-5xl text-slate-800 mb-2 text-center w-full relative z-10">
        Scratch to see a surprise...
      </h2>
      <p className="text-slate-500 mb-8 text-center w-full relative z-10">Your curiosity is your only tool. Rub the surface below.</p>

      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-inner bg-slate-100 group cursor-pointer border border-white/60 mx-auto z-10"
      >
        {/* Hidden Content */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-50 to-indigo-50 p-6 text-center">
          {/* EDIT HERE: Change the image URL to a personal photo or another romantic image */}
          <img 
            src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop" 
            alt="Romantic rose" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="relative z-10">
            {/* EDIT HERE: Change the emoji or remove the div entirely */}
            <div className="text-5xl mb-4">🎟️</div>
            {/* EDIT HERE: Change the revealed title text */}
            <h3 className="font-serif text-3xl md:text-4xl text-slate-800 mb-2 drop-shadow-sm">
              You are my everything!
            </h3>
            {/* EDIT HERE: Change the revealed subtitle text */}
            <p className="font-sans text-slate-500 text-base md:text-lg italic">
              Every day with you is a gift.
            </p>
          </div>
        </div>

        {/* Scratchable Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-crosshair touch-none z-20 transition-opacity duration-1000"
          style={{ pointerEvents: isRevealed ? 'none' : 'auto' }}
        />
      </div>

      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 flex justify-between items-center w-full z-10"
          >
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-white/60 hover:bg-white/80 rounded-full text-slate-700 font-medium transition-all border border-white/40 shadow-sm flex items-center gap-2"
            >
              See What's Next <ArrowRight size={18} />
            </button>
            <div className="hidden md:flex -space-x-2">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-pink-100"></div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100"></div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">+...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
