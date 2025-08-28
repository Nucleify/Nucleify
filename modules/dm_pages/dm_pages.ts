import type { App } from 'vue'

import {
  AboutPage,
  BlogPage,
  DashboardPage,
  Error404Page,
  HomePage,
  LicensePage,
  ServicesPage,
} from './pages'

export function registerDMPages(app: App<Element>): void {
  app
    .component('dm-about-page', AboutPage)
    .component('dm-blog-page', BlogPage)
    .component('dm-dashboard-page', DashboardPage)
    .component('dm-error-404-page', Error404Page)
    .component('dm-home-page', HomePage)
    .component('dm-license-page', LicensePage)
    .component('dm-services-page', ServicesPage)
}
