"use client";
import { useEffect, useState, useRef } from 'react';
import styles from '../styles/IntroAnimation.module.css';

const IntroAnimation = () => {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Nastavíme mainContent jako skrytý při načtení
    const mainContent = document.getElementById('mainContentWrapper');
    if (mainContent) {
      mainContent.style.visibility = 'hidden';
      mainContent.style.opacity = '0';
    }
    
    // Předběžné načtení obrázků
    const preloadImages = async () => {
      const urls = ['/hotA.jpg', '/hotField.jpg'];
      try {
        await Promise.all(
          urls.map(url => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = url;
            });
          })
        );
        setImagesLoaded(true);
      } catch (error) {
        console.error('Failed to load images:', error);
      }
    };

    preloadImages();
  }, []);

  const handleStart = () => {
    setIsAnimationStarted(true);
    sessionStorage.setItem('hasSeenAnimation', 'true');

    // Začneme zobrazovat hlavní obsah až po dokončení animace
    setTimeout(() => {
      const mainContent = document.getElementById('mainContentWrapper');
      if (mainContent) {
        mainContent.style.visibility = 'visible';
        mainContent.style.opacity = '1';
        mainContent.style.transition = 'opacity 1s ease-in';
      }
    }, 4500); // Načasování těsně před koncem animace

    setTimeout(() => {
      setShowAnimation(false);
    }, 5000);
  };

  // Pokud obrázky nejsou načtené, zobrazíme prázdný div se stejným pozadím jako homepage
  if (!imagesLoaded) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#your-background-color', // Nastavte stejnou barvu jako má vaše homepage
        zIndex: 1000
      }} />
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