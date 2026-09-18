import React from 'react';
import {
  motion,
  useSpring,
  useTransform,
  useMotionTemplate,
  MotionValue,
} from 'motion/react';
import { dreamAudio } from '../utils/audio';

interface PaperAirplaneProps {
  scrollVelocity: MotionValue<number>;
  smoothedDepth:  MotionValue<number>;
}

export const PaperAirplane = React.memo(({ scrollVelocity, smoothedDepth }: PaperAirplaneProps) => {

  // ── Intensity Modulation ──────────────────────────────────────────────────
  // Keep the plane's motion visible at rest, but let a controlled amount of
  // momentum show through while scrolling.
  const rawIntensity = useTransform(scrollVelocity, [-1800, 0, 1800], [0.75, 0, 0.75]);
  const intensity    = useSpring(rawIntensity, { stiffness: 90, damping: 20, mass: 0.8 });

  // ── Movement & Rotation ────────────────────────────────────────────────────
  // Drive the plane from the same alternating depth cycle as the camera.
  // Rotation follows the scene position rather than the sign of the scroll
  // velocity, so reversing direction does not lock it to one bank.
  const swerve = useTransform([smoothedDepth, intensity], ([d, strength]) => {
    const phase = ((d as number) / 2400) * Math.PI;
    const sin   = Math.sin(phase);
    const cos   = Math.cos(phase);

    // Preserve the original horizontal travel while softening the added tilt.
    const x = sin * 90;

    const movement = strength as number;
    const bank  = sin * -12;
    const yaw   = sin * -8;
    const pitch = -12 + cos * 1.8 + movement * 1.2;

    return { x, bank, yaw, pitch };
  });

  // Extract individual motion values for use in the template
  const x     = useTransform(swerve, (s) => s.x);
  const bank  = useTransform(swerve, (s) => s.bank);
  const yaw   = useTransform(swerve, (s) => s.yaw);
  const pitch = useTransform(swerve, (s) => s.pitch);

  const planeTf = useMotionTemplate`perspective(800px) rotateX(${pitch}deg) rotateZ(${bank}deg) rotateY(${yaw}deg)`;

  // ── Shadow visuals ────────────────────────────────────────────────────────
  const shadowOpacity = 0.22;
  const shadowBlurCss = "blur(12px)";
  // Slightly squish the shadow when banking
  const shadowScaleX  = useTransform(bank, [-30, 0, 30], [0.6, 1.0, 0.6]);

  return (
    <motion.div
      className="fixed pointer-events-none select-none"
      style={{
        left:            '50%',
        bottom:          '10%',
        translateX:      '-50%',
        zIndex:          55,
      }}
    >
      {/* ── Scroll-Driven Sway Group ────────────────────────────────────────── */}
      <motion.div
        style={{
          x,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          willChange: 'transform',
        }}
      >
        {/* Plane body — Dynamic 3D rotation based on swerve position */}
        <motion.div
          onClick={() => dreamAudio.playPaperPlaneFlutter()}
          onMouseEnter={() => dreamAudio.playHover()}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="pointer-events-auto cursor-pointer"
          title="Tap to fly!"
          style={{ transform: planeTf, transformOrigin: '50% 50%', willChange: 'transform' }}
        >
          {/* Continuous "float" bobbing animation */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotateX: [0, 1.5, 0],
              rotateZ: [0, 0.8, -0.8, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: '50% 50%', willChange: 'transform' }}
          >
            <AirplaneSVG />
          </motion.div>
        </motion.div>

        {/* Soft shadow below the plane */}
        <motion.div
          animate={{
            opacity: [0.22, 0.16, 0.22],
            scale: [1, 0.92, 1],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position:  'absolute',
            bottom:    '-10px',
            left:      '50%',
            translateX:'-50%',
            width:     '160px',
            height:    '16px',
            background:'radial-gradient(ellipse, rgba(50,60,90,0.32) 0%, transparent 68%)',
            filter:    shadowBlurCss,
            opacity:   shadowOpacity,
            scaleX:    shadowScaleX,
            willChange: 'transform, opacity',
          }}
        />
      </motion.div>
    </motion.div>
  );
});

PaperAirplane.displayName = 'PaperAirplane';

/* ─────────────────────────────────────────────────────────────────────────────
 * Paper airplane SVG - Reduced Size
 * ───────────────────────────────────────────────────────────────────────── */
