import { App } from 'vue'

import { Chart, DataTable, Dialog, Dock } from './'

export default function registerOrganisms(app: App<Element>): void {
    app.component('chart-organism', Chart)
        .component('data-table-organism', DataTable)
        .component('dialog-organism', Dialog)
        .component('dock-organism', Dock)
}
