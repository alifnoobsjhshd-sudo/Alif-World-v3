/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useMotionValueEvent,
} from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../components/Section';
import { AtmosphericClouds } from '../components/AtmosphericClouds';
import { Cloud } from '../components/Decorations';
import { SectionPlane } from '../components/SectionPlane';
import { ScrollHint } from '../components/ScrollHint';
import { PaperAirplane } from '../components/PaperAirplane';
import { SEO } from '../components/SEO';
import { STORY_SCENES, SCENE_STEP } from '../data/storyline';
import { StorySceneView } from '../components/StorySceneView';
import { StoryContactModal } from '../components/StoryContactModal';
import { JourneyCloudOut } from '../components/JourneyCloudOut';
import { RocketLaunchTransition } from '../components/RocketLaunchTransition';
import { dreamAudio } from '../utils/audio';

const MAX_DEPTH = (STORY_SCENES.length - 1) * SCENE_STEP;

export const JourneyPage: React.FC<{ initialLoading: boolean }> = ({ initialLoading }) => {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isRocketLaunching, setIsRocketLaunching] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const depthValue = useMotionValue(0);
  const smoothedDepth = useSpring(depthValue, {
    stiffness: 100,
    damping: 22,
    mass: 0.55,
    restDelta: 0.5,
  });
  const depthVelocity = useVelocity(smoothedDepth);

  useEffect(() => {
    dreamAudio.startJourneyMusic();
    dreamAudio.setStoryScene(0);

    const handleFirstGesture = () => {
      dreamAudio.startJourneyMusic();
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
    window.addEventListener('pointerdown', handleFirstGesture);
    window.addEventListener('keydown', handleFirstGesture);

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      dreamAudio.stopJourneyMusic(2.0);
    };
  }, []);

  useMotionValueEvent(smoothedDepth, 'change', (value) => {
    const raw = value / SCENE_STEP;
    const nextSection = Math.min(Math.max(Math.round(raw), 0), STORY_SCENES.length - 1);
    if (nextSection !== activeSection) {
      dreamAudio.playSceneTick();
      dreamAudio.setStoryScene(nextSection);
      setActiveSection(nextSection);
    }
  });

  const worldRotateY = useTransform(smoothedDepth, (depth) =>
    Math.sin((depth / 2600) * Math.PI) * 4.2
  );
  const worldRotateZ = useTransform(smoothedDepth, (depth) =>
    Math.sin((depth / 2600) * Math.PI) * -1.6
  );
  const worldRotateX = useTransform(smoothedDepth, (depth) =>
    Math.cos((depth / 2600) * Math.PI) * 1.1
  );

  const smoothCameraVelocity = useSpring(depthVelocity, {
    stiffness: 100,
    damping: 22,
    mass: 0.6,
  });
  const worldScale = useTransform(smoothCameraVelocity, [-3000, 0, 3000], [1.02, 1.0, 1.02]);
  const worldTranslateX = useTransform(smoothCameraVelocity, [-2000, 0, 2000], [5, 0, -5]);
  const worldTranslateY = useTransform(smoothCameraVelocity, [-2000, 0, 2000], [3, 0, 3]);

  const dynamicSkyGradient = useTransform(
    smoothedDepth,
    [
      0,
      SCENE_STEP * 4,
      SCENE_STEP * 7,
      SCENE_STEP * 8.5,
      SCENE_STEP * 9,
      SCENE_STEP * 9.7,
      SCENE_STEP * 10,
      SCENE_STEP * 11,
      SCENE_STEP * 12,
      SCENE_STEP * 13,
      SCENE_STEP * 14,
      SCENE_STEP * 15,
    ],
    [
      'linear-gradient(to bottom, #dbeafe 0%, #f0f9ff 60%, #ffffff 100%)',
      'linear-gradient(to bottom, #bae6fd 0%, #e0f2fe 55%, #ffffff 100%)',
      'linear-gradient(to bottom, #ddd6fe 0%, #ede9fe 50%, #ffffff 100%)',
      'linear-gradient(to bottom, #64748b 0%, #94a3b8 60%, #cbd5e1 100%)',
      'linear-gradient(to bottom, #1e293b 0%, #334155 55%, #475569 100%)',
      'linear-gradient(to bottom, #475569 0%, #94a3b8 40%, #fef3c7 100%)',
      'linear-gradient(to bottom, #fde68a 0%, #fef3c7 45%, #ffffff 100%)',
      'linear-gradient(to bottom, #6b21a8 0%, #c026d3 30%, #f97316 70%, #fef08a 100%)',
      'linear-gradient(to bottom, #4338ca 0%, #6366f1 45%, #f5f3ff 100%)',
      'linear-gradient(to bottom, #0284c7 0%, #38bdf8 55%, #f0f9ff 100%)',
      'linear-gradient(to bottom, #f59e0b 0%, #fbbf24 45%, #fffbeb 100%)',
      'linear-gradient(to bottom, #e0f2fe 0%, #f8fafc 60%, #ffffff 100%)',
    ]
  );

  const speedVignetteBg = useTransform(
    depthVelocity,
    [-4000, 0, 4000],
    [
      'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.07) 100%)',
      'radial-gradient(ellipse at center, transparent 70%, rgba(0,0,0,0.00) 100%)',
      'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.07) 100%)',
    ]
  );

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.max(-100, Math.min(100, event.deltaY));
      depthValue.set(Math.max(0, Math.min(MAX_DEPTH, depthValue.get() + delta * 6)));
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [depthValue]);

  const touchLastY = useRef(0);
  const touchVelocityY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const onTouchStart = (event: TouchEvent) => {
      touchLastY.current = event.touches[0].clientY;
      touchVelocityY.current = 0;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };

    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0].clientY;
      const delta = touchLastY.current - y;
      touchVelocityY.current = delta;
      touchLastY.current = y;
      depthValue.set(Math.max(0, Math.min(MAX_DEPTH, depthValue.get() + delta * 6)));
    };

    const onTouchEnd = () => {
      let velocity = touchVelocityY.current;
      const step = () => {
        if (Math.abs(velocity) < 0.2) return;
        depthValue.set(Math.max(0, Math.min(MAX_DEPTH, depthValue.get() + velocity * 5)));
        velocity *= 0.9;
        rafId.current = requestAnimationFrame(step);
      };
      rafId.current = requestAnimationFrame(step);
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [depthValue]);

  return (
    <div className="relative bg-[#f8f8f8] text-gray-800 font-sans selection:bg-blue-100 h-screen w-screen overflow-hidden">
      <SEO
        title="Alif-World | Sky Journey Storyline Portfolio"
        description="Follow the cinematic sky journey of Alif, exploring curiosity, science, code, and unforgettable interactive experiences."
      />

      <motion.div
        animate={{ opacity: initialLoading ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="fixed inset-0 z-[200] pointer-events-none"
      >
        <motion.div
          animate={{ y: initialLoading ? '0%' : '-100%' }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.3 }}
          className="h-1/2 bg-white w-full border-b border-gray-100 flex items-end justify-center pb-24"
        >
          <div className="opacity-20 translate-y-12">
            <Cloud x="20%" y="0" z={0} scale={4} opacity={1} />
            <Cloud x="60%" y="0" z={0} scale={6} opacity={1} />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: initialLoading ? '0%' : '100%' }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.3 }}
          className="h-1/2 bg-white w-full border-t border-gray-100 flex items-start justify-center pt-24"
        >
          <div className="opacity-20 -translate-y-12">
            <Cloud x="40%" y="0" z={0} scale={5} opacity={1} />
            <Cloud x="80%" y="0" z={0} scale={7} opacity={1} />
          </div>
        </motion.div>
      </motion.div>

      <SectionPlane activeSection={activeSection} depthValue={depthValue} />

      <motion.div
        className="fixed inset-0 pointer-events-none transition-colors duration-1000 overflow-hidden"
        style={{ background: dynamicSkyGradient }}
      />
      <AtmosphericClouds smoothedDepth={smoothedDepth} />

      <div
        className="fixed inset-0 pointer-events-none overflow-hidden z-10"
        style={{ perspective: '900px', perspectiveOrigin: '50% 55%' }}
      >
        <motion.div
          className="relative w-full h-full preserve-3d gpu"
          style={{
            rotateX: worldRotateX,
            rotateY: worldRotateY,
            rotateZ: worldRotateZ,
            scale: worldScale,
            translateX: worldTranslateX,
            translateY: worldTranslateY,
            transformOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {STORY_SCENES.map((scene) => (
            <Section key={scene.id} startDepth={scene.depth} scrollProgress={smoothedDepth}>
              <StorySceneView
                scene={scene}
                onOpenContact={() => {
                  dreamAudio.playChime();
                  setIsContactOpen(true);
                }}
                onExploreWork={() => {
                  dreamAudio.stopJourneyMusic(0.8);
                  setIsRocketLaunching(true);
                }}
              />
            </Section>
          ))}
        </motion.div>
      </div>

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)] z-20" />
      <motion.div className="fixed inset-0 pointer-events-none z-20" style={{ background: speedVignetteBg }} />
      <PaperAirplane scrollVelocity={depthVelocity} smoothedDepth={smoothedDepth} />
      <ScrollHint smoothedDepth={smoothedDepth} />

      <StoryContactModal
        isOpen={isContactOpen}
        onClose={() => {
          dreamAudio.playPop();
          setIsContactOpen(false);
        }}
      />
      <JourneyCloudOut />
      <RocketLaunchTransition
        isActive={isRocketLaunching}
        onComplete={() => navigate('/space')}
      />
    </div>
  );
};

export default JourneyPage;