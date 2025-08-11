import type { App } from 'vue'

import {
  CardDashboard,
  CardPage,
  FeatureDashboard,
  FeaturePage,
  LinkDashboard,
  LinkPage,
  QuestionDashboard,
  QuestionPage,
  StructuralPage,
  TechnologyDashboard,
  TechnologyPage,
} from './atomic'

export function registerDMEntitiesStructural(app: App<Element>): void {
  app
    .component('dm-card-page', CardPage)
    .component('dm-feature-page', FeaturePage)
    .component('dm-link-page', LinkPage)
    .component('dm-question-page', QuestionPage)
    .component('dm-structural-page', StructuralPage)
    .component('dm-technology-page', TechnologyPage)
    .component('dm-card-dashboard', CardDashboard)
    .component('dm-feature-dashboard', FeatureDashboard)
    .component('dm-link-dashboard', LinkDashboard)
    .component('dm-question-dashboard', QuestionDashboard)
    .component('dm-technology-dashboard', TechnologyDashboard)
}
