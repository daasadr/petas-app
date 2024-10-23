"use client";
import { useEffect, useState } from 'react';
import styles from '../styles/IntroAnimation.module.css';
import Image from 'next/image'

const IntroAnimation = () => {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
    if (hasSeenAnimation) {
      setShowAnimation(false);
     // Okamžitě zobrazit hlavní obsah, pokud není animace
      const mainContent = document.getElementById('mainContentWrapper');
      if (mainContent) {
        mainContent.classList.remove('hide-content');
        mainContent.classList.add('show-content');
      }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        setShowAnimation(true);
        setIsAnimationStarted(false);
        sessionStorage.removeItem('hasSeenAnimation');
      // Skrýt hlavní obsah při restartu animace
        const mainContent = document.getElementById('mainContentWrapper');
        if (mainContent) {
          mainContent.classList.remove('show-content');
          mainContent.classList.add('hide-content');
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
    // Zobrazit hlavní obsah až po skončení animace
      const mainContent = document.getElementById('mainContentWrapper');
      if (mainContent) {
        mainContent.classList.remove('hide-content');
        mainContent.classList.add('show-content');
      }
    }, 7000);
  };

  if (!showAnimation) {
    return null;
  }

  return (
    <div className={styles.overlay}>      
      <div className={`${styles.layer2Container} ${isAnimationStarted ? styles.layer2Animate : ''}`}>
        <Image src="/hotField.jpg" alt="Field" className={styles.layer2Image} priority
  fill />
      </div>

      <div className={`${styles.layer1Container} ${isAnimationStarted ? styles.layer1Animate : ''}`}>
        <Image src="/hotA.jpg" alt="Hot A" className={styles.layer1Image} priority
  fill/>
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