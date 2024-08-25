import { App } from 'vue'

import { Anchor, FloatLabel } from './'

export default function registerMolecules(app: App<Element>): void {
    app.component('anchor-molecule', Anchor).component(
        'float-label-molecule',
        FloatLabel
    )
}
