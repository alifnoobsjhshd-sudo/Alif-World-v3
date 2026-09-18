import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';
import { SEO } from '../components/SEO';
import { dreamAudio } from '../utils/audio';

export const ProjectsPage = React.memo(({ initialLoading }: { initialLoading: boolean }) => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(dreamAudio.isMuted);
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [isPreloading, setIsPreloading] = React.useState(true);
  const [preloadingProgress, setPreloadingProgress] = React.useState(0);

  const toggleSound = () => {
    const next = dreamAudio.toggleMute();
    setIsMuted(next);
    if (!next) dreamAudio.playPop();
  };

  const categories = [
    { name: 'All', emoji: '📂' },
    { name: 'Favorite', emoji: '⭐' },
    { name: 'Premium', emoji: '💎' },
    { name: 'Standard', emoji: '🛠️' },
    { name: 'Unfinished', emoji: '🚧' }
  ];

  const projects = [
    {
      name: 'CosmicTiers',
      url: 'https://CosmicTiers.onrender.com',
      description: 'A Minecraft PvP tier list system showcasing an advanced web application and integrated Discord bot solutions.',
      category: ['Favorite', 'Premium'],
      screenshot: 'https://api.microlink.io/?url=https%3A%2F%2FCosmicTiers.onrender.com&screenshot=true&meta=false&embed=screenshot.url',
    },
    {
      name: 'Nexa Mobile',
      url: 'https://nexamobile.pages.dev/',
      description: 'An elite, modern tech presentation website for a high-end local mobile repair and restoration shop.',
      category: ['Favorite', 'Premium'],
      screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fnexamobile.pages.dev&screenshot=true&meta=false&embed=screenshot.url',
    },
    {
      name: 'Verdant Earth',
      url: 'https://verdant-earth-e98.pages.dev/',
      description: 'An immersive, beautifully custom-designed landing experience for an active global tree-planting organisation.',
      category: ['Favorite', 'Premium'],
      screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fverdant-earth-e98.pages.dev&screenshot=true&meta=false&embed=screenshot.url',
    },
    {
      name: 'Noir Cafe',
      url: 'https://noir-cafe.pages.dev/',
      description: 'A premium, moody, and atmospheric presentation for an artisan coffeehouse and roasting kitchen.',
      category: ['Standard'],
      screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fnoir-cafe.pages.dev&screenshot=true&meta=false&embed=screenshot.url',
    },
    {
      name: 'Adil Portfolio',
      url: 'https://adil-portfolio-bkw.pages.dev/',
      description: 'A cinematic and highly visual online showcase developed for a professional video and creative editor.',
      category: ['Premium'],
      screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fadil-portfolio-bkw.pages.dev&screenshot=true&meta=false&embed=screenshot.url',
    },
    {
      name: 'SmileCraft',
      url: 'https://dental-website-3je.pages.dev/',
      description: 'A pristine, premium, state-of-the-art marketing landing page built for an elite modern dental clinic.',
      category: ['Premium'],
      screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fdental-website-3je.pages.dev&screenshot=true&meta=false&embed=screenshot.url',
    },
    {
      name: 'Lumiere BookShop',
      url: 'https://p-ohskoob.pages.dev/',
      description: 'A delightful and intuitive online bookstore design focusing on rich typography and clean book curations.',
      category: ['Standard'],
      screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fp-ohskoob.pages.dev&screenshot=true&meta=false&embed=screenshot.url',
    },
    {
      name: 'Bites Restaurant',
      url: 'https://bites-restaurant.pages.dev/',
      description: 'A cozy, appetizing, and fluid web interface displaying local culinary experiences and bespoke menus.',
      category: ['Standard'],
      screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fbites-restaurant.pages.dev&screenshot=true&meta=false&embed=screenshot.url',
    },
    {
      name: 'Sprout',
      url: 'https://plushie-site.alifop2400.workers.dev',
      description: 'A charming, delightful product landing website conceptualised for an immersive plushie companion brand.',
      category: ['Standard', 'Unfinished'],
      screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fplushie-site.alifop2400.workers.dev&screenshot=true&meta=false&embed=screenshot.url',
      unfinished: true,
      progress: 75
    },
    {
      name: 'Aether',
      url: 'https://aether-ubs.pages.dev/',
      description: '',
      category: ['Unfinished'],
      screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Faether-ubs.pages.dev%2F&screenshot=true&meta=false&embed=screenshot.url',
      unfinished: true,
      progress: 60
    },
    {
      name: 'Frooto Juice',
      url: 'https://frooto-juice.pages.dev/',
      description: 'A vibrant landing website showcasing a tropical Mango juice brand.',
      category: ['Unfinished'],
      screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Ffrooto-juice.pages.dev%2F&screenshot=true&meta=false&embed=screenshot.url',
      unfinished: true,
      progress: 70
    }
  ];

  // Preloading image screenshots logic
  React.useEffect(() => {
    let active = true;
    const preloadScreenshots = async () => {
      const urls = projects.map(p => p.screenshot);
      let loadedCount = 0;

      const loadImage = (url: string) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = () => resolve(); // safety resolve
          
          // Force fallback resolution per image of 2.5 seconds to keep rendering fast
          setTimeout(() => {
            resolve();
          }, 2500);
        });
      };

      await Promise.all(
        urls.map(async (url) => {
          await loadImage(url);
          if (active) {
            loadedCount++;
            setPreloadingProgress(Math.round((loadedCount / urls.length) * 100));
          }
        })
      );

      if (active) {
        setTimeout(() => {
          setIsPreloading(false);
        }, 500);
      }
    };

    preloadScreenshots();

    // Universal safety timer of 5 seconds to bypass loader
    const timer = setTimeout(() => {
      if (active) {
        setIsPreloading(false);
      }
    }, 5000);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category.includes(activeCategory));

  const shouldShowLoader = initialLoading || isPreloading;

  return (
    <div className="min-h-screen bg-[#f8f8f8] font-sans relative">
      <SEO 
        title="Projects | Alif Digital Web Showcases"
        description="A showcase of digital web experiences, custom platforms, premium interfaces, and creative web designs engineered by Alif."
      />
      <AnimatePresence>
        {shouldShowLoader && (
          <motion.div 
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="w-64 sm:w-80 relative flex flex-col items-center">
              {/* Pulsing Visual */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-6"
              >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="drop-shadow-md">
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" className="animate-spin" style={{ transformOrigin: 'center' }} />
                  <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" fill="#fef3c7" />
                </svg>
              </motion.div>

              {/* Loader labels */}
              <h3 className="font-display font-black text-gray-800 text-sm uppercase tracking-widest mb-1.5 text-center">
                Generating Previews {preloadingProgress}%
              </h3>
              <p className="text-gray-400 font-hand text-base sm:text-lg italic mb-6 text-center">
                caching live screenshots for optimal speed...
              </p>

              {/* Progress tracking bar */}
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden relative">
                <motion.div 
                  className="h-full bg-amber-500 rounded-full"
                  style={{ 
                    width: `${preloadingProgress}%`,
                    transition: 'width 0.2s ease-out'
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-8 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:py-4 bg-white/85 backdrop-blur-md border-b border-gray-100">
        <motion.button
          onClick={() => {
            dreamAudio.playPop();
            navigate('/');
          }}
          onMouseEnter={() => dreamAudio.playHover()}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 sm:gap-2 text-gray-500 hover:text-gray-800 transition-colors font-display font-bold uppercase tracking-widest text-xs sm:text-sm cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          back
        </motion.button>
        <span className="font-display font-black text-gray-800 text-base sm:text-xl uppercase tracking-widest">
          Alif
        </span>
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            onClick={() => {
              dreamAudio.playPop();
              navigate('/journey');
            }}
            onMouseEnter={() => dreamAudio.playHover()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-display font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            title="Watch the Sky Story Journey"
          >
            <span>Watch Story</span>
            <span>☁️</span>
          </motion.button>
          <motion.button
            type="button"
            onClick={toggleSound}
            onMouseEnter={() => dreamAudio.playHover()}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-700 hover:text-slate-900 transition-all flex items-center justify-center cursor-pointer active:scale-95"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Page content */}
      <div className="pt-24 sm:pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-10 sm:mb-12"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-gray-800 uppercase tracking-tight leading-none mb-4 text-center">
            PROJECTS
          </h1>
          <p className="text-gray-400 font-hand text-xl sm:text-2xl italic text-center mb-5">
            things i've built with love
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 px-5 py-2 bg-amber-50 border border-amber-200/60 rounded-2xl shadow-sm text-amber-700 font-sans font-semibold text-xs sm:text-sm tracking-wide text-center animate-bounce-slow"
          >
            <span className="text-amber-500 animate-pulse">⚠️</span>
            Many of website aren't functioned yet 'just frontend design'
          </motion.div>
        </motion.div>

        {/* Category Tabs */}
        <div className="relative mb-12 sm:mb-16">
          <div className="flex justify-start sm:justify-center gap-3 sm:gap-4 overflow-x-auto py-2 px-2 no-scrollbar scroll-smooth">
            {categories.map((cat) => (
              <motion.button
                key={cat.name}
                onClick={() => {
                  dreamAudio.playPop();
                  setActiveCategory(cat.name);
                }}
                onMouseEnter={() => dreamAudio.playHover()}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-display font-black text-[10px] sm:text-sm uppercase tracking-widest transition-all shadow-sm cursor-pointer ${
                  activeCategory === cat.name 
                    ? 'bg-gray-800 text-white shadow-lg' 
                    : 'bg-white text-gray-400 border border-gray-100 hover:text-gray-600'
                }`}
              >
                {cat.emoji} {cat.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
              <motion.div
                layout
                key={project.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[2rem] sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-gray-100 flex flex-col group"
              >
                <div className="aspect-video bg-gray-100 overflow-hidden relative border-b border-gray-100/50">
                  <img 
                    src={project.screenshot} 
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {project.unfinished && (
                    <div className="absolute top-4 right-4 bg-amber-500 text-white font-display font-black text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-md z-20">
                      Draft {project.progress}%
                    </div>
                  )}
                  {/* Desktop Hover Overlay */}
                  <div className="hidden sm:flex absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 items-center justify-center opacity-0 group-hover:opacity-100">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white text-gray-800 px-6 py-2 rounded-full font-display font-black text-xs uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      Visit Site
                    </a>
                  </div>
                  {/* Mobile Link indicator */}
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="sm:hidden absolute inset-0 z-10"
                    aria-label={`Visit ${project.name}`}
                  />
                </div>
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl sm:text-2xl font-display font-black text-gray-800 uppercase flex items-center flex-wrap gap-1.5">
                        {project.name}
                        {project.unfinished && (
                          <span className="font-hand text-lg sm:text-xl font-normal text-amber-550 normal-case ml-1">
                            (unfinished)
                          </span>
                        )}
                      </h3>
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="sm:hidden text-gray-400 p-1"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                      </a>
                    </div>
                    {project.description ? (
                      <p className="text-gray-500 font-hand text-base sm:text-lg leading-relaxed mb-6">
                        {project.description}
                      </p>
                    ) : (
                      <p className="text-gray-450 font-hand text-base sm:text-lg italic leading-relaxed mb-6">
                        Draft designs currently in process...
                      </p>
                    )}
                  </div>

                  <div className="mt-auto">
                    {project.unfinished ? (
                      <div className="flex flex-col gap-2 pt-4 border-t border-gray-100/60">
                        <div className="flex items-center justify-between text-[11px] font-display font-black text-gray-400 uppercase tracking-wider">
                          <span>Development Progress</span>
                          <span className="text-amber-500 font-bold">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100/80 rounded-full h-1.5 overflow-hidden mb-4">
                          <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.category.map(c => (
                            <span key={c} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[9px] sm:text-[10px] font-display font-bold text-gray-400 uppercase tracking-widest">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="pt-4 border-t border-gray-100/60 flex flex-wrap gap-2">
                        {project.category.map(c => (
                          <span key={c} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[9px] sm:text-[10px] font-display font-bold text-gray-400 uppercase tracking-widest">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <p className="font-display font-black text-gray-300 text-xl uppercase tracking-widest italic">
                Empty space awaiting gems
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
});

ProjectsPage.displayName = 'ProjectsPage';
