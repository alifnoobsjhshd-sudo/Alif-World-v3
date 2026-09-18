import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { Rocket } from 'lucide-react';
import { dreamAudio } from '../utils/audio';

interface SpaceFlightPathProps {
  smoothedDepth: MotionValue<number>;
  maxDepth: number;
  onNavigateToWorks: () => void;
  onReturnToLaunch: () => void;
}

export const SpaceFlightPath: React.FC<SpaceFlightPathProps> = ({
  smoothedDepth,
  maxDepth,
  onNavigateToWorks,
  onReturnToLaunch,
}) => {
  // Flight percentage 0% to 100%
  const progressPercent = useTransform(smoothedDepth, [0, maxDepth], [0, 100]);
  const progressWidth = useTransform(progressPercent, (p) => `${p}%`);

  // Waypoint phase
  const waypointLabel = useTransform(progressPercent, (p: number) => {
    if (p < 25) return 'COSMIC VECTOR // DEEP SPACE TRANSIT';
    if (p < 65) return 'GRAVITATIONAL SLINGSHOT // APPROACHING WORKS';
    if (p < 95) return 'ORBITAL INSERTION // MY WORKS STATION';
    return 'MISSION ACHIEVED // MY WORKS DOCKED';
  });

  return (
    <>
      {/* ── TOP HUD FLIGHT PATH SYSTEM (Identical Logic to Journey Page) ───── */}
      <div className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl pointer-events-none select-none">
        <div className="flex flex-col items-center gap-1.5">
          
          {/* Waypoint Text Badge */}
          <motion.div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-cyan-500/40 text-[10px] sm:text-[11px] font-mono tracking-widest text-cyan-300 shadow-lg shadow-cyan-950/40">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <motion.span>{waypointLabel}</motion.span>
          </motion.div>

          {/* Cosmic Path Progress Track */}
          <div className="relative w-full h-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center px-1 overflow-visible shadow-inner">
            
            {/* Glowing Active Track Bar */}
            <motion.div
              className="h-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-300 shadow-[0_0_8px_#38bdf8]"
              style={{ width: progressWidth }}
            />

            {/* Miniature Rocket Indicator Traveling Along the Track */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
              style={{
                left: progressWidth,
                transform: 'translate(-50%, -50%)',
              }}
              title="Current Flight Position"
            >
              <div className="w-5 h-5 rounded-full bg-cyan-500 border border-white flex items-center justify-center shadow-[0_0_12px_#38bdf8] text-white">
                <Rocket className="w-3 h-3 rotate-45" />
              </div>
            </motion.div>

            {/* Start Waypoint (Earth Launch Base) */}
            <button
              type="button"
              onClick={onReturnToLaunch}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border border-slate-600 hover:border-cyan-400 flex items-center justify-center text-[8px] font-mono text-slate-400 pointer-events-auto cursor-pointer transition-colors"
              title="Click to return to Launch Base"
            >
              01
            </button>

            {/* Destination Waypoint (My Works Station) */}
            <button
              type="button"
              onClick={onNavigateToWorks}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-amber-500/30 border border-amber-400 hover:border-amber-300 flex items-center justify-center text-[8px] font-mono text-amber-300 pointer-events-auto cursor-pointer transition-colors shadow-[0_0_6px_#f59e0b]"
              title="Click to jump to My Works"
            >
              ★
            </button>

          </div>

          {/* Quick Labels Below Track */}
          <div className="w-full flex justify-between text-[9px] font-mono text-slate-400 px-1">
            <span
              onClick={onReturnToLaunch}
              className="pointer-events-auto cursor-pointer hover:text-cyan-300 transition-colors"
            >
              🚀 LAUNCH
            </span>
            <span
              onClick={onNavigateToWorks}
              className="pointer-events-auto cursor-pointer hover:text-amber-300 transition-colors"
            >
              🌟 MY WORKS
            </span>
          </div>

        </div>
      </div>

      {/* ── 3D IN-WORLD CELESTIAL FLIGHT PATH LINE ─────────────────────────── */}
      {/* Beautiful glowing cartoon dashed trajectory line leading toward My Works */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="w-full h-full opacity-60"
        >
          <defs>
            <linearGradient id="cosmicPathGlow" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Glowing Outer Shadow Trail */}
          <path
            d="M500 1000 C470 750, 560 500, 500 240"
            fill="none"
            stroke="#0284c7"
            strokeWidth="6"
            strokeDasharray="12 16"
            className="blur-sm"
          />

          {/* Crisp Dashed Cartoon Cosmic Flight Trail */}
          <path
            d="M500 1000 C470 750, 560 500, 500 240"
            fill="none"
            stroke="url(#cosmicPathGlow)"
            strokeWidth="3"
            strokeDasharray="10 14"
          />

          {/* Waypoint Star Nodes Along Trail */}
          <circle cx="500" cy="1000" r="5" fill="#38bdf8" />
          <circle cx="485" cy="750" r="4" fill="#818cf8" />
          <circle cx="530" cy="500" r="4.5" fill="#c084fc" />
          <circle cx="500" cy="240" r="6" fill="#fde047" className="animate-pulse" />
        </svg>
      </div>
    </>
  );
};
