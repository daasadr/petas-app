'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../styles/Navigation.css';
import { NavItem } from './Navigation';

const AnimatedNavigation: React.FC<{ items: NavItem[], isHomePage: boolean }> = ({ items, isHomePage }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

   const navStyle = {
    position: 'fixed' as const,
    transition: 'all 0.3s ease-in-out',
    transform: scrollPosition > 100
      ? 'translate(50%, -50%) scale(0.7)'
      : 'translate(-50%, -50%)',
    top: scrollPosition > 100 ? '80px' : '50%',
    right: scrollPosition > 100 ? '-150px' : '50%',
    zIndex: 1000,
  };

  return (
    <nav style={navStyle} className="circular-nav">
      <div className="nav-background">
        <div className="nav-circle">
          <div className="nav-items">
            {items.map((item) => {
              if (item.linkType === 'internal' && item.link) {
                return (
                  <Link key={item._id} href={item.link}>
                    <span className="nav-text">{item.title || 'Unnamed Item'}</span>
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
                    <span className="nav-text">{item.title || 'Unnamed Item'}</span>
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