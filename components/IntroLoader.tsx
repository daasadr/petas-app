"use client";

import { Suspense, lazy, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const LazyIntroAnimation = lazy(() => import('./IntroAnimation'));

const LoadingFallback = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#121212',
    zIndex: 9999
  }} />
);

export const IntroLoader = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Při prvním načtení skryjeme hlavní obsah
    const mainContent = document.getElementById('mainContentWrapper');
    if (mainContent) {
      mainContent.style.visibility = 'hidden';
      mainContent.style.opacity = '0';
    }

    setMounted(true);

    // Cleanup
    return () => {
      const mainContent = document.getElementById('mainContentWrapper');
      if (mainContent) {
        mainContent.style.visibility = 'visible';
        mainContent.style.opacity = '1';
      }
    };
  }, []);

  if (!mounted) return <LoadingFallback />;

  return createPortal(
    <Suspense fallback={<LoadingFallback />}>
      <LazyIntroAnimation />
    </Suspense>,
    document.body
  );
};