import type { App } from 'vue'

import {
  DmSectionCategory,
  DmSectionContact,
  DmSectionFaq,
  DmSectionFooter,
  DmSectionNavbar,
  DmSectionStack,
  DmSectionStart,
  DmSectionWhyUs,
} from './components'

export function registerDMSections(app: App<Element>): void {
  app
    .component('dm-section-category', DmSectionCategory)
    .component('dm-section-contact', DmSectionContact)
    .component('dm-section-faq', DmSectionFaq)
    .component('dm-section-footer', DmSectionFooter)
    .component('dm-section-navbar', DmSectionNavbar)
    .component('dm-section-stack', DmSectionStack)
    .component('dm-section-start', DmSectionStart)
    .component('dm-section-why-us', DmSectionWhyUs)
}
