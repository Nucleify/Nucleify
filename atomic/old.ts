import { App } from 'vue'

import {
    ActivityDashboard,
    AdminPanel,
    ArticleDashboard,
    ContactDashboard,
    ColorSettings,
    Dashboard,
    Home,
    Login,
    Settings,
    Register,
    TestLoginButton,
} from '@/components'

export default function registerOldStructure(app: App<Element>): void {
    app.component('activity-dashboard', ActivityDashboard)
        .component('admin-panel', AdminPanel)
        .component('article-dashboard', ArticleDashboard)
        .component('contact-dashboard', ContactDashboard)
        .component('color-settings', ColorSettings)
        .component('dashboard', Dashboard)
        .component('home', Home)
        .component('login', Login)
        .component('settings', Settings)
        .component('register', Register)
        .component('test-login-button', TestLoginButton)
}
