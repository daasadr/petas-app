'use client'

import React from 'react'
import styles from '@/styles/Layout.module.css'
import ClientDynamicNavigation from '@/components/ClientDynamicNavigation'
import ClientSparkEffect from '@/components/ClientSparkeffectComponent'
import dynamic from 'next/dynamic'

const DynamicIntroLoader = dynamic(
  () => import('@/components/IntroLoader').then(mod => mod.IntroLoader),
  { ssr: false }
);

interface LayoutClientProps {
  children: React.ReactNode;
  navigationItems: any; // Upravte typ podle vaší implementace
}

export default function LayoutClient({ children, navigationItems }: LayoutClientProps) {
  return (
    <>
      <DynamicIntroLoader />
      <div id="mainContentWrapper">
        <header className={styles.header}>
          <ClientDynamicNavigation items={navigationItems} />
        </header>
        <main className={styles.main}>
          {children}
        </main>
        <footer className={styles.footer}>
          {/* Footer obsah */}
        </footer>
      </div>
      <ClientSparkEffect />
    </>
  );
}