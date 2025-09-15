import type { App } from 'vue'

import { DmAuthors, DmCardBoxes, DmCardCategory, DmHomeLink } from '.'

export function registerDMTemplates(app: App<Element>): void {
  app
    .component('dm-authors', DmAuthors)
    .component('dm-card-boxes', DmCardBoxes)
    .component('dm-card-category', DmCardCategory)
    .component('dm-home-link', DmHomeLink)
}
