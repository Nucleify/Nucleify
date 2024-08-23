import { App } from 'vue'

import { CardChart, CardDataTable } from './'

export default function registerTemplates(app: App<Element>): void {
    app.component('card-chart', CardChart).component(
        'card-data-table',
        CardDataTable
    )
}
