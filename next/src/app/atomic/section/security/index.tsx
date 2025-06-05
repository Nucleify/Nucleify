'use client'

import { useState, useRef, useEffect } from 'react'
import { AdCardBox, AdSecuritySectionInterface } from '@/app/atomic'

export function AdSecuritySection({
  items,
  className = '',
}: AdSecuritySectionInterface) {
  const [active, setActive] = useState(0)
  const touchStartXRef = useRef<number | null>(null)
  const touchMoveXRef = useRef<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [items.length])

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
    <section id="card-boxes-section-security">
      <div className="security-columns">
        <div className={`ad-card-boxes ${className}`}>
          {items.map((item, index) => (
            <AdCardBox
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              iconBelowTitle
            />
          ))}
        </div>
        <div className="security-info">
          <h3>Nie martw się o technologię</h3>
          <h2>Dbamy o bezpieczeństwo danych Twojej firmy</h2>
          <p>
            Aby Twoje dane były zawsze bezpieczne wykorzystujemy sprawdzone
            technologie oraz nowoczesną infrastrukturę firmy Google
            zlokalizowaną w Data Center w Warszawie.
          </p>
          <ul>
            <li>
              <strong>Dane szyfrowane</strong>
              <span>na poziomie infrastruktury oraz systemu.</span>
            </li>
            <li>
              <strong>Kopie zapasowe</strong>
              <span>zapisywane są na terenie Unii Europejskiej.</span>
            </li>
            <li>
              <strong>Logowanie</strong>
              <span>do systemu obsługuje weryfikację dwuetapową.</span>
            </li>
            <li>
              <strong>RODO / GDPR</strong>
              <span>system spełnia wymogi zgodności.</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="ad-card-carousel-security">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(calc(-${active * 100}% - ${active * 1}rem))`,
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
                iconBelowTitle
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
