import React from 'react'
import { Metadata } from 'next'
import styles from '../../styles/HomePage.module.css'

export const metadata: Metadata = {
  title: 'Homepage | Název Vašeho Webu',
  description: 'Homepage popis',
}

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.homepageContainer}>
      {children}
    </div>
  )
}