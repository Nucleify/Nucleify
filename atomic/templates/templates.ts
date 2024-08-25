import { App } from 'vue'

import { CardChart, CardDataTable, BackLink, TestLoginButtons } from './'

export default function registerTemplates(app: App<Element>): void {
    app.component('back-link', BackLink)
        .component('card-chart', CardChart)
        .component('card-data-table', CardDataTable)
        .component('test-login-buttons', TestLoginButtons)
}
