/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useCallback, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Route, Routes } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';
import { NotAvailablePage } from './pages/NotAvailablePage';

const LandingPage = lazy(() =>
  import('./pages/LandingPage').then(({ LandingPage }) => ({ default: LandingPage }))
);
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').then(({ ProjectsPage }) => ({ default: ProjectsPage }))
);
const SpacePage = lazy(() => import('./pages/SpacePage'));

const RouteLoadingFallback = () => (
  <div
    className="fixed inset-0 z-[900] flex items-center justify-center bg-white"
    role="status"
    aria-label="Loading page"
  >
    <div className="h-1.5 w-48 overflow-hidden rounded-full bg-gray-100">
      <div className="h-full w-1/2 animate-pulse rounded-full bg-[#ff4b4b]" />
    </div>
  </div>
);

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const completeInitialLoading = useCallback(() => setInitialLoading(false), []);

  return (
    <>
      <AnimatePresence>
        {initialLoading && <LoadingScreen onComplete={completeInitialLoading} />}
      </AnimatePresence>

      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/journey" element={<JourneyPage initialLoading={initialLoading} />} />
          <Route path="/story" element={<JourneyPage initialLoading={initialLoading} />} />
          <Route path="/projects" element={<ProjectsPage initialLoading={initialLoading} />} />
          <Route path="/space" element={<SpacePage />} />
          <Route path="/explore-works" element={<SpacePage />} />
          <Route path="/explore-work" element={<SpacePage />} />
          <Route path="/not-available" element={<NotAvailablePage />} />
          <Route path="/unavailable" element={<NotAvailablePage />} />
        </Routes>
      </Suspense>
    </>
  );
}