import type { App } from 'vue'

import {
  DmAuthors,
  DmCardBox,
  DmCardBoxes,
  DmCardCategory,
  DmCube,
  DmFlipCard,
  DmHomeLink,
} from '.'

export function registerDMTemplates(app: App<Element>): void {
  app
    .component('dm-authors', DmAuthors)
    .component('dm-card-box', DmCardBox)
    .component('dm-card-boxes', DmCardBoxes)
    .component('dm-card-category', DmCardCategory)
    .component('dm-cube', DmCube)
    .component('dm-flip-card', DmFlipCard)
    .component('dm-home-link', DmHomeLink)
}
