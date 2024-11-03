import { App } from 'vue'

import {
  CardChart,
  CardDataTable,
  BackLink,
  TestLoginButtons,
  Error404,
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
    .component('ad-card-chart', CardChart)
    .component('ad-card-data-table', CardDataTable)

    /**
     *  Errors
     */
    .component('ad-error-404', Error404)
}
