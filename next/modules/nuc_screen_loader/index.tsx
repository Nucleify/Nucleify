'use client'

import React, { useEffect, useState } from 'react'

import { AdLogoSvg } from '../../atomic/atom/logo/svg'
import { AdProgressBar } from '../../atomic/atom/progress-bar'

import './_index.scss'

export function NucScreenLoader(): React.JSX.Element | null {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="screen-loader-container">
      <div className="screen-loader-content">
        <div className="loader-image">
          <AdLogoSvg adType="main" dimensions={125} />
        </div>

        <AdProgressBar
          mode="indeterminate"
          style={{ width: '100px', height: '10px' }}
        />
      </div>
    </div>
  )
}
