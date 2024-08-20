import { App } from 'vue'

import {
    ChartOrganism,
    DataTableOrganism,
    DialogOrganism,
    DockOrganism,
} from './'

export default function registerOrganisms(app: App<Element>): void {
    app.component('chart-organism', ChartOrganism)
        .component('data-table-organism', DataTableOrganism)
        .component('dialog-organism', DialogOrganism)
        .component('dock-organism', DockOrganism)
}
