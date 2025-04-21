import { App } from 'vue'

import { AnimationHexagons } from './hexagons'

export function registerDMAnimations(app: App<Element>): void {
  app.component('dm-animation-hexagons', AnimationHexagons)
}
