import React from 'react'
import { getNavigation } from '@/sanity/sanity-utils'
import styles from '@/styles/Layout.module.css'
import ClientIntroAnimation from '@/components/ClientIntroAnimation'
import ClientDynamicNavigation from '@/components/ClientDynamicNavigation'
import ClientSparkEffect from '@/components/ClientSparkeffectComponent'
import { Metadata } from 'next'

// Metadata pro layout
export const metadata: Metadata = {
  title: {
    template: '%s | Název Vašeho Webu',
    default: 'Název Vašeho Webu', // Nahraďte svým názvem
  },
  description: 'Výchozí popis vašeho webu',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigationItems = await getNavigation()

  return (
    <html lang="cs">
      <head>
  <style dangerouslySetInnerHTML={{ __html: `
    body {
      background-color: #121212;
      margin: 0;
      padding: 0;
    }
    
    #mainContentWrapper {
      visibility: hidden;
      opacity: 0;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #121212;
      z-index: 1;
      transition: opacity 1s ease-in;
    }
  `}} />
</head>

      <body>
        {/* Přednačtení obrázků */}
        <div className="loading-overlay" id="loadingOverlay">
        </div>
        <ClientIntroAnimation />
        <div id="mainContentWrapper" >
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
      </body>
    </html>
  )
}