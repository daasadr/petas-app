import React from 'react'
import { getNavigation } from '@/sanity/sanity-utils'
import styles from '@/styles/Layout.module.css'
import LayoutClient from './LayoutClient'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationItems = await getNavigation();
  
  return (
    <html lang="cs">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
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
          `
        }} />
      </head>
      <body>
        <LayoutClient navigationItems={navigationItems}>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}