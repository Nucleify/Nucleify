import { App } from 'vue'

import { Anchor, FloatLabel, Tile } from './'

export default function registerMolecules(app: App): void {
  app
    .component('ad-anchor', Anchor)
    .component('ad-float-label', FloatLabel)
    .component('ad-tile', Tile)
}
