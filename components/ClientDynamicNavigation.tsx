'use client'
import React from 'react'
import DynamicNavigation from './DynamicNavigation'
import { NavItem } from './types'

interface Props {
  items: NavItem[]
}
export default function ClientDynamicNavigation({ items } : Props) {
  return <DynamicNavigation items={items} />
}