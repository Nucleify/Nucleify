import type { App } from 'vue'

import {
  NucArticleDashboard,
  NucArticlePage,
  NucContactDashboard,
  NucContactPage,
  NucEntitiesPage,
  NucMoneyDashboard,
  NucMoneyPage,
  NucUserDashboard,
} from './atomic'

export function registerNucEntities(app: App<Element>): void {
  app
    .component('nuc-article-page', NucArticlePage)
    .component('nuc-contact-page', NucContactPage)
    .component('nuc-entities-page', NucEntitiesPage)
    .component('nuc-money-page', NucMoneyPage)
    .component('nuc-article-dashboard', NucArticleDashboard)
    .component('nuc-contact-dashboard', NucContactDashboard)
    .component('nuc-money-dashboard', NucMoneyDashboard)
    .component('nuc-user-dashboard', NucUserDashboard)
}
