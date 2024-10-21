'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../styles/Navigation.css';
import { NavItem } from './types';

interface AnimatedNavigationProps {
  items?: NavItem[];
  isHomePage: boolean;
}

const AnimatedNavigation: React.FC<AnimatedNavigationProps> = ({ items = [], isHomePage }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isSanityStudio, setIsSanityStudio] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setIsSanityStudio(window.location.pathname.startsWith('/studio'));

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const getScale = () => {
    if (scrollPosition <= 100) return 1;
    const maxScroll = 300;
    const scrollPercentage = Math.min((scrollPosition - 100) / maxScroll, 1);
    return 1 - (scrollPercentage * 0.25);
  };

  const scale = getScale();
  const isScrolled = scrollPosition > 100;

  const navStyle = {
    position: 'fixed' as const,
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    top: isScrolled ? '80px' : '50%',
    right: isScrolled ? '20px' : '50%',
    transform: isScrolled
      ? `scale(${scale}) translate(50%, -50%)`
      : 'translate(50%, -50%)',
    zIndex: 1000,
  };

  const fontStyle = {
    fontSize: `${18 * scale}px`,
  };

  if (isSanityStudio) {
    return null;
  }

  return (
    <nav style={navStyle} className={`circular-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-background">
        <div className="nav-circle">
          <div className="nav-items">
            {Array.isArray(items) && items.map((item) => {
              if (item.linkType === 'internal' && item.link) {
                return (
                  <Link key={item._id} href={item.link}>
                    <span className="nav-text" style={fontStyle}>{item.title || 'Unnamed Item'}</span>
                  </Link>
                );
              } else if (item.linkType === 'external' && item.link) {
                return (
                  <a
                    key={item._id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="nav-text" style={fontStyle}>{item.title || 'Unnamed Item'}</span>
                  </a>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AnimatedNavigation;