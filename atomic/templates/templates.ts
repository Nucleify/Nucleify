import { App } from 'vue'

import {
    CardChart,
    CardDataTable,
    BackLink,
    TestLoginButtons,
    Error404,
} from './'

export default function registerTemplates(app: App<Element>): void {
    app
        /**
         *  Anchor
         */
        .component('back-link', BackLink)

        /**
         *  Button
         */
        .component('test-login-buttons', TestLoginButtons)

        /**
         *  Card
         */
        .component('card-chart', CardChart)
        .component('card-data-table', CardDataTable)

        /**
         *  Errors
         */
        .component('error404', Error404)
}
