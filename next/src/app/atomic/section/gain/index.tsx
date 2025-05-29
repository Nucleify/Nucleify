import { JSX } from 'react'

import { AdCardBox } from '@/app/atomic'

import { AdGainSectionInterface } from './types'

export function AdGainSection({
  items,
  className = '',
}: AdGainSectionInterface): JSX.Element {
  return (
    <section id="card-boxes-template">
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
    </section>
  )
}
