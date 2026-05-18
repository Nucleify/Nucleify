import type { JSX } from 'react'

import { AdAnchor, AdDeferredContent, AdImage } from 'nucleify'

import styles from './index.module.scss'

export function NucAuthors(): JSX.Element {
  return (
    <AdAnchor
      href="https://github.com/Atomic-IT"
      className={styles['template-authors']}
      rel="noreferrer"
      target="_blank"
    >
      made by Atomic IT
      <AdDeferredContent>
        <AdImage
          src="/img/atomic-logo.webp"
          width="28"
          height="28"
          alt="Atomic IT logo"
          loading="lazy"
        />
      </AdDeferredContent>
    </AdAnchor>
  )
}
