import type { App } from 'vue'

import {
  NucAuthors,
  NucCardBox,
  NucCardBoxes,
  NucCardCategory,
  NucCube,
  NucFlipCard,
  NucHomeLink,
  NucTiles,
} from '.'

export function registerNucTemplates(app: App<Element>): void {
  app
    .component('nuc-authors', NucAuthors)
    .component('nuc-card-box', NucCardBox)
    .component('nuc-card-boxes', NucCardBoxes)
    .component('nuc-card-category', NucCardCategory)
    .component('nuc-cube', NucCube)
    .component('nuc-flip-card', NucFlipCard)
    .component('nuc-home-link', NucHomeLink)
    .component('nuc-tiles', NucTiles)
}
