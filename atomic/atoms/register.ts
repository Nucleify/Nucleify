import { AppType } from 'vite'

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
  Toast,
} from './'

export function registerAtoms(app: AppType): void {
  app
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
}
