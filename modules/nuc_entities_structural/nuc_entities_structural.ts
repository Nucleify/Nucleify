import type { App } from 'vue'

import {
  NucCardDashboard,
  NucCardPage,
  NucFeatureDashboard,
  NucFeaturePage,
  NucLinkDashboard,
  NucLinkPage,
  NucQuestionDashboard,
  NucQuestionPage,
  NucStructuralPage,
  NucTechnologyDashboard,
  NucTechnologyPage,
} from './atomic'

export function registerNucEntitiesStructural(app: App<Element>): void {
  app
    .component('nuc-card-dashboard', NucCardDashboard)
    .component('nuc-card-page', NucCardPage)
    .component('nuc-feature-dashboard', NucFeatureDashboard)
    .component('nuc-feature-page', NucFeaturePage)
    .component('nuc-link-dashboard', NucLinkDashboard)
    .component('nuc-link-page', NucLinkPage)
    .component('nuc-question-dashboard', NucQuestionDashboard)
    .component('nuc-question-page', NucQuestionPage)
    .component('nuc-structural-page', NucStructuralPage)
    .component('nuc-technology-page', NucTechnologyPage)
    .component('nuc-technology-dashboard', NucTechnologyDashboard)
}
