'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import styles from '@/styles/Layout.module.css'
import ClientDynamicNavigation from '@/components/ClientDynamicNavigation'
import ClientSparkEffect from '@/components/ClientSparkeffectComponent'
import GlowingTitle from '@/components/GlowingTitleComponent'
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
  const isHomePage = pathname === '/'
  
  return (
    <>
      <DynamicIntroLoader />
      <div id="mainContentWrapper">
        {!isHomePage && <GlowingTitle />} {/* Zobrazí malý title pouze na podstránkách */}
        <ClientDynamicNavigation items={navigationItems} />
        <main className={`${styles.main} ${isHomePage ? styles.homepageMain : ''}`}>
          <div className={isHomePage ? styles.homepageContent : ''}>
            {children}
          </div>
        </main>
      </div>
      <ClientSparkEffect />
    </>
  )
}