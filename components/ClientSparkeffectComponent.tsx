'use client'
import dynamic from 'next/dynamic'

const SparkEffect = dynamic(() => import('@/components/SparkEffect'), {
  ssr: false
})

export default function ClientSparkEffect() {
  return <SparkEffect />
}