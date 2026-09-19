import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useVelocity,
  animate,
} from 'motion/react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SpaceBackground } from '../components/SpaceBackground';
import { SpaceRocket } from '../components/SpaceRocket';
import { SpaceLoadingScreen } from '../components/SpaceLoadingScreen';
import { SpaceWarpStreaks } from '../components/SpaceWarpStreaks';
import { SpaceAvionicsHUD, SpaceWaypoint } from '../components/SpaceAvionicsHUD';
import { KenoStoreSection } from '../components/space-projects/KenoStoreSection';
import { CosSection } from '../components/space-projects/CosSection';
import { CosmicTiersSection } from '../components/space-projects/CosmicTiersSection';
import { OtherWebsitesSection } from '../components/space-projects/OtherWebsitesSection';
import { Section } from '../components/Section';
import { SEO } from '../components/SEO';
import { dreamAudio } from '../utils/audio';

const MAX_SPACE_DEPTH = 11800;
const KENO_STORE_DEPTH = 2200;
const COS_DEPTH = 5000;
const COSMIC_TIERS_DEPTH = 7800;
const OTHER_WEBSITES_DEPTH = 10600;

const SPACE_WAYPOINTS: SpaceWaypoint[] = [
  { id: 'keno', name: 'Keno Store', shortName: '1. KENO', depth: KENO_STORE_DEPTH },
  { id: 'cos', name: 'Cos Bot', shortName: '2. COS', depth: COS_DEPTH },
  { id: 'cosmic', name: 'CosmicTiers', shortName: '3. COSMIC', depth: COSMIC_TIERS_DEPTH },
  { id: 'other', name: 'Web Archive', shortName: '4. WEB ARCHIVE', depth: OTHER_WEBSITES_DEPTH },
];

interface SpaceRipple {
  id: number;
  x: number;
  y: number;
}

