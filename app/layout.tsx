import React from 'react';
import { getNavigation } from '../sanity/sanity-utils';
import DynamicNavigation from '@/components/DynamicNavigation';
import SparkEffect from '@/components/SparkEffect';
import styles from '../styles/Layout.module.css';
import dynamic from 'next/dynamic';

// Dynamicky importujeme IntroAnimation, protože používá useState a useEffect
const IntroAnimation = dynamic(() => import('@/components/IntroAnimation'), {
  ssr: false
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigationItems = await getNavigation();

  return (
    <html lang="cs">
      <body>
        <IntroAnimation /> {/* Přidáno zde */}
        <div className={styles.mainContent}>
          <DynamicNavigation items={navigationItems} />
          <main>{children}</main>
        </div>
        <SparkEffect/>
      </body>
    </html>
  );
}