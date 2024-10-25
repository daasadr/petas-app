"use client";
import { Suspense, lazy, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const LazyIntroAnimation = lazy(() => import('./IntroAnimation'));

const LoadingFallback = () => (
  <div style={{ 
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: '#121212',
    zIndex: 9999 
  }} />
);

export const IntroLoader = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingFallback />;
  }

  return createPortal(
    <Suspense fallback={<LoadingFallback />}>
      <LazyIntroAnimation />
    </Suspense>,
    document.body
  );
};