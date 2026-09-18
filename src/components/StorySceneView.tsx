import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { StoryScene } from '../data/storyline';
import { StorySpeechBubble } from './StorySpeechBubble';
import { SnappedCloudCharacter } from './SnappedCloudCharacter';
import { Compass, Mail, ArrowRight } from 'lucide-react';
import { dreamAudio } from '../utils/audio';

interface StorySceneViewProps {
  scene: StoryScene;
  onOpenContact?: () => void;
  onExploreWork?: () => void;
}

export const StorySceneView: React.FC<StorySceneViewProps> = React.memo(({ scene, onOpenContact, onExploreWork }) => {
  const navigate = useNavigate();
  const isReveal = scene.id === 16;

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-4xl px-4 select-none">
      
      {/* ── TOP FLOATING SPEECH BUBBLE (FOR TOP PLACED SCENES) ──────────────── */}
      <div className="relative w-full flex flex-col items-center z-40 mb-2">
        {scene.bubblePlacement === 'above' && (
          <div className="mb-4">
            <StorySpeechBubble scene={scene} />
          </div>
        )}
        {scene.bubblePlacement === 'high-above' && (
          <div className="mb-8 scale-105">
            <StorySpeechBubble scene={scene} />
          </div>
        )}
        {scene.bubblePlacement === 'above-laptop' && (
          <div className="mb-4">
            <StorySpeechBubble scene={scene} />
          </div>
        )}
        {scene.bubblePlacement === 'above-airplane' && (
          <div className="mb-6">
            <StorySpeechBubble scene={scene} />
          </div>
        )}
        {scene.bubblePlacement === 'high-contrast' && (
          <div className="mb-6">
            <StorySpeechBubble scene={scene} />
          </div>
        )}
        {scene.bubblePlacement === 'cinematic-large' && (
          <div className="mb-6 scale-105">
            <StorySpeechBubble scene={scene} />
          </div>
        )}
      </div>

      {/* ── CENTRAL SNAPPED CLOUD + CHARACTER SECTION ELEMENT ──────────────── */}
      <div className="relative flex flex-col items-center justify-center min-w-[320px] sm:min-w-[500px] md:min-w-[660px]">
        
        {/* Left or Top-Left floating bubble */}
        {(scene.bubblePlacement === 'left-curving' || scene.bubblePlacement === 'between-portal') && (
          <div className="absolute -top-16 -left-2 sm:-left-20 z-40">
            <StorySpeechBubble scene={scene} />
          </div>
        )}

        {/* Beside head or subtle beside */}
        {(scene.bubblePlacement === 'beside-head' || scene.bubblePlacement === 'subtle-beside' || scene.bubblePlacement === 'direct-friendly') && (
          <div className="absolute -top-14 sm:-top-16 -right-2 sm:-right-24 z-40">
            <StorySpeechBubble scene={scene} />
          </div>
        )}

        {/* Opposite telescope or pointing horizon */}
        {(scene.bubblePlacement === 'opposite-telescope' || scene.bubblePlacement === 'wide-pointing-horizon') && (
          <div className="absolute -top-14 sm:-top-16 -left-2 sm:-left-24 z-40">
            <StorySpeechBubble scene={scene} />
          </div>
        )}

        {/* Above and behind or wind-tilted */}
        {(scene.bubblePlacement === 'above-behind' || scene.bubblePlacement === 'behind-stretching' || scene.bubblePlacement === 'wind-tilted') && (
          <div className="absolute -top-16 -right-2 sm:-right-16 z-40">
            <StorySpeechBubble scene={scene} />
          </div>
        )}

        {/* The character seated and snapped with the cloud in scene-specific pose */}
        <div className="my-2">
          <SnappedCloudCharacter scene={scene} />
        </div>

        {/* ── SCENE 16 SPECIAL: MAIN INTRODUCTION & BUTTONS ────────────────── */}
        {isReveal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 flex flex-col items-center text-center max-w-lg z-30"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-slate-900 tracking-tight mb-2">
              I’m Alif
            </h2>

            <p className="text-base sm:text-lg font-display font-bold text-black mb-6 tracking-wide">
              A creative developer
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
              <button
                type="button"
                onClick={() => {
                  dreamAudio.playPop();
                  if (onExploreWork) {
                    onExploreWork();
                  } else {
                    navigate('/explore-works');
                  }
                }}
                onMouseEnter={() => dreamAudio.playHover()}
                className="px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-black text-white font-display font-black text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-slate-800"
              >
                <Compass className="w-5 h-5 text-sky-400" />
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  dreamAudio.playChime();
                  onOpenContact?.();
                }}
                onMouseEnter={() => dreamAudio.playHover()}
                className="px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-display font-black text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 border-2 border-slate-200 hover:border-slate-400 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Mail className="w-5 h-5 text-sky-600" />
                <span>Contact Me</span>
              </button>
            </div>
          </motion.div>
        )}

      </div>

    </div>
  );
});

StorySceneView.displayName = 'StorySceneView';
