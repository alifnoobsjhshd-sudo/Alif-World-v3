import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
} from 'motion/react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SpaceBackground } from '../components/SpaceBackground';
import { SpaceRocket } from '../components/SpaceRocket';
import { MyWorksSection } from '../components/MyWorksSection';
import { Section } from '../components/Section';
import { SEO } from '../components/SEO';
import { dreamAudio } from '../utils/audio';

const MAX_SPACE_DEPTH = 3200;
const WORKS_SECTION_DEPTH = 2800;

export const ExploreWorksPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(dreamAudio.isMuted);

  // ── Scroll Depth (Driven by wheel & touch, smoothed via physics spring) ──────
  const depthValue = useMotionValue(0);
  const smoothedDepth = useSpring(depthValue, {
    damping: 26,
    stiffness: 85,
    mass: 0.8,
  });

  // Touch scroll references
  const touchStartY = useRef<number | null>(null);

  // Background music lifecycle
  useEffect(() => {
    dreamAudio.startJourneyMusic();
    return () => {
      dreamAudio.stopJourneyMusic(1.5);
    };
  }, []);

  // ── Wheel, Touch & Keyboard Listeners ───────────────────────────────────────
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.max(-100, Math.min(100, e.deltaY));
      const current = depthValue.get();
      const next = Math.max(0, Math.min(MAX_SPACE_DEPTH, current + delta * 5.2));
      depthValue.set(next);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 250;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        depthValue.set(Math.min(MAX_SPACE_DEPTH, depthValue.get() + step));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        depthValue.set(Math.max(0, depthValue.get() - step));
      } else if (e.key === 'Home') {
        e.preventDefault();
        depthValue.set(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        depthValue.set(MAX_SPACE_DEPTH);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const currentY = e.touches[0].clientY;
      const delta = (touchStartY.current - currentY) * 5.0;
      touchStartY.current = currentY;
      const current = depthValue.get();
      depthValue.set(Math.max(0, Math.min(MAX_SPACE_DEPTH, current + delta)));
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [depthValue]);

  const toggleAudio = () => {
    const next = dreamAudio.toggleMute();
    setIsMuted(next);
  };

  // Subtle scroll hint: fades out once user begins scrolling
  const hintOpacity = useTransform(smoothedDepth, [0, 400], [1, 0]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030718] text-white font-display select-none">
      <SEO
        title="Explore Works | Creative Portfolio"
        description="Explore Alif's creations in a clean, elegant cosmic space with the origami paper airplane."
      />

      {/* ── 1. CLEAN & LIGHTWEIGHT SPACE BACKDROP ───────────────────────────── */}
      <SpaceBackground smoothedDepth={smoothedDepth} />

      {/* ── 2. MINIMAL TOP BAR (Return & Audio Toggle) ───────────────────────── */}
      <div className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 pointer-events-none">
        
        {/* Back to Journey */}
        <div className="pointer-events-auto">
          <motion.button
            type="button"
            onClick={() => {
              dreamAudio.playHover();
              navigate('/journey');
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-md border border-slate-700/60 shadow-md text-slate-300 hover:text-white transition-colors text-xs font-mono cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>JOURNEY</span>
          </motion.button>
        </div>

        {/* Audio Mute/Unmute */}
        <div className="pointer-events-auto">
          <motion.button
            type="button"
            onClick={toggleAudio}
            onMouseEnter={() => dreamAudio.playHover()}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-md border border-slate-700/60 shadow-md text-slate-300 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-sky-400" />
            )}
          </motion.button>
        </div>

      </div>

      {/* ── 3. 3D PERSPECTIVE STAGE FOR CONTENT ────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden z-20"
        style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}
      >
        <div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* My Works Section at designated depth */}
          <Section startDepth={WORKS_SECTION_DEPTH} scrollProgress={smoothedDepth}>
            <MyWorksSection />
          </Section>
        </div>
      </div>

      {/* ── 4. 3D ROCKET (THIRD-PERSON REAR CHASE CAM - STATIC) ───────── */}
      <SpaceRocket />

      {/* ── 5. CLEAN MINIMAL SCROLL HINT ───────────────────────────────────── */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="fixed bottom-2 left-0 right-0 z-20 flex flex-col items-center pointer-events-none select-none"
      >
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/40 text-slate-400 text-[11px] font-mono tracking-wider">
          <span>Scroll to explore</span>
          <span className="text-sky-400">↓</span>
        </div>
      </motion.div>

    </div>
  );
};
