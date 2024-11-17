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
import { App } from 'vue'
import { createApp } from 'vue'

export const app: App = createApp({})

import registerPrimeVue from './primevue'
// import { registerAtoms } from './atoms'
// import { registerMolecules } from './molecules'
// import { registerOrganisms } from './organisms'
// import { registerPages } from './pages'
// import { registerTemplates } from './templates'
import { registerGlobalConstants } from './bosons/constants'
import { registerGlobalUtils } from './bosons/utils'

registerPrimeVue(app)
// registerAtoms(app)
// registerMolecules(app)
// registerOrganisms(app)
// registerPages(app)
// registerTemplates(app)
registerGlobalConstants(app)
registerGlobalUtils(app)

/**
 *  Use this bellow if your IDE can't find Atomic Design components
 */
import {
    Avatar,
    Button,
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
    Textarea
} from "./atoms"
import {
    Anchor,
    FloatLabel,
    Tile
} from "./molecules"
import {
    Calendar,
    Card,
    Chart,
    ColorPicker,
    DataTable,
    DataTableSkeleton,
    Dialog,
    Dock,
    Dropdown,
    OverlayPanel,
    Password,
    Terminal,
    Toast
} from "./organisms"
import {
    AboutPage,
    AdminPage,
    LoginPage,
    RegisterPage,
    ActivityPage,
    ArticlePage,
    ContactPage,
    DashboardPage,
    Error404Page,
    HomePage,
    HomeNavbar,
    HomeFooter,
    SettingsPage
} from "./pages"
import {
    BackLink,
    CardCategorySection,
    CardCategorySingle,
    CardChart,
    CardDataTable,
    ScreenLoader,
    TestLoginButtons,
    StartSection,
} from './templates'

app
    /**
     *  Atoms
     */
    .component('ad-avatar', Avatar)
    .component('ad-button', Button)
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

    /**
     *  Molecules
     */
    .component('ad-anchor', Anchor)
    .component('ad-float-label', FloatLabel)
    .component('ad-tile', Tile)

    /**
     *  Organisms
     */
    .component('ad-calendar', Calendar)
    .component('ad-card', Card)
    .component('ad-chart', Chart)
    .component('ad-color-picker', ColorPicker)
    .component('ad-data-table', DataTable)
    .component('ad-data-table-skeleton', DataTableSkeleton)
    .component('ad-dialog', Dialog)
    .component('ad-dock', Dock)
    .component('ad-dropdown', Dropdown)
    .component('ad-overlay-panel', OverlayPanel)
    .component('ad-password', Password)
    .component('ad-terminal', Terminal)
    .component('ad-toast', Toast)

    /**
     *  Pages
     */
    .component('ad-about-page', AboutPage)
    .component('ad-admin-page', AdminPage)
    .component('ad-login-page', LoginPage)
    .component('ad-register-page', RegisterPage)
    .component('ad-activity-page', ActivityPage)
    .component('ad-article-page', ArticlePage)
    .component('ad-contact-page', ContactPage)
    .component('ad-dashboard-page', DashboardPage)
    .component('ad-error-404-page', Error404Page)
    .component('ad-home-page', HomePage)
    .component('ad-home-navbar', HomeNavbar)
    .component('ad-home-footer', HomeFooter)
    .component('ad-settings-page', SettingsPage)

    /**
     *  Templates
     */
    .component('ad-back-link', BackLink)
    .component('ad-card-category-section', CardCategorySection)
    .component('ad-card-category-single', CardCategorySingle)
    .component('ad-card-chart', CardChart)
    .component('ad-card-data-table', CardDataTable)
    .component('ad-screen-loader', ScreenLoader)
    .component('ad-test-login-buttons', TestLoginButtons)
    .component('ad-start-section', StartSection)

app.mount('#app')
