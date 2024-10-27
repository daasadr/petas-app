"use client";

import { useEffect, useState, useRef } from 'react';
import styles from '../styles/IntroAnimation.module.css';

const IntroAnimation = () => {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Skryjeme hlavní obsah při načtení
    const mainContent = document.getElementById('mainContentWrapper');
    if (mainContent) {
      mainContent.style.visibility = 'hidden';
      mainContent.style.opacity = '0';
    }

    const loadImages = async () => {
      try {
        const imageUrls = ['/hotA.jpg', '/hotField.jpg'];
        await Promise.all(
          imageUrls.map(
            url =>
              new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
              })
          )
        );
        setIsReady(true);
      } catch (error) {
        console.error('Failed to load images:', error);
        setIsReady(true);
      }
    };

    loadImages();
  }, []);

  const handleStart = () => {
    setIsAnimationStarted(true);
    sessionStorage.setItem('hasSeenAnimation', 'true');

    setTimeout(() => {
      const mainContent = document.getElementById('mainContentWrapper');
      if (mainContent) {
        mainContent.style.visibility = 'visible';
        mainContent.style.opacity = '1';
        
        // Nastavení stylu podle typu stránky a zařízení
        const isHomePage = window.location.pathname === '/';
        const isMobile = window.innerWidth <= 768;
        
        if (isHomePage && !isMobile) {
          mainContent.style.position = 'fixed';
          mainContent.style.overflow = 'hidden';
        } else {
          mainContent.style.position = 'relative';
          mainContent.style.overflow = 'auto';
          mainContent.style.height = 'auto';
          mainContent.style.minHeight = '100vh';
        }
      }
    }, 3500);

    setTimeout(() => {
      setShowAnimation(false);
    }, 4000);
  };

  if (!showAnimation) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.layer2Container} ${isAnimationStarted ? styles.layer2Animate : ''}`}>
        <img
          src="/hotField.jpg"
          alt="Field"
          className={styles.layer2Image}
          ref={(el) => { imageRefs.current[0] = el; }}
        />
      </div>
      
      <div className={`${styles.layer1Container} ${isAnimationStarted ? styles.layer1Animate : ''}`}>
        <img
          src="/hotA.jpg"
          alt="Hot A"
          className={styles.layer1Image}
          ref={(el) => { imageRefs.current[1] = el; }}
        />
        {!isAnimationStarted && (
          <button
            onClick={handleStart}
            className={styles.enterButton}
            style={{ opacity: isReady ? 1 : 0 }}
          >
            ...Vstupte...
          </button>
        )}
      </div>
    </div>
  );
};

export default IntroAnimation;