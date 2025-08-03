import type { JSX } from 'react'

import AdCard from 'molecule/card/index.tsx'
import AdCardContent from 'molecule/card/parts/card-content/index.tsx'
import Image from 'next/image'
import type { AdCardBoxInterface } from './types'

import './_index.scss'

export function AdCardBox({
  icon,
  title,
  description,
  iconBelowTitle = false,
}: AdCardBoxInterface & { iconBelowTitle?: boolean }): JSX.Element {
  return (
    <AdCard>
      <AdCardContent>
        {iconBelowTitle ? (
          <div className="ad-card-text">
            <h3 className="ad-card-title">{title}</h3>
            <div className="ad-card-icon">
              <Image src={icon} alt={title} width={32} height={32} />
            </div>
            <p className="ad-card-description">{description}</p>
          </div>
        ) : (
          <>
            <div className="ad-card-icon">
              <Image src={icon} alt={title} width={32} height={32} />
            </div>
            <div className="ad-card-text">
              <h3 className="ad-card-title">{title}</h3>
              <p className="ad-card-description">{description}</p>
            </div>
          </>
        )}
      </AdCardContent>
    </AdCard>
  )
}
