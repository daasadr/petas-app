"use client";
import { useEffect, useState } from 'react';
import styles from '../styles/IntroAnimation.module.css';

const IntroAnimation = () => {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
    if (hasSeenAnimation) {
      setShowAnimation(false);
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        setShowAnimation(true);
        setIsAnimationStarted(false);
        sessionStorage.removeItem('hasSeenAnimation');
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
    }, 7000);
  };

  if (!showAnimation) {
    return null;
  }

  return (
    <div className={styles.overlay}>      
      <div className={`${styles.layer2Container} ${isAnimationStarted ? styles.layer2Animate : ''}`}>
        <img src="/hotField.jpg" alt="Field" className={styles.layer2Image} />
      </div>

      <div className={`${styles.layer1Container} ${isAnimationStarted ? styles.layer1Animate : ''}`}>
        <img src="/hotA.jpg" alt="Hot A" className={styles.layer1Image} />
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