export const ExploreWorksPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(dreamAudio.isMuted);
  const [ripples, setRipples] = useState<SpaceRipple[]>([]);

  // ── Scroll Depth (Driven by wheel & touch, smoothed via physics spring) ──────
  const depthValue = useMotionValue(0);
  const smoothedDepth = useSpring(depthValue, {
    damping: 26,
    stiffness: 85,
    mass: 0.8,
  });
  const scrollVelocity = useVelocity(smoothedDepth);

  // Touch scroll references
  const touchStartY = useRef<number | null>(null);

  // ── Automatic Cosmic Theme Audio (Plays automatically regardless of scroll) ──
  useEffect(() => {
    // Start deep ethereal space ambient soundscape immediately
    dreamAudio.startSpaceAmbientMusic();

    // Auto-resume audio context on user's first touch/gesture if browser autoplay was suspended
    const unlockAudio = () => {
      dreamAudio.startSpaceAmbientMusic();
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });
    window.addEventListener('wheel', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('wheel', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      dreamAudio.stopSpaceAmbientMusic(1.5);
    };
  }, []);

  // ── Dynamic Rocket Thrusters Sound & Sector Waypoint Audio ──────────────────
  useEffect(() => {
    let lastThrustTime = 0;
    const unsubVel = scrollVelocity.on('change', (v) => {
      const now = Date.now();
      if (Math.abs(v) > 28 && now - lastThrustTime > 200) {
        lastThrustTime = now;
        dreamAudio.playRocketFireblast(Math.min(2.0, Math.abs(v) / 70));
      }
    });

    const passedSectors = new Set<string>();
    const unsubDepth = smoothedDepth.on('change', (d) => {
      SPACE_WAYPOINTS.forEach((wp) => {
        if (Math.abs(d - wp.depth) < 140) {
          if (!passedSectors.has(wp.id)) {
            passedSectors.add(wp.id);
            dreamAudio.playSpaceSectorPing();
          }
        } else if (Math.abs(d - wp.depth) > 350) {
          passedSectors.delete(wp.id);
        }
      });
    });

    return () => {
      unsubVel();
      unsubDepth();
    };
  }, [scrollVelocity, smoothedDepth]);

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
      } else if (e.key === 'Home' || e.key === '0') {
        e.preventDefault();
        handleWarpJump(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        depthValue.set(MAX_SPACE_DEPTH);
      } else if (e.key === '1') {
        handleWarpJump(KENO_STORE_DEPTH);
      } else if (e.key === '2') {
        handleWarpJump(COS_DEPTH);
      } else if (e.key === '3') {
        handleWarpJump(COSMIC_TIERS_DEPTH);
      } else if (e.key === '4') {
        handleWarpJump(OTHER_WEBSITES_DEPTH);
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        handleBack();
      } else if (e.key.toLowerCase() === 'w' || e.key.toLowerCase() === 'j') {
        // Find next waypoint ahead of current depth
        const cur = depthValue.get();
        const nextWp = SPACE_WAYPOINTS.find((wp) => wp.depth > cur + 100);
        if (nextWp) {
          handleWarpJump(nextWp.depth);
        } else {
          handleWarpJump(0);
        }
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

  // ── Bulletproof Navigation Handlers ─────────────────────────────────────────
  const handleBack = () => {
    dreamAudio.playHover();
    dreamAudio.stopSpaceAmbientMusic(0.8);
    // If the browser session contains earlier history in this app, go back.
    // Otherwise (e.g. page refreshed, direct URL access, or iframe root), smoothly fallback to /journey
    if (window.history.state && typeof window.history.state.idx === 'number' && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/journey');
    }
  };

  const handleGoEarth = () => {
    dreamAudio.playHover();
    dreamAudio.stopSpaceAmbientMusic(0.8);
    navigate('/');
  };

  // ── Interactive Hyperdrive Warp Jump ────────────────────────────────────────
  const handleWarpJump = (target: number) => {
    dreamAudio.playWarpJumpSound();
    animate(depthValue, target, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
    });
  };

  // ── Interactive Gravitational Wave Ripple on Space Canvas Click ─────────────
  const handleSpaceClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input')) return;
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
    dreamAudio.playGravitationalPulse();
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 900);
  };

  return (
    <div
      onClick={handleSpaceClick}
      className="relative w-screen h-screen overflow-hidden bg-[#030718] text-white font-display select-none cursor-crosshair"
    >
      <SEO
        title="Explore Works | Creative Portfolio"
        description="Explore Alif's creations in a clean, elegant cosmic space with the origami paper airplane."
      />

      {/* ── 0. COSMIC LOADING SCREEN TRANSITION ───────────────────────────── */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <SpaceLoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* ── 1. CINEMATIC SPACE BACKDROP ───────────────────────────────────── */}
      <SpaceBackground smoothedDepth={smoothedDepth} />

      {/* ── 2. HYPERDRIVE WARP SPEED STREAKS (DYNAMICS ON SCROLL) ─────────── */}
      <SpaceWarpStreaks scrollVelocity={scrollVelocity} />

      {/* ── 3. INTERACTIVE GRAVITATIONAL WAVE RIPPLES ──────────────────────── */}
      {ripples.map((rip) => (
        <div
          key={rip.id}
          className="fixed pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ left: rip.x, top: rip.y }}
        >
          <motion.div
            initial={{ scale: 0.1, opacity: 0.8 }}
            animate={{ scale: 3.2, opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="w-24 h-24 rounded-full border border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.7)]"
          />
          <motion.div
            initial={{ scale: 0.1, opacity: 0.5 }}
            animate={{ scale: 2.0, opacity: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: 'easeOut' }}
            className="absolute inset-0 w-24 h-24 rounded-full border border-indigo-400"
          />
        </div>
      ))}

      {/* ── 4. AEROSPACE AVIONICS HUD ─────────────────────────────────────── */}
      <SpaceAvionicsHUD
        depthValue={depthValue}
        smoothedDepth={smoothedDepth}
        scrollVelocity={scrollVelocity}
        maxDepth={MAX_SPACE_DEPTH}
        waypoints={SPACE_WAYPOINTS}
        onWarpJump={handleWarpJump}
      />

      {/* ── 5. TOP CONTROLS (BACK & AUDIO TOGGLE) ─────────────────────────── */}
      <div className="fixed top-4 left-4 sm:left-6 right-4 sm:right-6 z-50 flex items-center justify-between pointer-events-none">
        {/* Back Button */}
        <div className="pointer-events-auto">
          <motion.button
            type="button"
            onClick={handleBack}
            onMouseEnter={() => dreamAudio.playHover()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md border border-slate-700/80 hover:border-cyan-500/50 shadow-lg text-slate-200 hover:text-white transition-all text-xs font-mono cursor-pointer"
            title="Return to journey page"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span className="tracking-wider">BACK</span>
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
            className="w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md border border-slate-700/80 hover:border-cyan-500/50 shadow-lg text-slate-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
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

      {/* ── 6. 3D PERSPECTIVE STAGE FOR CONTENT ────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden z-20"
        style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}
      >
        <div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Sector 1: Keno Store */}
          <Section startDepth={KENO_STORE_DEPTH} scrollProgress={smoothedDepth}>
            <KenoStoreSection />
          </Section>

          {/* Sector 2: Cos Discord Bot */}
          <Section startDepth={COS_DEPTH} scrollProgress={smoothedDepth}>
            <CosSection />
          </Section>

          {/* Sector 3: CosmicTiers Minecraft Tier List */}
          <Section startDepth={COSMIC_TIERS_DEPTH} scrollProgress={smoothedDepth}>
            <CosmicTiersSection />
          </Section>

          {/* Sector 4: Web Creations & Landings Archive */}
          <Section startDepth={OTHER_WEBSITES_DEPTH} scrollProgress={smoothedDepth}>
            <OtherWebsitesSection />
          </Section>
        </div>
      </div>

      {/* ── 7. 3D ROCKET (THIRD-PERSON CHASE CAM WITH PILOT STEERING) ───────── */}
      <SpaceRocket scrollVelocity={scrollVelocity} />

    </div>
  );
};
