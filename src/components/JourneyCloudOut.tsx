import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Cartoon Puffy Cloud SVG Component
const CartoonCloudSvg: React.FC<{ className?: string; flip?: boolean }> = ({ className = '', flip = false }) => (
  <svg
    viewBox="0 0 400 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${flip ? 'scale-x-[-1]' : ''}`}
  >
    {/* Soft Cartoon Drop Shadow / Ambient Underbelly */}
    <path
      d="M80 180 C50 180 30 155 35 130 C20 120 15 95 30 80 C45 65 75 70 85 85 C100 50 145 35 180 50 C210 25 265 25 295 55 C330 45 365 70 365 105 C385 120 385 150 365 170 C355 180 330 185 315 180 Z"
      fill="#bae6fd"
      transform="translate(0, 12)"
      opacity="0.65"
    />
    {/* Main Crisp White Cartoon Cloud Body */}
    <path
      d="M80 175 C45 175 25 150 30 125 C15 112 12 88 28 72 C44 56 72 62 82 78 C96 42 142 28 178 44 C208 18 264 18 294 48 C328 38 364 64 364 98 C384 114 384 144 364 164 C352 176 326 178 310 175 Z"
      fill="#ffffff"
      stroke="#7dd3fc"
      strokeWidth="4.5"
      strokeLinejoin="round"
    />
    {/* Inner cartoon cheek highlight */}
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
    // Remove cloud overlay after slow, majestic parting animation completes
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3800);

    return () => {
      clearTimeout(exitTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Sky wash that reveals the journey scene */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#7dd3fc] via-[#bae6fd] to-[#f0f9ff]"
            initial={{ opacity: 0.96 }}
            animate={{ opacity: [0.96, 0.85, 0] }}
            transition={{ duration: 3.4, delay: 0.3, ease: 'easeInOut' }}
          />

          {/* ── 1. CENTER DISSIPATING CLOUD PUFF ── */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[580px] md:w-[750px]"
            initial={{ scale: 1.5, opacity: 1, rotate: 0 }}
            animate={{
              scale: [1.5, 2.4, 5.0],
              opacity: [1, 0.88, 0],
              rotate: [0, 6, 12],
            }}
            transition={{ duration: 3.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <CartoonCloudSvg className="w-full h-auto drop-shadow-[0_20px_40px_rgba(56,189,248,0.4)]" />
          </motion.div>

          {/* ── 2. LEFT FLUFFY CLOUD BANK (Parting outwards to the left) ── */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-3/5 flex flex-col justify-around -ml-12"
            initial={{ x: 0 }}
            animate={{ x: '-135%' }}
            transition={{ duration: 3.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <CartoonCloudSvg className="w-[380px] sm:w-[540px] drop-shadow-2xl -ml-16" />
            <CartoonCloudSvg className="w-[340px] sm:w-[480px] drop-shadow-2xl -ml-8" flip />
            <CartoonCloudSvg className="w-[400px] sm:w-[560px] drop-shadow-2xl -ml-20" />
          </motion.div>

          {/* ── 3. RIGHT FLUFFY CLOUD BANK (Parting outwards to the right) ── */}
          <motion.div
            className="absolute top-0 bottom-0 right-0 w-3/5 flex flex-col justify-around -mr-12 items-end"
            initial={{ x: 0 }}
            animate={{ x: '135%' }}
            transition={{ duration: 3.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <CartoonCloudSvg className="w-[380px] sm:w-[540px] drop-shadow-2xl -mr-16" flip />
            <CartoonCloudSvg className="w-[350px] sm:w-[500px] drop-shadow-2xl -mr-8" />
            <CartoonCloudSvg className="w-[420px] sm:w-[580px] drop-shadow-2xl -mr-20" flip />
          </motion.div>

          {/* ── 4. TOP CLOUD BANK (Billowing up into the sky) ── */}
          <motion.div
            className="absolute -top-12 left-0 right-0 flex justify-center w-full"
            initial={{ y: 0 }}
            animate={{ y: '-135%' }}
            transition={{ duration: 3.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex w-full justify-between scale-110">
              <CartoonCloudSvg className="w-[320px] sm:w-[480px] -mt-12" />
              <CartoonCloudSvg className="w-[380px] sm:w-[560px] -mt-8" flip />
              <CartoonCloudSvg className="w-[320px] sm:w-[480px] -mt-12" />
            </div>
          </motion.div>

          {/* ── 5. BOTTOM CLOUD BANK (Rolling down below the horizon) ── */}
          <motion.div
            className="absolute -bottom-16 left-0 right-0 flex justify-center w-full"
            initial={{ y: 0 }}
            animate={{ y: '135%' }}
            transition={{ duration: 3.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex w-full justify-between scale-110">
              <CartoonCloudSvg className="w-[340px] sm:w-[500px] -mb-12" flip />
              <CartoonCloudSvg className="w-[420px] sm:w-[600px] -mb-8" />
              <CartoonCloudSvg className="w-[340px] sm:w-[500px] -mb-12" flip />
            </div>
          </motion.div>

          {/* ── 6. FLOATING BREEZY SPARKLES SCATTERING AWAY ── */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-300 text-lg sm:text-2xl drop-shadow-md select-none"
                style={{
                  top: `${25 + (i * 6) % 55}%`,
                  left: `${20 + (i * 7) % 65}%`,
                }}
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                  scale: [1, 1.4, 0],
                  opacity: [1, 0.8, 0],
                  y: [-10, -50],
                  x: i % 2 === 0 ? -40 : 40,
                }}
                transition={{
                  duration: 2.5,
                  delay: 0.4 + i * 0.12,
                  ease: 'easeOut',
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
