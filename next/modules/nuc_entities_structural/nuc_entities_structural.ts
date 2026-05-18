import {
  NucQuestionDashboard,
  NucQuestionPage,
  NucStructuralPage,
  NucTechnologyDashboard,
  NucTechnologyPage,
} from './atomic'

interface ComponentRegistrar {
  component: (name: string, component: unknown) => ComponentRegistrar
}

export function registerNucEntitiesStructural(app: ComponentRegistrar): void {
  app
    .component('nuc-question-dashboard', NucQuestionDashboard)
    .component('nuc-question-page', NucQuestionPage)
    .component('nuc-structural-page', NucStructuralPage)
    .component('nuc-technology-page', NucTechnologyPage)
    .component('nuc-technology-dashboard', NucTechnologyDashboard)
}
