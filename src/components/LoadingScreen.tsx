import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import alifCharacterImg from '../assets/images/alif_character_pure_transparent_1780383675414.png';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const springProgress = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    springProgress.set(progress);
  }, [progress, springProgress]);

  useEffect(() => {
    let active = true;

    // Preload critical assets so they are fully loaded/cached before the loading screen completes
    const preloadAssets = async () => {
      const assets = [
        alifCharacterImg,
        '/landing-bg.jpg'
      ];
      try {
        await Promise.all(
          assets.map((src) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = resolve; // fallback to complete even on load failure
            });
          })
        );
      } catch (err) {
        console.warn('Asset preloading warning:', err);
      }
    };

    preloadAssets();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (active) onComplete();
          }, 850);
          return 100;
        }
        // Smooth random increments for loading experience stability
        const increment = Math.random() * 14 + 4;
        return Math.min(prev + increment, 100);
      });
    }, 280);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="w-64 sm:w-80 relative">
        {/* Progress Bar Container */}
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden relative">
          {/* Progress fill */}
          <motion.div 
            className="h-full bg-[#ff4b4b] rounded-full"
            style={{ 
              width: `${progress}%`,
              transition: 'width 0.4s ease-out'
            }}
          />
        </div>

        {/* Paper Airplane Indicator */}
        <motion.div
           className="absolute top-[-30px] flex items-center justify-center"
           style={{ 
             left: `${progress}%`,
             x: '-50%',
             transition: 'left 0.4s ease-out'
           }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="white" 
              stroke="#404040" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="rotate-45 drop-shadow-md"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Percentage Label */}
        <div className="mt-8 text-center">
          <span className="font-display font-black text-gray-800 text-sm uppercase tracking-widest">
            Loading {Math.round(progress)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};
