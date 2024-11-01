'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import styles from '@/styles/GlowingTitle.module.css';
import Link from 'next/link';

// Přidáme prop pro rozlišení, zda je to hlavní homepage title
const GlowingTitle = ({ isMainHomeTitle = false }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Pokud jsme na homepage a je to mainHomeTitle, použijeme homepage styly
  // Jinak použijeme subpage styly
  const titleWrapperClasses = `
    ${styles.titleWrapper}
    ${(isHomePage && isMainHomeTitle) ? styles.homepageTitle : styles.subpageTitle}
  `;

  const titleClasses = `
    ${styles.glowingTitle}
    ${(isHomePage && isMainHomeTitle) ? styles.homepageGlowingTitle : styles.subpageGlowingTitle}
  `;

  return (
    <Link href="/" className={styles.linkWrapper}>
      <div className={titleWrapperClasses}>
        <h1 className={titleClasses}>
          ARCANA KNIFE
        </h1>
      </div>
    </Link>
  );
};

export default GlowingTitle;