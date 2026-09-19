import React, { useMemo } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

interface SpaceWarpStreaksProps {
  scrollVelocity: MotionValue<number>;
}

export const SpaceWarpStreaks: React.FC<SpaceWarpStreaksProps> = ({ scrollVelocity }) => {
  // Streaks flare up when scrolling forward at speed (velocity > 12)
  const warpOpacity = useTransform(scrollVelocity, (v: number) => {
    if (v <= 12) return 0;
    return Math.min(0.85, (v - 12) / 80);
  });

  const warpScale = useTransform(scrollVelocity, (v: number) => {
    if (v <= 12) return 0.5;
    return Math.min(2.2, 0.8 + (v - 12) / 70);
  });

  const vignetteOpacity = useTransform(scrollVelocity, (v: number) => {
    if (v <= 25) return 0;
    return Math.min(0.35, (v - 25) / 120);
  });

  // Pre-generate 32 radial warp streak angles and lengths
  const streaks = useMemo(() => {
    const list = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 360 + (Math.random() * 6 - 3);
      const dist = 18 + Math.random() * 22; // distance from center %
      const length = 70 + Math.random() * 90; // px
      const thickness = 1.2 + Math.random() * 1.5;
      const hue = Math.random() > 0.4 ? 'cyan' : 'sky';
      list.push({ id: i, angle, dist, length, thickness, hue });
    }
    return list;
  }, []);

  return (
    <div
      id="space-warp-streaks-layer"
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
    >
      {/* Hyperdrive Peripheral Radial Vignette */}
      <motion.div
        style={{ opacity: vignetteOpacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(6,182,212,0.18)_80%,rgba(3,7,24,0.7)_100%)]"
      />

      {/* Radial Laser Streaks */}
      <motion.div
        style={{
          opacity: warpOpacity,
          scale: warpScale,
          willChange: 'transform, opacity',
        }}
        className="absolute inset-0 origin-center"
      >
        {streaks.map((s) => (
          <div
            key={s.id}
            className="absolute top-1/2 left-1/2 origin-left"
            style={{
              transform: `rotate(${s.angle}deg) translate(${s.dist}vw, 0)`,
            }}
          >
            <div
              className={`h-[${s.thickness}px] rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-white shadow-[0_0_8px_#38bdf8]`}
              style={{
                width: `${s.length}px`,
                height: `${s.thickness}px`,
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
