import { AppType } from 'vite'

import {
    Chart,
    DataTable,
    DataTableSkeleton,
    Dialog,
    Dock,
    OverlayPanel,
    Password,
    Terminal,
    Tile,
} from './'

export default function registerOrganisms(app: AppType): void {
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
         *  Terminal
         */
        .component('terminal-organism', Terminal)

        /**
         *  Tile
         */
        .component('tile-organism', Tile)
}
