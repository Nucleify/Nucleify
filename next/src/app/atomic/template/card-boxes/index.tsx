import { JSX } from 'react'
import './CardBoxes.scss'
import { AdCardBoxesProps } from './types'
import AdCard from '../../molecule/card/index.tsx'
import AdCardContent from '../../molecule/card/parts/card-content/index.tsx'

export default function AdCardBoxes({
  items,
  className = '',
}: AdCardBoxesProps): JSX.Element {
  return (
    <section className="cards-section">
      <div className={`ad-card-boxes ${className}`}>
        {items.map((item, index) => (
          <AdCard key={index}>
            <AdCardContent>
              <div className="ad-card-icon">{item.icon}</div>
              <div className="ad-card-text">
                <h3 className="ad-card-title">{item.title}</h3>
                <p className="ad-card-description">{item.description}</p>
              </div>
            </AdCardContent>
          </AdCard>
        ))}
      </div>
    </section>
  )
}
