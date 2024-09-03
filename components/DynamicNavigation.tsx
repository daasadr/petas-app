'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import AnimatedNavigation from './AnimatedNavigation';
import { NavItem } from './Navigation';
import styles from '../styles/Navigation.module.css';


interface DynamicNavigationProps {
  items: NavItem[];
}

const DynamicNavigation: React.FC<DynamicNavigationProps> = ({ items }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return isHomePage ? (
    <Navigation items={items} className={styles.homepageNav} />
  ) : (
    <AnimatedNavigation items={items} isHomePage={isHomePage} />
  );
};

export default DynamicNavigation;