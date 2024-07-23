import { App } from 'vue'

import { AnchorMolecule, FloatLabelMolecule } from './'

export default function registerMolecules(app: App<Element>): void {
    app.component('anchor-molecule', AnchorMolecule).component(
        'float-label-molecule',
        FloatLabelMolecule
    )
}
