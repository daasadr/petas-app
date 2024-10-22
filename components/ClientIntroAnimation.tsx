'use client'
import dynamic from 'next/dynamic'
import React from 'react'

const IntroAnimation = dynamic(() => import('@/components/IntroAnimation'), {
  ssr: false
})

export default function ClientIntroAnimation() {
  return <IntroAnimation />
}