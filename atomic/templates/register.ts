import { App } from 'vue'

import {
  BackLink,
  TestLoginButtons,
  CardCategorySection,
  CardCategorySingle,
  CardChart,
  CardDataTable,
  ScreenLoader,
} from './'

export default function registerTemplates(app: App): void {
  app
    /**
     *  Anchor
     */
    .component('ad-back-link', BackLink)

    /**
     *  Button
     */
    .component('ad-test-login-buttons', TestLoginButtons)

    /**
     *  Card
     */
    .component('ad-card-category-section', CardCategorySection)
    .component('ad-card-category-single', CardCategorySingle)
    .component('ad-card-chart', CardChart)
    .component('ad-card-data-table', CardDataTable)

    /**
     *  Screen
     */
    .component('ad-screen-loader', ScreenLoader)
}
