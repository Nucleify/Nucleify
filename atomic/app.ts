/**
 *  Styles
 */
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'sass/index.scss'

/**
 *  App
 */
import { AppType } from 'vite'
import { createApp } from 'vue'

export const app: AppType = createApp({})

import registerOldStructure from './old'
import registerPrimeVue from './primevue'
// import { registerAtoms } from './atoms'
// import { registerMolecules } from './molecules'
// import { registerOrganisms } from './organisms'
// import { registerTemplates } from './templates'
import { registerGlobalConstants } from './bosons/constants'
import { registerGlobalUtils } from './bosons/utils'

registerOldStructure(app)
registerPrimeVue(app)
// registerAtoms(app)
// registerMolecules(app)
// registerOrganisms(app)
// registerTemplates(app)
registerGlobalConstants(app)
registerGlobalUtils(app)

/**
 *  Use this bellow if your IDE can't find Atomic Design components
 */
import {
    Avatar,
    Button,
    ColorPicker,
    Header,
    Icon,
    Image,
    InputMask,
    InputText,
    Label,
    Paragraph,
    ProgressBar,
    ProgressSpinner,
    RadioButton,
    Skeleton,
    Textarea,
    Toast
} from "./atoms"
import {
    Anchor,
    Calendar,
    FloatLabel
} from "./molecules"
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
    Tile
} from "./organisms"
import {
    BackLink,
    CardChart,
    CardDataTable,
    Error404,
    TestLoginButtons
} from "./templates"

app
    /**
     *  Atoms
     */
    .component('ad-avatar', Avatar)
    .component('ad-button', Button)
    .component('ad-color-picker', ColorPicker)
    .component('ad-header', Header)
    .component('ad-icon', Icon)
    .component('ad-image', Image)
    .component('ad-input-mask', InputMask)
    .component('ad-input-text', InputText)
    .component('ad-label', Label)
    .component('ad-paragraph', Paragraph)
    .component('ad-progress-bar', ProgressBar)
    .component('ad-progress-spinner', ProgressSpinner)
    .component('ad-radio-button', RadioButton)
    .component('ad-skeleton', Skeleton)
    .component('ad-textarea', Textarea)
    .component('ad-toast', Toast)

    /**
     *  Molecules
     */
    .component('ad-anchor', Anchor)
    .component('ad-calendar', Calendar)
    .component('ad-float-label', FloatLabel)

    /**
     *  Organisms
     */
    .component('ad-card', Card)
    .component('ad-chart', Chart)
    .component('ad-data-table', DataTable)
    .component('ad-data-table-skeleton', DataTableSkeleton)
    .component('ad-dialog', Dialog)
    .component('ad-dock', Dock)
    .component('ad-overlay-panel', OverlayPanel)
    .component('ad-password', Password)
    .component('ad-terminal', Terminal)
    .component('ad-tile', Tile)

    /**
     *  Templates
     */
    .component('ad-back-link', BackLink)
    .component('ad-test-login-buttons', TestLoginButtons)
    .component('ad-card-chart', CardChart)
    .component('ad-card-data-table', CardDataTable)
    .component('ad-error-404', Error404)

app.mount('#app')
