import React from 'react';
import { motion, useTransform, MotionValue } from 'motion/react';

interface SectionProps {
  children: React.ReactNode;
  startDepth: number;
  scrollProgress: MotionValue<number>;
}

export const Section = React.memo(({
  children,
  startDepth,
  scrollProgress,
}: SectionProps) => {
  // Linear continuous depth calculation with zero wrap jumps
  const relativeDepth = useTransform(scrollProgress, (val: number) => {
    return startDepth - val;
  });

  // Smooth perspective depth and scale curves
  const z = useTransform(relativeDepth, [-1200, 0, 2400], [360, 0, -2000]);
  const scale = useTransform(relativeDepth, [-1200, 0, 2400], [1.06, 1, 0.32]);

  // High-clarity opacity curve
  const opacity = useTransform(
    relativeDepth,
    [-900, -500, -180, 0, 180, 700, 1200],
    [0, 0.3, 0.96, 1, 0.96, 0.35, 0]
  );

  // Enable interaction only when scene is in foreground focus
  const pointerEvents = useTransform(relativeDepth, (val) => {
    return Math.abs(val) < 600 ? 'auto' : 'none';
  });

  // Occlusion culling: completely skip off-screen rendering when far away
  const visibility = useTransform(relativeDepth, (val) => {
    return (val < -1000 || val > 1300) ? 'hidden' : 'visible';
  });

  return (
    <motion.div
      style={{
        z,
        opacity,
        scale,
        visibility,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transformStyle: 'flat',
        willChange: 'transform, opacity',
      }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-8 pb-20 sm:pb-28 pointer-events-none"
    >
      <motion.div 
        style={{ pointerEvents }}
        className="w-full flex justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
});

Section.displayName = 'Section';
