import { App } from 'vue'

import { Anchor, Calendar, FloatLabel } from './'

export default function registerMolecules(app: App<Element>): void {
    app.component('anchor-molecule', Anchor)
        .component('calendar-molecule', Calendar)
        .component('float-label-molecule', FloatLabel)
}
