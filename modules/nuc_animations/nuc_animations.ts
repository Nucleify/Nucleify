import type { App } from 'vue'

import { NucAnimationBounce, NucAnimationHexagons } from '.'

export function registerNucAnimations(app: App<Element>): void {
  app
    .component('nuc-animation-bounce', NucAnimationBounce)
    .component('nuc-animation-hexagons', NucAnimationHexagons)
}
