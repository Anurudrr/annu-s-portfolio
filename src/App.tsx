import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SignpostPage } from './pages/SignpostPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { DesignHomePage } from './design/pages/DesignHomePage';
import { DesignWorkPage } from './design/pages/DesignWorkPage';
import { DesignAboutPage } from './design/pages/DesignAboutPage';
import { DesignContactPage } from './design/pages/DesignContactPage';

import { DesignLayout } from './layouts/DesignLayout';

// Redoyan portfolio imports
import { LoadingProvider } from './redoyan/context/LoadingProvider';
import CharacterModel from './redoyan/components/Character';
import MainContainer from './redoyan/components/MainContainer';
import MyWorks from './redoyan/pages/MyWorks';
import Play from './redoyan/pages/Play';
import './redoyan/App.css';
import './redoyan/index.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const } },
};

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

function DevPortfolioWrapper({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    document.body.classList.add('dev-portfolio-active');
    document.documentElement.classList.add('dev-portfolio-active');
    return () => {
      document.body.classList.remove('dev-portfolio-active');
      document.documentElement.classList.remove('dev-portfolio-active');
    };
  }, []);
  return <>{children}</>;
}

function RoutesWithTransition() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ position: 'relative', width: '100%', minHeight: '100vh' }}
      >
        <Routes>
          {/* Signpost landing */}
          <Route path="/" element={<SignpostPage />} />

          {/* Dev routes */}
          <Route path="/dev" element={
            <DevPortfolioWrapper>
              <LoadingProvider>
                <React.Suspense>
                  <MainContainer>
                    <React.Suspense>
                      <CharacterModel />
                    </React.Suspense>
                  </MainContainer>
                </React.Suspense>
              </LoadingProvider>
            </DevPortfolioWrapper>
          } />
          <Route path="/dev/work" element={
            <DevPortfolioWrapper>
              <React.Suspense fallback={<div>Loading...</div>}>
                <MyWorks />
              </React.Suspense>
            </DevPortfolioWrapper>
          } />
          <Route path="/dev/play" element={
            <DevPortfolioWrapper>
              <React.Suspense fallback={<div>Loading...</div>}>
                <Play />
              </React.Suspense>
            </DevPortfolioWrapper>
          } />

          {/* Design routes — completely isolated, custom animations */}
          <Route element={<DesignLayout />}>
            <Route path="/design" element={<DesignHomePage />} />
            <Route path="/design/work" element={<DesignWorkPage />} />
            <Route path="/design/about" element={<DesignAboutPage />} />
            <Route path="/design/contact" element={<DesignContactPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RoutesWithTransition />
    </BrowserRouter>
  );
}

export default App;
