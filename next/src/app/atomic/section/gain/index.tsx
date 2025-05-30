'use client'

import { useState, useRef, useEffect } from 'react'
import { AdCardBox } from '@/app/atomic'
import { AdGainSectionInterface } from './types'

export function AdGainSection({
  items,
  className = '',
}: AdGainSectionInterface) {
  const [active, setActive] = useState(0)
  const touchStartXRef = useRef<number | null>(null)
  const touchMoveXRef = useRef<number | null>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [items.length])

  useEffect(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % items.length)
      }, 4000)
    }
  })

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
    touchMoveXRef.current = null
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    touchMoveXRef.current = e.touches[0].clientX
  }
  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchMoveXRef.current !== null) {
      const delta = touchStartXRef.current - touchMoveXRef.current
      if (delta > 50 && active < items.length - 1) setActive(active + 1)
      else if (delta < -50 && active > 0) setActive(active - 1)
    }
    touchStartXRef.current = null
    touchMoveXRef.current = null
  }

  return (
    <section id="card-boxes-section">
      <h2 className="title">Co zyskasz wybierając Tillio?</h2>
      <div className={`ad-card-boxes ${className}`}>
        {items.map((item, index) => (
          <AdCardBox
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <div className="ad-card-carousel">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${active * 100}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, idx) => (
            <div className="carousel-slide" key={idx}>
              <AdCardBox
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`dot${active === idx ? ' active' : ''}`}
              onClick={() => setActive(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
