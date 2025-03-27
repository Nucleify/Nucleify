import { App } from 'vue'

import {
  FeaturePage,
  LinkPage,
  QuestionPage,
  StructuralPage,
  TechnologyPage,
  FeatureDashboard,
  LinkDashboard,
  QuestionDashboard,
  TechnologyDashboard,
} from './atomic'

export function registerDMEntitiesStructural(app: App<Element>): void {
  app
    .component('dm-feature-page', FeaturePage)
    .component('dm-link-page', LinkPage)
    .component('dm-question-page', QuestionPage)
    .component('dm-structural-page', StructuralPage)
    .component('dm-technology-page', TechnologyPage)
    .component('dm-feature-dashboard', FeatureDashboard)
    .component('dm-link-dashboard', LinkDashboard)
    .component('dm-question-dashboard', QuestionDashboard)
    .component('dm-technology-dashboard', TechnologyDashboard)
}
