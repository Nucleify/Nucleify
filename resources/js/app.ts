import './bootstrap'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import InlineMessage from 'primevue/inlinemessage'

import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-light-green/theme.css'

const app = createApp({})

/**
 * VUE COMPONENTS
 */
app.use(PrimeVue)
app.component('Button', Button)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('Dialog', Dialog)
app.component('Dropdown', Dropdown)
app.component('InlineMessage', InlineMessage)
app.component('InputText', InputText)

/**
 * BLADE COMPONENTS
 */
import ContactDashboard from './components/Contact/ContactDashboard.vue'
import UserDashboard from './components/User/UserDashboard.vue'
import TestLoginButton from './components/User/TestLoginButton.vue'

app.component('test-login-button', TestLoginButton)
app.component('contact-dashboard', ContactDashboard)
app.component('user-dashboard', UserDashboard)

app.mount('#app')
