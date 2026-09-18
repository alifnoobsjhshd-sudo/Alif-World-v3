import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CartoonCloudTransitionProps {
  isActive: boolean;
}

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
      transform="translate(0, 10)"
      opacity="0.6"
    />
    {/* Main Crisp White Cartoon Cloud Body */}
    <path
      d="M80 175 C45 175 25 150 30 125 C15 112 12 88 28 72 C44 56 72 62 82 78 C96 42 142 28 178 44 C208 18 264 18 294 48 C328 38 364 64 364 98 C384 114 384 144 364 164 C352 176 326 178 310 175 Z"
      fill="#ffffff"
      stroke="#7dd3fc"
      strokeWidth="4"
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

export const CartoonCloudTransition: React.FC<CartoonCloudTransitionProps> = ({ isActive }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Subtle sky background wash that builds up */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#7dd3fc] via-[#bae6fd] to-[#f0f9ff]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.45, 1] }}
            transition={{ duration: 3.9, times: [0, 0.4, 0.75, 1], ease: 'easeInOut' }}
          />

          {/* ── 1. CENTER EXPANDING CLOUD (Puffs out directly from the dream bubble) ── */}
          <motion.div
            className="absolute left-1/2 top-[24%] -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] md:w-[700px]"
            initial={{ scale: 0.1, opacity: 0, rotate: 0 }}
            animate={{
              scale: [0.1, 0.75, 2.3, 6.0],
              opacity: [0, 0.9, 1, 1],
              rotate: [0, 6, -5, 2],
            }}
            transition={{
              duration: 3.8,
              times: [0, 0.35, 0.7, 1],
              ease: [0.22, 1, 0.36, 1],
              delay: 0.6,
            }}
          >
            <CartoonCloudSvg className="w-full h-auto drop-shadow-[0_20px_35px_rgba(56,189,248,0.35)]" />
          </motion.div>

          {/* ── 2. BOTTOM BILLOWING CLOUD BANK ── */}
          <motion.div
            className="absolute -bottom-16 left-0 right-0 flex items-end justify-center w-full"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: ['100%', '40%', '0%'], opacity: [0, 1, 1] }}
            transition={{ duration: 2.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full flex justify-between items-end scale-125 sm:scale-110">
              <CartoonCloudSvg className="w-[320px] sm:w-[480px] -mb-8 -ml-16 shrink-0" />
              <CartoonCloudSvg className="w-[380px] sm:w-[560px] -mb-4 shrink-0" flip />
              <CartoonCloudSvg className="w-[340px] sm:w-[500px] -mb-12 -mr-16 shrink-0" />
            </div>
          </motion.div>

          {/* ── 3. TOP DESCENDING CLOUD BANK ── */}
          <motion.div
            className="absolute -top-20 left-0 right-0 flex items-start justify-center w-full"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: ['-100%', '-30%', '0%'], opacity: [0, 1, 1] }}
            transition={{ duration: 2.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full flex justify-between items-start scale-125 sm:scale-110">
              <CartoonCloudSvg className="w-[360px] sm:w-[520px] -mt-10 -ml-12 shrink-0" flip />
              <CartoonCloudSvg className="w-[320px] sm:w-[460px] -mt-6 shrink-0" />
              <CartoonCloudSvg className="w-[380px] sm:w-[540px] -mt-14 -mr-12 shrink-0" />
            </div>
          </motion.div>

          {/* ── 4. LEFT & RIGHT SWEEPING FLUFFY CLOUDS ── */}
          <motion.div
            className="absolute top-1/3 -left-20 w-[320px] sm:w-[480px]"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: ['-100%', '0%'], opacity: [0, 1] }}
            transition={{ duration: 2.6, delay: 1.3, ease: 'easeOut' }}
          >
            <CartoonCloudSvg className="w-full h-auto drop-shadow-xl" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 -right-20 w-[340px] sm:w-[500px]"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: ['100%', '0%'], opacity: [0, 1] }}
            transition={{ duration: 2.6, delay: 1.4, ease: 'easeOut' }}
          >
            <CartoonCloudSvg className="w-full h-auto drop-shadow-xl" flip />
          </motion.div>

          {/* ── 5. FLOATING GOLDEN SPARKLES & DREAM DUST ── */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-300 text-lg sm:text-2xl drop-shadow-md select-none"
                style={{
                  top: `${20 + (i * 6) % 60}%`,
                  left: `${15 + (i * 8) % 70}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.3, 0],
                  opacity: [0, 1, 0],
                  y: [-15, -45],
                  rotate: [0, 90],
                }}
                transition={{
                  duration: 2.0,
                  delay: 0.9 + i * 0.15,
                  ease: 'easeOut',
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>

          {/* Final solid cloud wash before route transition */}
          <motion.div
            className="absolute inset-0 bg-[#e0f2fe]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0, 1] }}
            transition={{ duration: 3.9, times: [0, 0.65, 0.88, 1], ease: 'easeIn' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
