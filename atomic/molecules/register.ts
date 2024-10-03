import { AppType } from 'vite'

import { Anchor, Calendar, FloatLabel } from './'

export default function registerMolecules(app: AppType): void {
    app.component('ad-anchor', Anchor)
        .component('ad-calendar', Calendar)
        .component('ad-float-label', FloatLabel)
}
