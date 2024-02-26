import './bootstrap'
import { createApp } from 'vue'
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'

/**
 * Primevue components
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
import Toast from 'primevue/toast'
/**
 *
 */

import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-light-green/theme.css'

const app = createApp({})

/**
 * VUE COMPONENTS
 */
app.use(PrimeVue)
app.component('Avatar', Avatar)
app.component('Card', Card)
app.component('Button', Button)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('Dialog', Dialog)
app.component('Dropdown', Dropdown)
app.component('InlineMessage', InlineMessage)
app.component('InputText', InputText)
app.component('Menu', Menu)
app.component('Menubar', Menubar)
app.component('Toast', Toast)

/**
 * BLADE COMPONENTS
 */
import AdminPanel from './components/Admin/AdminPanel.vue'
import TestLoginButton from './components/Admin/User/TestLoginButton.vue'
import Navbar from './components/Layout/Navbar.vue'

app.component('test-login-button', TestLoginButton)
app.component('admin-panel', AdminPanel)
app.component('nav-bar', Navbar)

app.use(ToastService)

app.mount('#app')
