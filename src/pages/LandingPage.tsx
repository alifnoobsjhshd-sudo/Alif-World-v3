import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FolderGit2, Play, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { dreamAudio } from '../utils/audio';
import { CartoonCloudTransition } from '../components/CartoonCloudTransition';
import { RocketLaunchTransition } from '../components/RocketLaunchTransition';

const BG_IMAGE_LOCAL = '/landing-bg.jpg';
const BG_IMAGE_REMOTE = 'https://i.ibb.co.com/Ngq3QDJq/f68fa32b-432b-4159-adc7-91e0d9f0243e-1.jpg';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [bgSrc, setBgSrc] = useState(BG_IMAGE_LOCAL);
  const [isZooming, setIsZooming] = useState(false);
  const [isRocketLaunching, setIsRocketLaunching] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHoveringStory, setIsHoveringStory] = useState(false);

  // Interactive Touch & Mouse Ripple State (Circle outline effect)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Motion values keep parallax updates off the React render path.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      mouseX.set(x * 0.4);
      mouseY.set(y * 0.4);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Start gentle sleeping sounds on landing page (boy asleep at study desk)
  useEffect(() => {
    dreamAudio.startSleepingSounds();

    const handleFirstTouch = () => {
      dreamAudio.startSleepingSounds();
      window.removeEventListener('pointerdown', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('keydown', handleFirstTouch);
    };

    window.addEventListener('pointerdown', handleFirstTouch);
    window.addEventListener('touchstart', handleFirstTouch);
    window.addEventListener('click', handleFirstTouch);
    window.addEventListener('keydown', handleFirstTouch);

    return () => {
      window.removeEventListener('pointerdown', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('keydown', handleFirstTouch);
      dreamAudio.stopSleepingSounds(0.8);
    };
  }, []);

  const handleStartStory = () => {
    if (isZooming) return;
    setIsZooming(true);
    // Smoothly fade sleeping sounds and play epic sky & cloud whoosh
    dreamAudio.stopSleepingSounds(1.2);
    dreamAudio.playDreamZoom();
    // Start continuous cinematic journey soundtrack early during the dream dive
    dreamAudio.startJourneyMusic();
    dreamAudio.setStoryScene(0);

    // Cinematic sequence: UI disappears immediately -> slow, serene zoom into dream bubble -> clouds billow -> navigate to journey
    setTimeout(() => {
      navigate('/journey');
    }, 4000);
  };

  const handleProjectsClick = () => {
    if (isRocketLaunching || isZooming) return;
    dreamAudio.stopSleepingSounds(0.6);
    setIsRocketLaunching(true);
  };

  const toggleAudio = () => {
    const next = dreamAudio.toggleMute();
    setIsMuted(next);
    if (!next) dreamAudio.playPop();
  };

  // ── Touch & Mouse Interactive Dream Ripple (Circle outline with sound) ─────
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only accept primary left mouse click or touch events
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    // Do not trigger background ripple when clicking action buttons
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input')) {
      return;
    }
    if (isZooming || isRocketLaunching) return;

    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
    dreamAudio.playDreamRipple();

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 950);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      className="relative w-screen h-screen overflow-hidden select-none bg-[#b8b0b5] flex items-center justify-center cursor-default"
    >
      <SEO
        title="Alif's World | The Dream & Sky Story"
        description="Step into the animated world of Alif, where curiosity and code take flight from a daydream at the study desk into an unforgettable interactive sky journey."
      />

      {/* ── AMBIENT BLURRED BACKDROP (Fits all device ratios seamlessly) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src={bgSrc}
          onError={() => setBgSrc(BG_IMAGE_REMOTE)}
          alt="Room Atmosphere"
          className="w-full h-full object-cover scale-125 blur-3xl opacity-75 transform-gpu"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/15 via-transparent to-amber-950/20" />
      </div>

      {/* ── CINEMATIC ZOOM CONTAINER (Slowly zooms directly into the character dream bubble) ── */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center overflow-hidden z-10 transform-gpu will-change-transform"
        style={{
          transformOrigin: '50% 24%', // Focused precisely on the character's dream bubble
          x: mouseX,
          y: mouseY,
        }}
        animate={
          isZooming
            ? {
                scale: [1, 1.25, 3.8, 12],
                filter: ['blur(0px)', 'blur(0px)', 'blur(0.5px)', 'blur(2px)'],
                transition: {
                  duration: 4.0,
                  ease: [0.28, 0, 0.2, 1], // Slow, graceful, cinematic camera push into deep dream dive
                  times: [0, 0.4, 0.75, 1],
                },
              }
            : {
                scale: 1,
                transition: { ease: 'easeOut', duration: 0.3 },
              }
        }
      >
        {/* ── MAIN SHARP ROOM ILLUSTRATION (Guy in nap on study table) ── */}
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.img
            src={bgSrc}
            onError={() => setBgSrc(BG_IMAGE_REMOTE)}
            alt="Guy taking a nap on study table"
            className="w-full h-full object-cover object-[50%_52%] sm:object-center select-none pointer-events-none"
            animate={{
              scale: [1, 1.008, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* ── WARM AMBIENT DESK LAMP LIGHT PULSE ── */}
          <motion.div
            className="absolute top-[35%] right-[25%] sm:right-[32%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-amber-300/20 blur-3xl pointer-events-none"
            animate={{
              opacity: [0.25, 0.45, 0.25],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* ── FLOATING SUNBEAMS & DUST MOTES (Living Room Atmosphere) ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                style={{
                  width: (i % 3) + 2.5,
                  height: (i % 3) + 2.5,
                  top: `${15 + (i * 5.5) % 65}%`,
                  left: `${10 + (i * 6.8) % 80}%`,
                }}
                animate={{
                  y: [-12, 12, -12],
                  x: [-8, 8, -8],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 4 + (i % 4),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.35,
                }}
              />
            ))}
          </div>

          {/* ── CARTOON "Zzz..." SLEEP PARTICLES RISING FROM SLEEPING GUY ── */}
          <div className="absolute left-[48%] sm:left-[51%] top-[48%] sm:top-[47%] pointer-events-none z-20">
            {[
              { text: 'Z', size: 'text-2xl sm:text-3xl', delay: 0, x: [0, 8, -4] },
              { text: 'z', size: 'text-lg sm:text-xl', delay: 1.1, x: [0, -6, 6] },
              { text: 'z', size: 'text-sm sm:text-base', delay: 2.2, x: [0, 6, -6] },
            ].map((z, idx) => (
              <motion.span
                key={idx}
                className={`absolute font-display font-black text-sky-200/90 drop-shadow-[0_2px_4px_rgba(15,23,42,0.4)] ${z.size}`}
                animate={{
                  y: [0, -45, -90],
                  x: z.x,
                  opacity: [0, 0.9, 0],
                  scale: [0.6, 1.1, 0.8],
                  rotate: [-8, 8, -8],
                }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: z.delay,
                }}
              >
                {z.text}
              </motion.span>
            ))}
          </div>

          {/* ── TRAILING DREAM BUBBLES FROM CHARACTER'S HEAD TO MAIN DREAM ── */}
          <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
            {/* Tiny Bubble 1 (Near guy's head) */}
            <motion.div
              className="absolute left-[49%] sm:left-[50%] top-[47%] sm:top-[46%] w-3.5 h-3.5 rounded-full bg-white/70 border border-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
              animate={{
                y: [-3, 3, -3],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Bubble 2 (Mid-air) */}
            <motion.div
              className="absolute left-[50.5%] sm:left-[51%] top-[41%] sm:top-[40%] w-6 h-6 rounded-full bg-white/75 border-2 border-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
              animate={{
                y: [-5, 5, -5],
                scale: [0.95, 1.1, 0.95],
                x: [-2, 2, -2],
              }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 left-1.5 opacity-80" />
            </motion.div>

            {/* Bubble 3 (Just below the big cloud) */}
            <motion.div
              className="absolute left-[51.5%] sm:left-[51.8%] top-[34%] sm:top-[33%] w-9 h-9 rounded-full bg-white/85 border-2 border-sky-200 shadow-[0_0_16px_rgba(56,189,248,0.7)]"
              animate={{
                y: [-6, 6, -6],
                scale: [0.98, 1.06, 0.98],
                x: [2, -2, 2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-white absolute top-1.5 left-2 opacity-90" />
            </motion.div>

            {/* ── MAIN VIBRANT DREAM BUBBLE (Pure Sky & Flying Paper Airplane Only) ── */}
            <div className="absolute left-1/2 top-[24%] sm:top-[22%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div
                className="relative w-[270px] xs:w-[310px] sm:w-[380px] md:w-[440px] h-[170px] xs:h-[190px] sm:h-[230px] md:h-[260px] cursor-pointer pointer-events-auto"
                onClick={handleStartStory}
                onMouseEnter={() => {
                  setIsHoveringStory(true);
                  dreamAudio.playHover();
                }}
                onMouseLeave={() => setIsHoveringStory(false)}
                animate={{
                  y: isHoveringStory ? [-8, 0, -8] : [-5, 5, -5],
                  rotate: isHoveringStory ? [-1, 1, -1] : [-1.2, 1.2, -1.2],
                  scale: isHoveringStory ? 1.04 : 1,
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Dream Cloud Bubble Body with Cartoon Glass & Glow */}
                <div className="relative w-full h-full rounded-[48px] sm:rounded-[60px] p-3 sm:p-4 bg-gradient-to-br from-sky-400/90 via-sky-300/85 to-indigo-300/90 backdrop-blur-md border-4 border-white shadow-[0_15px_45px_rgba(14,165,233,0.45),0_0_25px_rgba(255,255,255,0.7)] overflow-hidden flex flex-col justify-center items-center group">
                  
                  {/* Glossy top light highlight */}
                  <div className="absolute top-2 left-6 right-6 h-5 rounded-full bg-white/45 blur-[1px] pointer-events-none z-20" />

                  {/* Animated Dream Sky Background Inside Bubble */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#38bdf8] via-[#7dd3fc] to-[#e0f2fe] opacity-95 pointer-events-none" />

                  {/* Drifting Cartoon Fluffy Clouds inside dream */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-85"
                    animate={{ x: [-25, 25, -25] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="absolute top-4 left-6 w-20 h-10 rounded-full bg-white/95 shadow-sm" />
                    <div className="absolute top-2 left-12 w-14 h-12 rounded-full bg-white/95" />
                    <div className="absolute bottom-6 right-8 w-24 h-12 rounded-full bg-white/95 shadow-sm" />
                    <div className="absolute bottom-10 right-14 w-16 h-14 rounded-full bg-white/95" />
                    <div className="absolute top-1/2 left-10 w-16 h-8 rounded-full bg-white/80" />
                  </motion.div>

                  {/* ── FLYING ORIGAMI PAPER AIRPLANE (Pure Hero Animation) ── */}
                  <div className="relative w-full h-full flex items-center justify-center z-10 pointer-events-none">
                    {/* Dashed wind flight trail behind the plane */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60 overflow-visible" viewBox="0 0 300 200">
                      <motion.path
                        d="M 40 130 Q 110 50 160 110 T 260 80"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                        animate={{ strokeDashoffset: [0, -48] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    </svg>

                    {/* The Cartoon Paper Airplane */}
                    <motion.div
                      className="absolute z-10"
                      animate={{
                        x: [-45, 55, 15, -35, -45],
                        y: [12, -22, 18, -10, 12],
                        rotate: [8, 22, -12, 10, 8],
                        scale: [0.95, 1.15, 0.92, 1.08, 0.95],
                      }}
                      transition={{
                        duration: 6.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <svg width="68" height="42" viewBox="0 0 56 36" fill="none" className="drop-shadow-lg">
                        {/* Upper wing fold */}
                        <path d="M54 16 L4 2 L18 16 Z" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.2" />
                        {/* Lower wing fold */}
                        <path d="M54 16 L18 16 L4 30 Z" fill="#f0f9ff" stroke="#60a5fa" strokeWidth="1.2" />
                        {/* Bottom keel */}
                        <path d="M18 16 L22 30 L4 30 Z" fill="#38bdf8" opacity="0.85" />
                        {/* Center spine crease */}
                        <line x1="54" y1="16" x2="18" y2="16" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Bubble Click Ring Highlight on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-[48px] sm:rounded-[60px] border-4 border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── INTERACTIVE TOUCH & MOUSE DREAM RIPPLES (Circle Outlines) ────────── */}
      {ripples.map((rip) => (
        <div
          key={rip.id}
          className="fixed pointer-events-none z-35 -translate-x-1/2 -translate-y-1/2"
          style={{ left: rip.x, top: rip.y }}
        >
          {/* Central quick soft flash glint */}
          <motion.div
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_12px_#38bdf8]"
          />

          {/* Primary dream sky circle outline ring */}
          <motion.div
            initial={{ scale: 0.12, opacity: 0.95 }}
            animate={{ scale: 3.2, opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.7),inset_0_0_10px_rgba(255,255,255,0.7)]"
          />

          {/* Secondary warm golden dashed outline ring with gentle spin */}
          <motion.div
            initial={{ scale: 0.12, opacity: 0.85, rotate: 0 }}
            animate={{ scale: 2.2, opacity: 0, rotate: 55 }}
            transition={{ duration: 0.75, delay: 0.05, ease: 'easeOut' }}
            className="absolute inset-0 w-20 sm:w-24 h-20 sm:h-24 rounded-full border-2 border-dashed border-amber-300"
          />

          {/* 4 delicate dream sparklets radiating outward */}
          {[
            { x: 0, y: -36, delay: 0 },
            { x: 36, y: 0, delay: 0.03 },
            { x: 0, y: 36, delay: 0.06 },
            { x: -36, y: 0, delay: 0.09 },
          ].map((sp, idx) => (
            <motion.div
              key={idx}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0.9 }}
              animate={{ x: sp.x, y: sp.y, scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.65, delay: sp.delay, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_6px_#fde047]"
            />
          ))}
        </div>
      ))}

      {/* ── CARTOON CLOUD TRANSITION (Billows out when "Let's Watch a Story" is clicked) ── */}
      <CartoonCloudTransition isActive={isZooming} />

      {/* ── ROCKET LAUNCH TRANSITION (Blasts off into deep space when "My Projects" is clicked) ── */}
      <RocketLaunchTransition
        isActive={isRocketLaunching}
        onComplete={() => navigate('/explore-works')}
      />

      {/* ── TOP RIGHT AUDIO MUTE BUTTON (Clean, responsive across all screen ratios) ── */}
      <motion.div
        className="fixed top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] sm:top-5 sm:right-5 md:top-6 md:right-6 z-40"
        animate={isZooming || isRocketLaunching ? { opacity: 0, pointerEvents: 'none' } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.button
          onClick={toggleAudio}
          onMouseEnter={() => dreamAudio.playHover()}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-slate-200/90 shadow-md text-slate-700 hover:text-slate-900 transition-all pointer-events-auto flex items-center justify-center cursor-pointer active:scale-95"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 animate-pulse" />
          )}
        </motion.button>
      </motion.div>

      {/* ── BOTTOM CARTOON BUTTONS (Immediately vanish when clicking "Let's Watch a Story" or "My Projects") ── */}
      <motion.div
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:bottom-8 md:bottom-10 left-0 right-0 flex flex-col items-center justify-center gap-3 sm:gap-3.5 z-30 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={
          isZooming || isRocketLaunching
            ? { opacity: 0, y: 35, scale: 0.95, pointerEvents: 'none', transition: { duration: 0.2 } }
            : { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto', transition: { duration: 0.5, delay: 0.1 } }
        }
      >
        {/* BUTTON 1: "Let's Watch a Story" (Green, Cartoon Styled, Rounded) */}
        <motion.button
          onClick={handleStartStory}
          onMouseEnter={() => {
            setIsHoveringStory(true);
            dreamAudio.playHover();
          }}
          onMouseLeave={() => setIsHoveringStory(false)}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96, y: 2 }}
          className="relative group w-68 sm:w-76 md:w-84 py-3.5 sm:py-4 px-6 rounded-2xl sm:rounded-3xl bg-[#22c55e] hover:bg-[#16a34a] active:bg-[#15803d] text-white font-display font-black text-base sm:text-lg tracking-wide uppercase shadow-[0_8px_0_#15803d,0_15px_25px_rgba(34,197,94,0.35)] active:shadow-[0_2px_0_#15803d,0_5px_12px_rgba(34,197,94,0.35)] transition-all flex items-center justify-center gap-3 border-2 border-[#4ade80]/60 overflow-hidden cursor-pointer"
        >
          {/* Top subtle highlight glint for cartoon depth */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20 rounded-t-2xl sm:rounded-t-3xl pointer-events-none" />

          <Play className="w-5 h-5 fill-current text-white shrink-0 group-hover:scale-110 transition-transform" />
          <span className="drop-shadow-sm whitespace-nowrap">Let's Watch a Story</span>
          <Sparkles className="w-4 h-4 text-yellow-200 shrink-0 animate-pulse" />
        </motion.button>

        {/* BUTTON 2: "My Projects" (Blue, Below Button 1, Same Weight, Cartoon Styled, Rounded) */}
        <motion.button
          onClick={handleProjectsClick}
          onMouseEnter={() => dreamAudio.playHover()}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96, y: 2 }}
          className="relative group w-68 sm:w-76 md:w-84 py-3.5 sm:py-4 px-6 rounded-2xl sm:rounded-3xl bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-display font-black text-base sm:text-lg tracking-wide uppercase shadow-[0_8px_0_#1e40af,0_15px_25px_rgba(37,99,235,0.35)] active:shadow-[0_2px_0_#1e40af,0_5px_12px_rgba(37,99,235,0.35)] transition-all flex items-center justify-center gap-3 border-2 border-[#60a5fa]/60 overflow-hidden cursor-pointer"
        >
          {/* Top subtle highlight glint for cartoon depth */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20 rounded-t-2xl sm:rounded-t-3xl pointer-events-none" />

          <FolderGit2 className="w-5 h-5 text-white shrink-0 group-hover:scale-110 transition-transform" />
          <span className="drop-shadow-sm whitespace-nowrap">My Projects</span>
          <ArrowRight className="w-4 h-4 text-blue-200 shrink-0 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
};

