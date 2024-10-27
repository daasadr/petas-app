'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
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
  navigationItems: any;
}

export default function LayoutClient({ children, navigationItems }: LayoutClientProps) {
  const pathname = usePathname()
  
  useEffect(() => {
    // Přidáme třídu na body podle typu stránky
    const isHomePage = pathname === '/'
    document.body.classList.remove('homepage', 'not-homepage')
    document.body.classList.add(isHomePage ? 'homepage' : 'not-homepage')
    
    // Zajistíme správné nastavení scrollování pro podstránky
    if (!isHomePage) {
      const mainContent = document.getElementById('mainContentWrapper')
      if (mainContent) {
        mainContent.style.position = 'relative'
        mainContent.style.overflow = 'auto'
        mainContent.style.height = 'auto'
      }
    }
  }, [pathname])

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
  )
}