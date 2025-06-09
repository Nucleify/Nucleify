import type { App } from 'vue'

import { AnimationBounce, AnimationHexagons } from '.'

export function registerDMAnimations(app: App<Element>): void {
  app
    .component('dm-animation-bounce', AnimationBounce)
    .component('dm-animation-hexagons', AnimationHexagons)
}
