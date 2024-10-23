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
        <meta charSet="utf-8" />
        <style>{`
          .hide-content {
            opacity: 0;
            transition: opacity 0.3s;
          }
          .show-content {
            opacity: 1;
          }
        `}</style>
        <link
  rel="preload"
  href="/hotField.jpg"
  as="image"
/>
<link
  rel="preload"
  href="/hotA.jpg"
  as="image"
/>
      </head>
      <body>
        <ClientIntroAnimation />
        <div id="mainContentWrapper" className="hide-content">
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