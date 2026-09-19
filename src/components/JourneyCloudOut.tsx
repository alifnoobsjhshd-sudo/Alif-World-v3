import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { dreamAudio } from '../utils/audio';

// Fluffy Cartoon Cloud SVG Component with soft shadows & highlights
const CartoonCloudSvg: React.FC<{ className?: string; flip?: boolean; strokeColor?: string }> = ({
  className = '',
  flip = false,
  strokeColor = '#7dd3fc',
}) => (
  <svg
    viewBox="0 0 400 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${flip ? 'scale-x-[-1]' : ''}`}
  >
    {/* Soft Ambient Underbelly Drop Shadow */}
    <path
      d="M80 180 C50 180 30 155 35 130 C20 120 15 95 30 80 C45 65 75 70 85 85 C100 50 145 35 180 50 C210 25 265 25 295 55 C330 45 365 70 365 105 C385 120 385 150 365 170 C355 180 330 185 315 180 Z"
      fill="#bae6fd"
      transform="translate(0, 12)"
      opacity="0.75"
    />
    {/* Main Cloud Body */}
    <path
      d="M80 175 C45 175 25 150 30 125 C15 112 12 88 28 72 C44 56 72 62 82 78 C96 42 142 28 178 44 C208 18 264 18 294 48 C328 38 364 64 364 98 C384 114 384 144 364 164 C352 176 326 178 310 175 Z"
      fill="#ffffff"
      stroke={strokeColor}
      strokeWidth="4.5"
      strokeLinejoin="round"
    />
    {/* Inner cartoon highlights */}
    <path
      d="M60 115 C55 100 70 90 85 92"
      stroke="#e0f2fe"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M190 45 C220 30 255 35 270 55"
      stroke="#e0f2fe"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <circle cx="320" cy="95" r="10" fill="#f0f9ff" />
    <circle cx="340" cy="115" r="6" fill="#f0f9ff" />
  </svg>
);

