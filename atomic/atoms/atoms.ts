import { AppType } from 'vite'

import {
    Avatar,
    Button,
    ColorPicker,
    Heading,
    Icon,
    Image,
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

export default function registerAtoms(app: AppType): void {
    app.component('avatar-atom', Avatar)
        .component('button-atom', Button)
        .component('color-picker-atom', ColorPicker)
        .component('heading-atom', Heading)
        .component('icon-atom', Icon)
        .component('image-atom', Image)
        .component('input-text-atom', InputText)
        .component('label-atom', Label)
        .component('paragraph-atom', Paragraph)
        .component('progress-bar-atom', ProgressBar)
        .component('progress-spinner-atom', ProgressSpinner)
        .component('radio-button-atom', RadioButton)
        .component('skeleton-atom', Skeleton)
        .component('textarea-atom', Textarea)
        .component('toast-atom', Toast)
}
