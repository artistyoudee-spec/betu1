import React, { useState } from 'react';
import { Music, Music2 } from 'lucide-react';
import { motion } from 'motion/react';
import ReactPlayer from 'react-player';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function AudioPlayer({ isPlaying, setIsPlaying }: AudioPlayerProps) {
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* EDIT HERE: Replace the URL with your own YouTube audio file or link. */}
      <ReactPlayer
        url="https://www.youtube.com/watch?v=3QhajVg6SjE"
        playing={isPlaying}
        loop={true}
        width="0"
        height="0"
        style={{ display: 'none' }}
        config={{
          youtube: {
            playerVars: { autoplay: 1 }
          }
        }}
      />
      
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={togglePlay}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-colors backdrop-blur-xl border border-white/60 ${
          isPlaying ? 'bg-pink-400/80 text-white' : 'bg-white/40 text-pink-500 hover:bg-white/60'
        }`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Music size={24} className="animate-pulse" /> : <Music2 size={24} />}
      </motion.button>
    </div>
  );
}
