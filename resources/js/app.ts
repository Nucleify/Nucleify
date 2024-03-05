import './bootstrap'
import { createApp } from 'vue'

import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-light-green/theme.css'

export const app = createApp({})

/**
 *  PrimeVue components
 */
import Avatar from 'primevue/avatar'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InlineMessage from 'primevue/inlinemessage'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import PanelMenu from 'primevue/panelmenu'
import Sidebar from 'primevue/sidebar'
import Toast from 'primevue/toast'

app.component('Avatar', Avatar)
    .component('Card', Card)
    .component('Button', Button)
    .component('Column', Column)
    .component('DataTable', DataTable)
    .component('Dialog', Dialog)
    .component('Dropdown', Dropdown)
    .component('InlineMessage', InlineMessage)
    .component('InputText', InputText)
    .component('Menu', Menu)
    .component('Menubar', Menubar)
    .component('PanelMenu', PanelMenu)
    .component('Sidebar', Sidebar)
    .component('Toast', Toast)

/**
 *  Components
 */
import {
    ActivityLog,
    AdminPanel,
    GuestNavbar,
    Home,
    Login,
    LoginButton,
    MyLayout,
    Register,
    TestLoginButton,
    Welcome,
} from './components'

app.component('activity-log', ActivityLog)
    .component('admin-panel', AdminPanel)
    .component('guest-navbar', GuestNavbar)
    .component('home', Home)
    .component('login', Login)
    .component('login-button', LoginButton)
    .component('my-layout', MyLayout)
    .component('register', Register)
    .component('test-login-button', TestLoginButton)
    .component('welcome', Welcome)

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

app.use(PrimeVue).use(ToastService).mount('#app')