const AirplaneSVG = React.memo(() => (
  <svg
    width="180"
    height="105"
    viewBox="0 0 500 290"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', overflow: 'visible' }}
  >
    <defs>
      {/* Soft drop shadow applied to the whole group */}
      <filter id="pDs" x="-18%" y="-18%" width="136%" height="136%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#1e2840" floodOpacity="0.22" />
      </filter>

      {/* Left wing gradient — brighter near spine */}
      <linearGradient id="pLw" x1="250" y1="130" x2="10" y2="195" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#edf2f8" />
        <stop offset="55%"  stopColor="#dde2ec" />
        <stop offset="100%" stopColor="#d0d6e2" />
      </linearGradient>

      {/* Right wing gradient — slightly darker */}
      <linearGradient id="pRw" x1="250" y1="130" x2="490" y2="195" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#e4e9f4" />
        <stop offset="55%"  stopColor="#ced4e0" />
        <stop offset="100%" stopColor="#c0c6d4" />
      </linearGradient>

      {/* Left fold wall — clearly dark */}
      <linearGradient id="pLf" x1="228" y1="16" x2="208" y2="282" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#7a7f8c" />
        <stop offset="100%" stopColor="#525660" />
      </linearGradient>

      {/* Right fold wall — darkest */}
      <linearGradient id="pRf" x1="272" y1="16" x2="292" y2="282" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#6a6f7c" />
        <stop offset="100%" stopColor="#464a54" />
      </linearGradient>

      {/* Spine — white fading to translucent at tail */}
      <linearGradient id="pSp" x1="250" y1="16" x2="250" y2="282" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="white" stopOpacity="1"    />
        <stop offset="70%"  stopColor="white" stopOpacity="0.90" />
        <stop offset="100%" stopColor="white" stopOpacity="0.44" />
      </linearGradient>

      {/* Wing-tip highlight sheen */}
      <linearGradient id="pSh" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="white" stopOpacity="0.38" />
        <stop offset="100%" stopColor="white" stopOpacity="0"    />
      </linearGradient>
    </defs>

    <g filter="url(#pDs)">

      {/* ── LEFT WING ─────────────────────────────────────────────────────── */}
      <path
        d="M 250,16 L 8,192 L 168,280 L 208,280 Z"
        fill="url(#pLw)"
        stroke="#bec4d0"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Leading-edge sheen */}
      <path
        d="M 250,16 L 8,192"
        stroke="#e8edf6"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* ── RIGHT WING ────────────────────────────────────────────────────── */}
      <path
        d="M 250,16 L 292,280 L 332,280 L 492,192 Z"
        fill="url(#pRw)"
        stroke="#b0b6c4"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M 250,16 L 492,192"
        stroke="#c8cedc"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.74"
      />

      {/* ── LEFT FOLD WALL ────────────────────────────────────────────────── */}
      <path d="M 250,16 L 208,280 L 250,280 Z" fill="url(#pLf)" />

      {/* ── RIGHT FOLD WALL ───────────────────────────────────────────────── */}
      <path d="M 250,16 L 250,280 L 292,280 Z" fill="url(#pRf)" />

      {/* ── CREASE LINES ──────────────────────────────────────────────────── */}
      <line x1="250" y1="16" x2="208" y2="280" stroke="#9ca4b4" strokeWidth="1.4" strokeLinecap="round" opacity="0.72" />
      <line x1="250" y1="16" x2="292" y2="280" stroke="#8c94a4" strokeWidth="1.4" strokeLinecap="round" opacity="0.62" />

      {/* ── TRAILING EDGE ─────────────────────────────────────────────────── */}
      <path
        d="M 8,192 L 168,280 L 332,280 L 492,192"
        stroke="#9ea4b4"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.50"
      />

      {/* ── INNER WING CREASE TEXTURE ─────────────────────────────────────── */}
      <line x1="110" y1="164" x2="236" y2="60"  stroke="#c0c6d4" strokeWidth="1.1" opacity="0.50" />
      <line x1="62"  y1="178" x2="232" y2="114" stroke="#c0c6d4" strokeWidth="0.8" opacity="0.34" />
      <line x1="390" y1="164" x2="264" y2="60"  stroke="#a8aeb8" strokeWidth="1.1" opacity="0.44" />
      <line x1="438" y1="178" x2="268" y2="114" stroke="#a8aeb8" strokeWidth="0.8" opacity="0.28" />

      {/* ── SPINE RIDGE ───────────────────────────────────────────────────── */}
      <line
        x1="250" y1="16" x2="250" y2="280"
        stroke="url(#pSp)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* ── NOSE TIP GLINT ────────────────────────────────────────────────── */}
      <circle cx="250" cy="16" r="5" fill="white" opacity="0.98" />
      <circle cx="250" cy="16" r="2" fill="white" opacity="1" />
    </g>
  </svg>
));
AirplaneSVG.displayName = 'AirplaneSVG';
