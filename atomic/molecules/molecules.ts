import { AppType } from 'vite'

import { Anchor, Calendar, FloatLabel } from './'

export default function registerMolecules(app: AppType): void {
    app.component('anchor-molecule', Anchor)
        .component('calendar-molecule', Calendar)
        .component('float-label-molecule', FloatLabel)
}
