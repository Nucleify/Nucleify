import { App } from 'vue'

import {
  /**
   *  Admin
   */
  AdminPage,

  /**
   *  Auth
   */
  LoginPage,
  RegisterPage,

  /**
   *  Dashboard
   */
  DashboardPage,

  /**
   *  Entity
   */
  ActivityPage,
  ArticlePage,
  ContactPage,

  /**
   *  Errors
   */
  Error404Page,

  /**
   *  Home
   */
  HomePage,

  /**
   *  Settings
   */
  SettingsPage,
} from './'

export function registerPages(app: App): void {
  app
    /**
     *  Admin
     */
    .component('ad-admin-page', AdminPage)

    /**
     *  Auth
     */
    .component('ad-login-page', LoginPage)
    .component('ad-register-page', RegisterPage)

    /**
     *  Dashboard
     */
    .component('ad-dashboard-page', DashboardPage)

    /**
     *  Entities
     */
    .component('ad-activity-page', ActivityPage)
    .component('ad-article-page', ArticlePage)
    .component('ad-contact-page', ContactPage)

    /**
     *  Errors
     */
    .component('ad-error-404-page', Error404Page)

    /**
     *  Home
     */
    .component('ad-home-page', HomePage)

    /**
     *  Settings
     */
    .component('ad-settings-page', SettingsPage)
}
