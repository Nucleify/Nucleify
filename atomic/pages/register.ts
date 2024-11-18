import { App } from 'vue'

import {
  /**
   *  About
   */
  AboutPage,

  /**
   *  Blog
   */
  BlogPage,

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
  HomeNavbar,
  HomeFooter,

  /**
   *  Services
   */
  ServicesPage,
  /**
   *  Settings
   */
  SettingsPage,
} from './'

export function registerPages(app: App): void {
  app
    /**
     *  About
     */
    .component('ad-about-page', AboutPage)

    /**
     *  Blog
     */
    .component('ad-blog-page', BlogPage)

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
    .component('ad-home-navbar', HomeNavbar)
    .component('ad-home-footer', HomeFooter)
    /**
     *  Services
     */
    .component('ad-services-page', ServicesPage)
    /**
     *  Settings
     */
    .component('ad-settings-page', SettingsPage)
}
