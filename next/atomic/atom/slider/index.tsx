import { Slider } from 'primereact/slider'
import type { JSX } from 'react'

import type { SliderInterface } from './types'

export function AdSlider({ adType, ...rest }: SliderInterface): JSX.Element {
  return <Slider {...rest} />
}
