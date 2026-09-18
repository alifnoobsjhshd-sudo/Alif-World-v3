import React, { useMemo } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

interface SpaceBackgroundProps {
  smoothedDepth: MotionValue<number>;
}

export const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ smoothedDepth }) => {
  // Gentle parallax drift tied to scroll depth
  const starsParallaxY = useTransform(smoothedDepth, (d: number) => (d * 0.04) % 600);
  const nebulaParallaxY = useTransform(smoothedDepth, (d: number) => (d * 0.02) % 400);

  // Deterministic clean starfield (single batch rendered as a lightweight SVG, no heavy DOM tree)
  const stars = useMemo(() => {
    const list = [];
    for (let i = 0; i < 70; i++) {
      list.push({
        x: ((i * 37.3 + 11) % 98) + 1,
        y: ((i * 53.7 + 17) % 96) + 2,
        r: i % 7 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1,
        opacity: 0.35 + ((i % 5) * 0.15),
      });
    }
    return list;
  }, []);

  return (
    <div
      id="clean-space-background"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#030718]"
    >
      {/* ── 1. Serene Midnight Space Gradient ──────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0a1232_0%,_#04081c_50%,_#02040f_100%)]" />

      {/* ── 2. Subtle Soft Ambient Nebula Light (Lightweight blurred tints) ── */}
      <motion.div className="absolute inset-0" style={{ y: nebulaParallaxY }}>
        <div className="absolute top-[10%] right-[15%] w-[420px] h-[420px] rounded-full bg-indigo-600/10 blur-[100px]" />
        <div className="absolute top-[40%] left-[10%] w-[380px] h-[380px] rounded-full bg-cyan-600/10 blur-[90px]" />
      </motion.div>

      {/* ── 3. Single Minimal Distant Celestial Glow ────────────────────────── */}
      <div className="absolute top-[15%] right-[18%] w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-900/40 via-purple-600/20 to-sky-400/20 border border-indigo-400/20 shadow-[0_0_30px_rgba(99,102,241,0.15)] opacity-60" />

      {/* ── 4. Lightweight Starfield (Single SVG canvas, zero JS loops) ─────── */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        style={{ y: starsParallaxY }}
      >
        {stars.map((star, i) => (
          <circle
            key={i}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.r}
            fill="#ffffff"
            opacity={star.opacity}
          />
        ))}
      </motion.svg>

      {/* ── 5. Ambient Vignette Overlay ─────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(2,4,15,0.7)_100%)]" />
    </div>
  );
};
