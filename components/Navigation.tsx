import React from 'react';
import Link from 'next/link';
import { NavItem } from './types';
import styles from '../styles/Navigation.module.css';


export interface NavigationProps {
  items: NavItem[];
  className?: string;
}

export default function Navigation({ items, className }: NavigationProps) {
  // Odfiltrujeme položku homepage
  const filteredItems = items.filter(item => 
    !(item.linkType === 'internal' && item.link === '/')
  );

  if (!filteredItems || filteredItems.length === 0) {
    return <nav className={className}>No navigation items available</nav>;
  }

  return (
    <nav className={`${styles.circularNav} ${className || ''}`}>
      <div className={styles.navBackground}>
        <div className={styles.navCircle}>
          <div className={styles.navItems}>
            {filteredItems.map((item) => {
              if (item.linkType === 'internal' && item.link) {
                return (
                  <Link 
                    key={item._id} 
                    href={item.link} 
                    className={styles.navItem}
                  >
                    <span className={styles.navText}>{item.title || 'Unnamed Item'}</span>
                  </Link>
                );
              } else if (item.linkType === 'external' && item.link) {
                return (
                  <a
                    key={item._id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navItem}
                  >
                    <span className={styles.navText}>{item.title || 'Unnamed Item'}</span>
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
}