import { App } from 'vue'

import { ChartOrganism, DialogOrganism, DockOrganism } from './'

export default function registerOrganisms(app: App<Element>): void {
    app.component('chart-organism', ChartOrganism)
        .component('dialog-organism', DialogOrganism)
        .component('dock-organism', DockOrganism)
}
