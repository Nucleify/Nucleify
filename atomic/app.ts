/**
 *  Styles
 */
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
import { registerGlobalConstants } from './bosons/constants'
import { registerGlobalUtils } from './bosons/utils'

registerPrimeVue(app)
registerGlobalConstants(app)
registerGlobalUtils(app)

import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Divider,
  Heading,
  Icon,
  Image,
  InputMask,
  InputNumber,
  InputOtp,
  InputText,
  Knob,
  Label,
  Paragraph,
  ProgressBar,
  ProgressSpinner,
  RadioButton,
  Rating,
  ScrollTop,
  SelectButton,
  Skeleton,
  Slider,
  Tag,
  Textarea,
} from './atoms'
import { Anchor, FloatLabel, Tile } from './molecules'
import {
  Accordion,
  AutoComplete,
  Card,
  Chart,
  ColorPicker,
  DataTable,
  DatePicker,
  DeferredContent,
  Dialog,
  Dock,
  Fieldset,
  FileUpload,
  MultiSelect,
  OrganizationChart,
  Password,
  Popover,
  Select,
  SpeedDial,
  Swiper,
  Terminal,
  Toast,
} from './organisms'
import {
  AboutPage,
  BlogPage,
  AdminPage,
  LoginPage,
  RegisterPage,
  ActivityPage,
  ArticlePage,
  ContactPage,
  MoneyPage,
  DashboardPage,
  Error404Page,
  HomePage,
  HomeNavbar,
  HomeFooter,
  ServicesPage,
  SettingsPage,
} from './pages'
import {
  BackLink,
  CardCategory,
  CardChart,
  CardDataTable,
  ScreenLights,
  ScreenLoader,
  SectionStart,
  SectionCategory,
  SkeletonDataTable,
  TestLoginButtons,
} from './templates'

app
  /**
   *  Atoms
   */
  .component('ad-avatar', Avatar)
  .component('ad-badge', Badge)
  .component('ad-button', Button)
  .component('ad-checkbox', Checkbox)
  .component('ad-divider', Divider)
  .component('ad-heading', Heading)
  .component('ad-icon', Icon)
  .component('ad-image', Image)
  .component('ad-input-mask', InputMask)
  .component('ad-input-number', InputNumber)
  .component('ad-input-otp', InputOtp)
  .component('ad-input-text', InputText)
  .component('ad-knob', Knob)
  .component('ad-label', Label)
  .component('ad-paragraph', Paragraph)
  .component('ad-progress-bar', ProgressBar)
  .component('ad-progress-spinner', ProgressSpinner)
  .component('ad-radio-button', RadioButton)
  .component('ad-rating', Rating)
  .component('ad-scroll-top', ScrollTop)
  .component('ad-select-button', SelectButton)
  .component('ad-skeleton', Skeleton)
  .component('ad-slider', Slider)
  .component('ad-tag', Tag)
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
  .component('ad-accordion', Accordion)
  .component('ad-auto-complete', AutoComplete)
  .component('ad-date-picker', DatePicker)
  .component('ad-deferred-content', DeferredContent)
  .component('ad-card', Card)
  .component('ad-chart', Chart)
  .component('ad-color-picker', ColorPicker)
  .component('ad-data-table', DataTable)
  .component('ad-dialog', Dialog)
  .component('ad-dock', Dock)
  .component('ad-fieldset', Fieldset)
  .component('ad-file-upload', FileUpload)
  .component('ad-multi-select', MultiSelect)
  .component('ad-organization-chart', OrganizationChart)
  .component('ad-popover', Popover)
  .component('ad-password', Password)
  .component('ad-select', Select)
  .component('ad-speed-dial', SpeedDial)
  .component('ad-swiper', Swiper)
  .component('ad-terminal', Terminal)
  .component('ad-toast', Toast)

  /**
   *  Pages
   */
  .component('ad-about-page', AboutPage)
  .component('ad-blog-page', BlogPage)
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
  .component('ad-money-page', MoneyPage)
  .component('ad-services-page', ServicesPage)
  .component('ad-settings-page', SettingsPage)

  /**
   *  Templates
   */
  .component('ad-back-link', BackLink)
  .component('ad-card-category', CardCategory)
  .component('ad-card-chart', CardChart)
  .component('ad-card-data-table', CardDataTable)
  .component('ad-screen-lights', ScreenLights)
  .component('ad-screen-loader', ScreenLoader)
  .component('ad-skeleton-data-table', SkeletonDataTable)
  .component('ad-section-category', SectionCategory)
  .component('ad-section-start', SectionStart)
  .component('ad-test-login-buttons', TestLoginButtons)

app.mount('#app')
