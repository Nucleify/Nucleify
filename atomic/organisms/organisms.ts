import { App } from 'vue'

import {
    Chart,
    DataTable,
    DataTableSkeleton,
    Dialog,
    Dock,
    OverlayPanel,
    Password,
    Terminal,
} from './'

export default function registerOrganisms(app: App<Element>): void {
    app
        /**
         *  Chart
         */
        .component('chart-organism', Chart)

        /**
         *  DataTable
         */
        .component('data-table-organism', DataTable)
        .component('data-table-skeleton', DataTableSkeleton)

        /**
         *  Dialog
         */
        .component('dialog-organism', Dialog)

        /**
         *  Dock
         */
        .component('dock-organism', Dock)

        /**
         *  OverlayPanel
         */
        .component('overlay-panel-organism', OverlayPanel)

        /**
         *  Password
         */
        .component('password-organism', Password)

        /**
         *
         */
        .component('terminal-organism', Terminal)
}
