'use client'

import type { JSX } from 'react'

import { AdIcon } from 'nucleify'

import './_index.scss'

const technologies = [
  { icon: 'mdi:nuxt', label: 'Nuxt' },
  { icon: 'mdi:vuejs', label: 'Vue' },
  { icon: 'mdi:language-typescript', label: 'TypeScript' },
  { icon: 'mdi:laravel', label: 'Laravel' },
  { icon: 'mdi:docker', label: 'Docker' },
  { icon: 'mdi:database', label: 'MySQL' },
]

export function NucTechnologies(): JSX.Element {
  return (
    <section id="technologies">
      <div className="swiper-container">
        <div className="mySwiper">
          {technologies.map((tech) => (
            <div key={tech.label} className="cube" aria-label={tech.label}>
              <AdIcon icon={tech.icon} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
