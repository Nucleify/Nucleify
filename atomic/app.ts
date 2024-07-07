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
import 'bootstrap'
import { createApp } from 'vue'

export const app = createApp({})

/**
 *  PrimeVue components
 */
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import ColorPicker from 'primevue/colorpicker'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import FloatLabel from 'primevue/floatlabel'
import Image from 'primevue/image'
import InlineMessage from 'primevue/inlinemessage'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import PanelMenu from 'primevue/panelmenu'
import ProgressSpinner from 'primevue/progressspinner'
import RadioButton from 'primevue/radiobutton'
import Sidebar from 'primevue/sidebar'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'

app.component('Avatar', Avatar)
    .component('Button', Button)
    .component('Card', Card)
    .component('Chart', Chart)
    .component('ColorPicker', ColorPicker)
    .component('Column', Column)
    .component('DataTable', DataTable)
    .component('Dialog', Dialog)
    .component('Dropdown', Dropdown)
    .component('FloatLabel', FloatLabel)
    .component('Image', Image)
    .component('InlineMessage', InlineMessage)
    .component('InputText', InputText)
    .component('Menu', Menu)
    .component('Menubar', Menubar)
    .component('PanelMenu', PanelMenu)
    .component('ProgressSpinner', ProgressSpinner)
    .component('RadioButton', RadioButton)
    .component('Sidebar', Sidebar)
    .component('Textarea', Textarea)
    .component('Toast', Toast)

/**
 *  New Atomic Design components
 */

// Atoms
import {
    AvatarAtom,
    ButtonAtom,
    ColorPickerAtom,
    HeadingAtom,
    ImageAtom,
    InputTextAtom,
    LabelAtom,
    ProgressSpinnerAtom,
    RadioButtonAtom
} from './atoms'

app.component('avatar-atom', AvatarAtom)
    .component('button-atom', ButtonAtom)
    .component('color-picker-atom', ColorPickerAtom)
    .component('heading-atom', HeadingAtom)
    .component('image-atom', ImageAtom)
    .component('input-text-atom', InputTextAtom)
    .component('label-atom', LabelAtom)
    .component('progress-spinner-atom', ProgressSpinnerAtom)
    .component('radio-button-atom', RadioButtonAtom)

// Molecules
import {
    AnchorMolecule,
    FloatLabelMolecule
} from './molecules'

app.component('anchor-molecule', AnchorMolecule)
    .component('float-label-molecule', FloatLabelMolecule)

/**
 *  Components
 */
import {
    ActivityLog,
    AdminPanel,
    ArticleDashboard,
    ContactDashboard,
    ColorSettings,
    Dashboard,
    Home,
    Login,
    MyLayout,
    Settings,
    Register,
    TestLoginButton,
} from '@/components'

app.component('activity-log', ActivityLog)
    .component('admin-panel', AdminPanel)
    .component('article-dashboard', ArticleDashboard)
    .component('contact-dashboard', ContactDashboard)
    .component('color-settings', ColorSettings)
    .component('dashboard', Dashboard)
    .component('home', Home)
    .component('login', Login)
    .component('my-layout', MyLayout)
    .component('settings', Settings)
    .component('register', Register)
    .component('test-login-button', TestLoginButton)

/**
 *  Directives
 */
import Tooltip from 'primevue/tooltip'

app.directive('tooltip', Tooltip)

/**
 *  App uses & mount
 */
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'

app.use(PrimeVue, { ripple: true }).use(ToastService).mount('#app')
