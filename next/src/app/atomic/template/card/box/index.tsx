import { JSX } from 'react'
import Image from 'next/image'

import { AdCardBoxInterface } from './types'

import AdCard from 'molecule/card/index.tsx'
import AdCardContent from 'molecule/card/parts/card-content/index.tsx'

export function AdCardBox({
  icon,
  title,
  description,
}: AdCardBoxInterface): JSX.Element {
  return (
    <AdCard>
      <AdCardContent>
        <div className="ad-card-icon">
          <Image src={icon} alt={title} width={32} height={32} />
        </div>
        <div className="ad-card-text">
          <h3 className="ad-card-title">{title}</h3>
          <p className="ad-card-description">{description}</p>
        </div>
      </AdCardContent>
    </AdCard>
  )
}
