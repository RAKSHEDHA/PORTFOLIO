import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroScreen({ onComplete }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Prevents scrolling while the intro is active
    document.body.style.overflow = showIntro ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showIntro]);

  const handleStartClick = () => {
    setShowIntro(false);
    // Call the onComplete callback after the intro slides out
    setTimeout(() => {
      onComplete?.();
    }, 1000); // Matches the exit animation duration
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="intro-screen"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          // A premium, slow-easing cubic-bezier curve for that "luxury" slide-up feel
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          {/* --- BACKGROUND GRID --- */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }}
          ></div>

          {/* Fade-in and scale effect on your name */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            // Added relative and z-10 so the content sits above the grid
            className="text-center px-4 flex flex-col items-center relative z-10"
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-black tracking-[0.2em] uppercase leading-tight mb-12">
              RAKSHEDHA
              <br />
              BALACHANDER
            </h1>
            
            {/* The Start Button */}
            <motion.button
              // Button fades in slightly after the name
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              onClick={handleStartClick}
              className="px-10 py-4 border-[2px] border-black text-black bg-white font-black tracking-[0.3em] uppercase text-sm hover:bg-black hover:text-white transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              Start Experience
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}