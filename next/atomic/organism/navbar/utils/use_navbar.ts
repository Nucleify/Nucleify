'use client'

import { useCallback, useState } from 'react'

import type { UseNavbarInterface } from '../types'

export function useNavbar(): UseNavbarInterface {
  const [navbarExpanded, setNavbarExpanded] = useState(false)

  const toggleNavbar = useCallback(() => {
    setNavbarExpanded((prev) => !prev)
  }, [])

  return {
    navbarExpanded,
    toggleNavbar,
  }
}
