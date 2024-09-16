import { App } from 'vue'

import { Chart, DataTable, DataTableSkeleton, Dialog, Dock, Password } from './'

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
         *  Password
         */
        .component('password-organism', Password)
}
