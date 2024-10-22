import { ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
}

export interface SanityDocument {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: string
}