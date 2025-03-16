import { App } from 'vue'

import {
  LinkPage,
  QuestionPage,
  StructuralPage,
  TechnologyPage,
  LinkDashboard,
  QuestionDashboard,
  TechnologyDashboard,
} from './atomic'

export function registerDMEntitiesStructural(app: App<Element>): void {
  app
    .component('dm-link-page', LinkPage)
    .component('dm-question-page', QuestionPage)
    .component('dm-structural-page', StructuralPage)
    .component('dm-technology-page', TechnologyPage)
    .component('dm-link-dashboard', LinkDashboard)
    .component('dm-question-dashboard', QuestionDashboard)
    .component('dm-technology-dashboard', TechnologyDashboard)
}
