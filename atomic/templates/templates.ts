import { AppType } from 'vite'

import {
    CardChart,
    CardDataTable,
    BackLink,
    TestLoginButtons,
    Error404,
} from './'

export default function registerTemplates(app: AppType): void {
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
