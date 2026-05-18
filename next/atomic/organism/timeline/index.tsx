'use client'

import { Timeline } from 'primereact/timeline'
import type { JSX } from 'react'

import type { AdTimelineProps } from './types'

export function AdTimeline({
  className,
  events,
  renderEvent,
  ...props
}: AdTimelineProps): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  return (
    <Timeline
      {...props}
      value={events}
      className={cx(className, 'ad-timeline')}
      content={renderEvent}
    />
  )
}
