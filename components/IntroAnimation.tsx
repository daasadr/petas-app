"use client";
import { useEffect, useState, useRef } from 'react';
import styles from '../styles/IntroAnimation.module.css';

const IntroAnimation = () => {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const mainContent = document.getElementById('mainContentWrapper');
    if (mainContent) {
      mainContent.style.visibility = 'hidden';
      mainContent.style.opacity = '0';
    }

    // Předběžné načtení obrázků
    const preloadImages = () => {
      return new Promise((resolve) => {
        let loadedCount = 0;
        const urls = ['/hotA.jpg', '/hotField.jpg'];
        
        urls.forEach(url => {
          const img = new Image();
          img.onload = () => {
            loadedCount++;
            if (loadedCount === urls.length) {
              setImagesLoaded(true);
              resolve(true);
            }
          };
          img.src = url;
        });
      });
    };

    preloadImages();
  }, []);

  const handleStart = () => {
    setIsAnimationStarted(true);
    sessionStorage.setItem('hasSeenAnimation', 'true');

    setTimeout(() => {
      const mainContent = document.getElementById('mainContentWrapper');
      if (mainContent) {
        mainContent.style.visibility = 'visible';
        mainContent.style.opacity = '1';
        mainContent.style.transition = 'opacity 1s ease-in';
      }
    }, 4500);

    setTimeout(() => {
      setShowAnimation(false);
    }, 4000);
  };

  if (!imagesLoaded) {
    return (
      <div className={styles.overlay}>
        {/* Můžete přidat loading indikátor pokud chcete */}
      </div>
    );
  }

  if (!showAnimation) return null;

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