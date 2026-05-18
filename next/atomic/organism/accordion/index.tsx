'use client'

import { Accordion, AccordionTab } from 'primereact/accordion'
import type { ReactNode } from 'react'

import styles from './index.module.scss'
import type { AccordionInterface } from './types/interfaces'

export function AdAccordion({
  panels,
  hexagons,
  className = '',
  ...rest
}: AccordionInterface): ReactNode {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    container: {
      root: { className: styles['ad-accordion'] },
    },
    item: {
      root: { className: styles['ad-accordionpanel'] },
      header: { className: styles['ad-accordionheader'] },
      headerAction: { className: styles['ad-accordionheader-action'] },
      headerIcon: { className: styles['ad-accordionheader-toggle-icon'] },
      content: { className: styles['ad-accordion-content'] },
    },
  }

  const hasPanels = panels && panels.length > 0

  return (
    hasPanels && (
      <Accordion
        {...rest}
        className={cx(styles['ad-accordion'], className)}
        pt={pt.container}
      >
        {panels.map((panel, index) => (
          <AccordionTab
            key={index}
            pt={pt.item}
            header={
              <>
                {hexagons && (
                  <div className={styles['ad-hexagon-rows-container']} />
                )}
                {panel.content}
              </>
            }
          >
            {panel.answer}
          </AccordionTab>
        ))}
      </Accordion>
    )
  )
}
