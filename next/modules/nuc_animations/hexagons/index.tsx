'use client'

import type { CSSProperties, JSX } from 'react'
import React, { useEffect, useRef, useState } from 'react'

import './_index.scss'

import type { HexagonPatternsType } from './types'
import { getHexagonPoints, updateImagesPerRow } from './utils'
import { PATTERN_UPDATE_INTERVAL } from './variables'

export function NucAnimationHexagons(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hexagonRows, setHexagonRows] = useState<HexagonPatternsType>([])

  useEffect(() => {
    updateImagesPerRow(
      containerRef.current,
      () => undefined,
      () => undefined,
      setHexagonRows
    )

    const interval = setInterval(() => {
      requestAnimationFrame(() => {
        updateImagesPerRow(
          containerRef.current,
          () => undefined,
          () => undefined,
          setHexagonRows
        )
      })
    }, PATTERN_UPDATE_INTERVAL)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="hexagon-rows-container"
      style={{ width: '100%', minHeight: '70vh', overflow: 'hidden' }}
    >
      {hexagonRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="hexagon-row-container"
          style={{ display: 'flex' }}
        >
          {['hexagon-container n1', 'hexagon-container n2'].map(
            (containerClass, containerIndex) => (
              <div
                key={containerIndex}
                className={containerClass}
                style={{ opacity: 0.15 + 0.015 * rowIndex, lineHeight: 0 }}
              >
                <svg width={row[containerIndex].length * 40} height="40">
                  {row[containerIndex].map((opacity, imgIndex) => (
                    <polygon
                      key={imgIndex}
                      className={`hexagon-${imgIndex}`}
                      style={{ opacity } as CSSProperties}
                      points={getHexagonPoints(20 + imgIndex * 40, 20, 20)}
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                  ))}
                </svg>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  )
}
