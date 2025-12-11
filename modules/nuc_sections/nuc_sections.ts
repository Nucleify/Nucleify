import type { App } from 'vue'

import {
  NucSectionCategory,
  NucSectionContact,
  NucSectionFaq,
  NucSectionFooter,
  NucSectionNavbar,
  NucSectionStack,
  NucSectionStart,
  NucSectionWhyUs,
} from './components'

export function registerNucSections(app: App<Element>): void {
  app
    .component('nuc-section-category', NucSectionCategory)
    .component('nuc-section-contact', NucSectionContact)
    .component('nuc-section-faq', NucSectionFaq)
    .component('nuc-section-footer', NucSectionFooter)
    .component('nuc-section-navbar', NucSectionNavbar)
    .component('nuc-section-stack', NucSectionStack)
    .component('nuc-section-start', NucSectionStart)
    .component('nuc-section-why-us', NucSectionWhyUs)
}
