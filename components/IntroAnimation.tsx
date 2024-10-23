"use client";
import { useEffect, useState, useRef } from 'react';
import styles from '../styles/IntroAnimation.module.css';

const IntroAnimation = () => {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
    const mainContent = document.getElementById('mainContentWrapper');

    // Přednačtení obrázků
    const preloadImages = async () => {
      const imageUrls = ['/hotField.jpg', '/hotA.jpg'];
      const loadPromises = imageUrls.map(url => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(true);
        });
      });

      await Promise.all(loadPromises);
      setImagesLoaded(true);
    };

    preloadImages();

    if (hasSeenAnimation) {
      setShowAnimation(false);
      if (mainContent) {
        mainContent.classList.add('show-content');
      }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        setShowAnimation(true);
        setIsAnimationStarted(false);
        sessionStorage.removeItem('hasSeenAnimation');
        if (mainContent) {
          mainContent.classList.remove('show-content');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleStart = () => {
    setIsAnimationStarted(true);
    sessionStorage.setItem('hasSeenAnimation', 'true');
    
    setTimeout(() => {
      setShowAnimation(false);
      const mainContent = document.getElementById('mainContentWrapper');
      if (mainContent) {
        mainContent.classList.add('show-content');
      }
    }, 7000);
  };

  if (!showAnimation) return null;
  if (!imagesLoaded) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.layer2Container} ${isAnimationStarted ? styles.layer2Animate : ''}`}>
        <img 
          src="/hotField.jpg" 
          alt="Field" 
          className={styles.layer2Image}
          ref={(el) => {
            if (el) imageRefs.current[0] = el;
          }}
        />
      </div>
      
      <div className={`${styles.layer1Container} ${isAnimationStarted ? styles.layer1Animate : ''}`}>
        <img 
          src="/hotA.jpg" 
          alt="Hot A" 
          className={styles.layer1Image}
          ref={(el) => {
            if (el) imageRefs.current[1] = el;
          }}
        />
        {!isAnimationStarted && (
          <button onClick={handleStart} className={styles.enterButton}>
            ...Vstupte...
          </button>
        )}
      </div>
    </div>
  );
};

export default IntroAnimation;