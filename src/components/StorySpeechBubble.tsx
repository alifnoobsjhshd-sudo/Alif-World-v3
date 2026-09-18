import React from 'react';
import { motion } from 'motion/react';
import { StoryScene } from '../data/storyline';

interface StorySpeechBubbleProps {
  scene: StoryScene;
  className?: string;
}

export const StorySpeechBubble: React.FC<StorySpeechBubbleProps> = ({ scene, className = '' }) => {
  const isStorm = scene.theme === 'storm';
  const isSunset = scene.theme === 'sunset';
  const isBreakthrough = scene.theme === 'breakthrough';
  const isUnforgettable = scene.theme === 'unforgettable';
  const isReveal = scene.theme === 'reveal';

  // Specific tilt for wind-tilted bubble
  const tiltClass = scene.bubblePlacement === 'wind-tilted' ? '-rotate-3 sm:-rotate-4' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: [0, -6, 0],
        scale: 1,
        rotate: scene.bubblePlacement === 'wind-tilted' ? [-3, -5, -3] : [0, 0.5, 0]
      }}
      transition={{ 
        y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
      }}
      className={`relative z-30 max-w-[280px] sm:max-w-md md:max-w-lg select-none filter drop-shadow-xl ${tiltClass} ${className}`}
    >
      <div 
        className={`relative px-5 py-4 sm:px-7 sm:py-5 rounded-3xl border-2 transition-all duration-300 ${
          isStorm 
            ? 'bg-slate-900/90 text-slate-100 border-slate-700 shadow-[0_15px_35px_rgba(15,23,42,0.4)] backdrop-blur-md'
            : isSunset
            ? 'bg-gradient-to-br from-amber-50/95 via-rose-50/95 to-purple-50/95 text-slate-800 border-amber-200/80 shadow-[0_15px_35px_rgba(249,115,22,0.2)] backdrop-blur-sm'
            : isBreakthrough
            ? 'bg-gradient-to-b from-white to-amber-50 text-slate-900 border-amber-300 shadow-[0_20px_45px_rgba(251,191,36,0.3)]'
            : isUnforgettable
            ? 'bg-white/95 text-slate-800 border-indigo-200/90 shadow-[0_20px_50px_rgba(99,102,241,0.18)] backdrop-blur-md'
            : isReveal
            ? 'bg-white text-slate-900 border-sky-300 shadow-[0_20px_45px_rgba(56,189,248,0.25)]'
            : 'bg-white/95 text-slate-800 border-slate-200 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-sm'
        }`}
      >
        {/* Speech Bubble Quote */}
        <p 
          className={`font-hand text-xl sm:text-2xl md:text-3xl leading-snug tracking-wide ${
            isStorm ? 'text-amber-100' : 'text-slate-800'
          }`}
        >
          {scene.bubble}
        </p>

        {/* Tail / Connector Pointer */}
        {scene.bubblePlacement === 'beside-head' && (
          <div className="absolute -bottom-3 left-8 w-5 h-5 bg-inherit border-r-2 border-b-2 border-inherit rotate-45 transform" />
        )}
        {(scene.bubblePlacement === 'above' || scene.bubblePlacement === 'cinematic-large') && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-inherit border-r-2 border-b-2 border-inherit rotate-45 transform" />
        )}
        {scene.bubblePlacement === 'left-curving' && (
          <div className="absolute -bottom-3 right-8 w-5 h-5 bg-inherit border-r-2 border-b-2 border-inherit rotate-45 transform" />
        )}
        {scene.bubblePlacement === 'above-laptop' && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-inherit border-r-2 border-b-2 border-inherit rotate-45 transform" />
        )}
        {scene.bubblePlacement === 'wind-tilted' && (
          <div className="absolute -bottom-3 right-12 w-5 h-5 bg-inherit border-r-2 border-b-2 border-inherit rotate-45 transform" />
        )}
        {scene.bubblePlacement === 'direct-friendly' && (
          <div className="absolute -bottom-3 left-12 w-5 h-5 bg-inherit border-r-2 border-b-2 border-inherit rotate-45 transform" />
        )}
      </div>
    </motion.div>
  );
};