export const JourneyCloudOut: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Play subtle airy wind whoosh right as clouds begin parting
    const whooshTimer = setTimeout(() => {
      dreamAudio.playCloudWhoosh();
    }, 700);

    // Completely unmount component after parting animation has revealed the screen
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3400);

    return () => {
      clearTimeout(whooshTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* ── 1. SKY BASE LAYER (Completely covers any cracks during passive phase) ── */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#7dd3fc] via-[#bae6fd] to-[#e0f2fe]"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0] }}
            transition={{
              duration: 2.8,
              times: [0, 0.35, 1],
              ease: 'easeInOut',
            }}
          />

          {/* ── 2. PASSIVE AMBIENT BREATHING WRAPPER ───────────────────────────── */}
          {/* Holds clouds gently resting and floating passively during the initial moments */}
          <motion.div
            className="absolute inset-0 w-full h-full flex"
            animate={{
              y: [0, -4, 2, 0],
              scale: [1, 1.015, 0.995, 1],
            }}
            transition={{
              duration: 2.2,
              ease: 'easeInOut',
            }}
          >
            {/* ── LEFT CLOUD BANK (Passively covers left half, then sweeps LEFT) ── */}
            <motion.div
              className="relative w-1/2 h-full flex flex-col justify-between"
              initial={{ x: 0 }}
              animate={{
                // 0s to ~0.8s passive cover, then swift cinematic parting to the left
                x: ['0%', '0%', '-145%'],
                opacity: [1, 1, 0.2],
              }}
              transition={{
                duration: 3.1,
                times: [0, 0.28, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Top Left Puffy Cluster */}
              <div className="relative -mt-10 -ml-16 w-[125%] max-w-[680px]">
                <CartoonCloudSvg className="w-full h-auto drop-shadow-2xl" />
              </div>

              {/* Mid Left Main Overlapping Cloud (Extended past center to overlap) */}
              <div className="relative -ml-20 w-[140%] max-w-[760px] -my-12">
                <CartoonCloudSvg className="w-full h-auto drop-shadow-[0_25px_35px_rgba(56,189,248,0.35)]" flip />
              </div>

              {/* Lower Mid Left Puffy Layer */}
              <div className="relative -ml-12 w-[130%] max-w-[700px] -my-8">
                <CartoonCloudSvg className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Bottom Left Horizon Cloud Bank */}
              <div className="relative -mb-16 -ml-20 w-[145%] max-w-[780px]">
                <CartoonCloudSvg className="w-full h-auto drop-shadow-2xl" flip />
              </div>
            </motion.div>

            {/* ── RIGHT CLOUD BANK (Passively covers right half, then sweeps RIGHT) ── */}
            <motion.div
              className="relative w-1/2 h-full flex flex-col justify-between items-end"
              initial={{ x: 0 }}
              animate={{
                // 0s to ~0.8s passive cover, then swift cinematic parting to the right
                x: ['0%', '0%', '145%'],
                opacity: [1, 1, 0.2],
              }}
              transition={{
                duration: 3.1,
                times: [0, 0.28, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Top Right Puffy Cluster */}
              <div className="relative -mt-10 -mr-16 w-[125%] max-w-[680px]">
                <CartoonCloudSvg className="w-full h-auto drop-shadow-2xl" flip />
              </div>

              {/* Mid Right Main Overlapping Cloud (Extended past center to overlap) */}
              <div className="relative -mr-20 w-[140%] max-w-[760px] -my-12">
                <CartoonCloudSvg className="w-full h-auto drop-shadow-[0_25px_35px_rgba(56,189,248,0.35)]" />
              </div>

              {/* Lower Mid Right Puffy Layer */}
              <div className="relative -mr-12 w-[130%] max-w-[700px] -my-8">
                <CartoonCloudSvg className="w-full h-auto drop-shadow-xl" flip />
              </div>

              {/* Bottom Right Horizon Cloud Bank */}
              <div className="relative -mb-16 -mr-20 w-[145%] max-w-[780px]">
                <CartoonCloudSvg className="w-full h-auto drop-shadow-2xl" />
              </div>
            </motion.div>
          </motion.div>

          {/* ── 3. CENTER CLOUD DIVIDER (Splits: some move left, some move right) ── */}
          {/* Center-Left Cloud drifting up & away to the left */}
          <motion.div
            className="absolute left-1/2 top-1/3 -translate-x-3/4 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[620px]"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: ['0%', '0%', '-140%'],
              y: ['0%', '0%', '-25%'],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 3.0,
              times: [0, 0.26, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <CartoonCloudSvg className="w-full h-auto drop-shadow-[0_20px_45px_rgba(56,189,248,0.4)]" />
          </motion.div>

          {/* Center-Right Cloud drifting down & away to the right */}
          <motion.div
            className="absolute left-1/2 top-2/3 -translate-x-1/4 -translate-y-1/2 w-[340px] sm:w-[520px] md:w-[640px]"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: ['0%', '0%', '140%'],
              y: ['0%', '0%', '25%'],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 3.0,
              times: [0, 0.26, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <CartoonCloudSvg className="w-full h-auto drop-shadow-[0_20px_45px_rgba(56,189,248,0.4)]" flip />
          </motion.div>

          {/* ── 4. MAGICAL BREEZE PARTICLES (Drifting away as the sky is revealed) ── */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-amber-300 text-lg sm:text-2xl drop-shadow-md select-none"
                style={{
                  top: `${20 + (i * 7) % 65}%`,
                  left: `${25 + (i * 6) % 55}%`,
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.3, 0],
                  opacity: [0, 1, 0],
                  x: i % 2 === 0 ? [0, -30, -180] : [0, 30, 180],
                  y: [0, -15, -45],
                }}
                transition={{
                  duration: 2.4,
                  delay: 0.7 + i * 0.08,
                  ease: 'easeOut',
                }}
              >
                ✦
              </motion.div>
            ))}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
