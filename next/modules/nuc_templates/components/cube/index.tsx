import type { JSX } from 'react'

import { AdIcon, type NucCubeInterface } from 'nucleify'

export function NucCube({
  icon = 'prime:box',
  shiny,
}: NucCubeInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  return (
    <div className={cx('cube', shiny && 'shiny')}>
      <AdIcon icon={icon} />
    </div>
  )
}
