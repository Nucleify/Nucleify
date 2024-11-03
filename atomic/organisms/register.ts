import { App } from 'vue'

import {
  Calendar,
  Card,
  Chart,
  ColorPicker,
  DataTable,
  DataTableSkeleton,
  Dialog,
  Dock,
  OverlayPanel,
  Password,
  Terminal,
} from './'

export default function registerOrganisms(app: App): void {
  app
    .component('ad-calendar', Calendar)
    .component('ad-card', Card)
    .component('ad-chart', Chart)
    .component('ad-color-picker', ColorPicker)
    .component('ad-data-table', DataTable)
    .component('ad-data-table-skeleton', DataTableSkeleton)
    .component('ad-dialog', Dialog)
    .component('ad-dock', Dock)
    .component('ad-overlay-panel', OverlayPanel)
    .component('ad-password', Password)
    .component('ad-terminal', Terminal)
}
