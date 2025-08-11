import type { App } from 'vue'

import {
  ArticleDashboard,
  ArticlePage,
  ContactDashboard,
  ContactPage,
  EntitiesPage,
  MoneyDashboard,
  MoneyPage,
  UserDashboard,
} from './atomic'

export function registerDMEntities(app: App<Element>): void {
  app
    .component('dm-article-page', ArticlePage)
    .component('dm-contact-page', ContactPage)
    .component('dm-entities-page', EntitiesPage)
    .component('dm-money-page', MoneyPage)
    .component('dm-article-dashboard', ArticleDashboard)
    .component('dm-contact-dashboard', ContactDashboard)
    .component('dm-money-dashboard', MoneyDashboard)
    .component('dm-user-dashboard', UserDashboard)
}
