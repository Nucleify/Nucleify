import type { App } from 'vue'

import {
  NucAboutPage,
  NucBlogPage,
  NucDashboardPage,
  NucError404Page,
  NucHomePage,
  NucLicensePage,
  NucServicesPage,
} from './pages'

export function registerNucPages(app: App<Element>): void {
  app
    .component('nuc-about-page', NucAboutPage)
    .component('nuc-blog-page', NucBlogPage)
    .component('nuc-dashboard-page', NucDashboardPage)
    .component('nuc-error-404-page', NucError404Page)
    .component('nuc-home-page', NucHomePage)
    .component('nuc-license-page', NucLicensePage)
    .component('nuc-services-page', NucServicesPage)
}
