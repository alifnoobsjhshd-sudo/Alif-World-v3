import React, { useEffect, useState } from 'react';
import { MotionValue } from 'motion/react';

export interface SpaceWaypoint {
  id: string;
  name: string;
  shortName: string;
  depth: number;
}

interface SpaceAvionicsHUDProps {
  depthValue: MotionValue<number>;
  smoothedDepth: MotionValue<number>;
  scrollVelocity: MotionValue<number>;
  maxDepth: number;
  waypoints: SpaceWaypoint[];
  onWarpJump?: (targetDepth: number) => void;
}

export const SpaceAvionicsHUD: React.FC<SpaceAvionicsHUDProps> = ({
  smoothedDepth,
  scrollVelocity,
  maxDepth,
}) => {
  const [currentDepth, setCurrentDepth] = useState(0);
  const [currentVelocity, setCurrentVelocity] = useState(0);

  useEffect(() => {
    const unsubDepth = smoothedDepth.on('change', (v) => {
      setCurrentDepth(Math.round(v));
    });
    const unsubVel = scrollVelocity.on('change', (v) => {
      // Scale velocity to cosmic sub-light/super-luminal readout (e.g. 0.00c to ~3.5c)
      const c = Math.max(0, (v / 42)).toFixed(2);
      setCurrentVelocity(parseFloat(c));
    });
    return () => {
      unsubDepth();
      unsubVel();
    };
  }, [smoothedDepth, scrollVelocity]);

  const progressPct = Math.min(100, Math.max(0, (currentDepth / maxDepth) * 100));

  return (
    <div className="fixed top-16 sm:top-18 left-3 sm:left-6 pointer-events-none z-40 select-none">
      {/* ── TOP AVIONICS / TELEMETRY STATUS ─────────────────────────────────── */}
      <div className="flex flex-col gap-1.5 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-500/25 shadow-[0_0_12px_rgba(6,182,212,0.15)] text-[11px] font-mono text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="tracking-widest uppercase text-slate-300">TELEMETRY</span>
          <span className="text-slate-600">|</span>
          <span className="text-white font-medium">
            {currentVelocity > 0.05 ? `${currentVelocity.toFixed(2)}c` : 'CRUISE'}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-300 font-bold">
            {currentDepth} <span className="text-[9px] text-cyan-400/80">LY</span>
          </span>
        </div>

        {/* Depth Progress Bar */}
        <div className="w-48 sm:w-60 h-1.5 rounded-full bg-slate-800/80 overflow-hidden border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-400 transition-all duration-150"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
};
