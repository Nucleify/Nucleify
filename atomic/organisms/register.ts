import { AppType } from 'vite'

import {
    Card,
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
         *  Card
         */
        .component('ad-card', Card)

        /**
         *  Chart
         */
        .component('ad-chart', Chart)

        /**
         *  DataTable
         */
        .component('ad-data-table', DataTable)
        .component('ad-data-table-skeleton', DataTableSkeleton)

        /**
         *  Dialog
         */
        .component('ad-dialog', Dialog)

        /**
         *  Dock
         */
        .component('ad-dock', Dock)

        /**
         *  OverlayPanel
         */
        .component('ad-overlay-panel', OverlayPanel)

        /**
         *  Password
         */
        .component('ad-password', Password)

        /**
         *  Terminal
         */
        .component('ad-terminal', Terminal)

        /**
         *  Tile
         */
        .component('ad-tile', Tile)
}
