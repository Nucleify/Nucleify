import { App } from 'vue'

import { CardDataTable } from './'

export default function registerTemplates(app: App<Element>): void {
    app.component('card-data-table', CardDataTable)
}
