'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../styles/Navigation.css';
import { NavItem } from './types';

interface AnimatedNavigationProps {
  items?: NavItem[];
  isHomePage: boolean;
}

const AnimatedNavigation: React.FC<AnimatedNavigationProps> = ({ items = [] }) => {
  const [isSanityStudio, setIsSanityStudio] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSanityStudio(window.location.pathname.startsWith('/studio'));
    }
  }, []);

  if (isSanityStudio) {
    return null;
  }

  return (
    <nav className="circular-nav">
      <div className="nav-background">
        <div className="nav-circle">
          <div className="nav-items">
            {Array.isArray(items) && items.map((item, index) => {
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