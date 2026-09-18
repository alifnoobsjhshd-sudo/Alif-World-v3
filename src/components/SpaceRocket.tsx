import React from 'react';

export const SpaceRocket: React.FC = () => {
  return (
    <div
      id="space-rocket-static"
      className="fixed bottom-7 sm:bottom-9 left-1/2 -translate-x-1/2 pointer-events-none z-30 select-none flex flex-col items-center"
      style={{
        perspective: '750px',
        perspectiveOrigin: '50% 80%', // Third-person chase camera looking from behind and slightly above
      }}
    >
      {/* ── 3D ROCKET CHASE RIG (COMPLETELY STATIC: NO MOVEMENT, NO VIBRATION, NO MOUSE/TOUCH RESPONSIVENESS) ── */}
      <div
        className="relative flex flex-col items-center pointer-events-none"
        style={{
          transform: 'rotateX(60deg) rotateY(0deg) rotateZ(0deg)', // Fixed clean forward flight angle
          transformStyle: 'preserve-3d',
          transformOrigin: '50% 60%',
        }}
      >
        {/* ── COMPACT 3D AEROSPACE AIRFRAME (~70px × ~94px) ─────────────────── */}
        <div
          className="relative w-[70px] h-[94px] flex flex-col items-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 1. DORSAL UPPER HULL (Tapered arrowhead pointing forward into space) */}
          <div
            className="absolute inset-0 flex flex-col items-center"
            style={{
              transform: 'translateZ(10px)',
              backfaceVisibility: 'visible',
            }}
          >
            <svg
              viewBox="0 0 70 94"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]"
            >
              <defs>
                {/* Matte Pearl White Body Gradient */}
                <linearGradient id="chaseHullGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="22%" stopColor="#cbd5e1" />
                  <stop offset="50%" stopColor="#f8fafc" />
                  <stop offset="78%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>

                {/* Electric Cyan Spine Accent */}
                <linearGradient id="chaseCyanSpine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>

                {/* Forward Cockpit Canopy */}
                <linearGradient id="chaseCanopy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bae6fd" />
                  <stop offset="50%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#082f49" />
                </linearGradient>

                {/* Rear Engine Heatshield (Facing player) */}
                <linearGradient id="chaseEngineShield" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="50%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              {/* Forward Sensor Probe */}
              <line x1="35" y1="2" x2="35" y2="10" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />

              {/* Main Arrowhead Fuselage */}
              <path
                d="M35 8 L45 35 L46 75 L24 75 L25 35 Z"
                fill="url(#chaseHullGrad)"
                stroke="#64748b"
                strokeWidth="1.2"
              />

              {/* Central Dorsal Spine Stripe */}
              <rect x="33.5" y="14" width="3" height="58" fill="url(#chaseCyanSpine)" rx="1.5" />

              {/* Forward Cockpit Bubble Canopy */}
              <ellipse cx="35" cy="27" rx="5" ry="9" fill="url(#chaseCanopy)" stroke="#7dd3fc" strokeWidth="1.2" />
              <ellipse cx="33.5" cy="24" rx="1.8" ry="4" fill="#ffffff" opacity="0.8" />

              {/* Rear Heatshield Bulkhead */}
              <path
                d="M22 73 L48 73 L45 83 L25 83 Z"
                fill="url(#chaseEngineShield)"
                stroke="#1e293b"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* 2. SWEPT-BACK 3D DELTA WINGS */}
          {/* Left Wing */}
          <div
            className="absolute top-[32px] left-[-22px] w-[30px] h-[46px] origin-right pointer-events-none"
            style={{
              transform: 'translateZ(6px) rotateY(-8deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <svg viewBox="0 0 30 46" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
              <polygon
                points="30,0 2,34 6,44 30,40"
                fill="#38bdf8"
                stroke="#0284c7"
                strokeWidth="1.2"
              />
              <circle cx="4" cy="38" r="2" fill="#38bdf8" />
            </svg>
          </div>

          {/* Right Wing */}
          <div
            className="absolute top-[32px] right-[-22px] w-[30px] h-[46px] origin-left pointer-events-none"
            style={{
              transform: 'translateZ(6px) rotateY(8deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <svg viewBox="0 0 30 46" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
              <polygon
                points="0,0 28,34 24,44 0,40"
                fill="#38bdf8"
                stroke="#0284c7"
                strokeWidth="1.2"
              />
              <circle cx="26" cy="38" r="2" fill="#fbbf24" />
            </svg>
          </div>

          {/* 3. DORSAL VERTICAL FIN (Perpendicular in 3D space) */}
          <div
            className="absolute top-[42px] left-1/2 -translate-x-1/2 w-[6px] h-[36px] pointer-events-none"
            style={{
              transform: 'rotateY(90deg) translateZ(12px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <svg viewBox="0 0 36 20" className="w-[36px] h-[20px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <polygon points="0,20 28,0 36,0 32,20" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
              <circle cx="32" cy="4" r="1.5" fill="#fde047" />
            </svg>
          </div>

          {/* 4. REAR ENGINE NOZZLES (Closest to camera, pointing at viewer) */}
          <div
            className="absolute bottom-1 w-full flex justify-center items-center gap-1.5"
            style={{
              transform: 'translateZ(12px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Left Port Thruster */}
            <div className="relative w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            </div>

            {/* Center Main Thruster */}
            <div className="relative w-5 h-5 rounded-full bg-slate-950 border-2 border-sky-500 shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#38bdf8,0_0_18px_#0284c7]" />
            </div>

            {/* Right Starboard Thruster */}
            <div className="relative w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            </div>
          </div>
        </div>

        {/* ── STEADY STATIC PLASMA FLAME (NO VIBRATION, NO FLICKER/SHAKE, PURE STEADY GLOW) ── */}
        <div
          className="relative -mt-0.5 flex flex-col items-center pointer-events-none z-20"
          style={{ transform: 'translateZ(10px)' }}
        >
          {/* Main Center Plasma Exhaust */}
          <div
            className="w-4 h-7 rounded-b-full bg-gradient-to-b from-white via-cyan-300 to-sky-600 origin-top opacity-85"
            style={{
              boxShadow: '0 0 14px #38bdf8, 0 0 24px #0284c7',
            }}
          />

          {/* Flanking Exhaust Plumes */}
          <div className="absolute top-0 w-10 flex justify-between px-0.5">
            <div className="w-2 h-4 rounded-b-full bg-gradient-to-b from-cyan-200 to-blue-600 origin-top opacity-75" />
            <div className="w-2 h-4 rounded-b-full bg-gradient-to-b from-cyan-200 to-blue-600 origin-top opacity-75" />
          </div>

          {/* Engine Ambient Flare Field */}
          <div className="absolute -top-3 w-20 h-20 rounded-full bg-cyan-500/20 blur-xl pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
