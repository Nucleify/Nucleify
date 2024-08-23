import { App } from 'vue'

import {
    Avatar,
    Button,
    ColorPicker,
    Heading,
    Image,
    InputText,
    Item,
    Label,
    ProgressBar,
    ProgressSpinner,
    RadioButton,
} from './'

export default function registerAtoms(app: App<Element>): void {
    app.component('avatar-atom', Avatar)
        .component('button-atom', Button)
        .component('color-picker-atom', ColorPicker)
        .component('heading-atom', Heading)
        .component('image-atom', Image)
        .component('input-text-atom', InputText)
        .component('item-atom', Item)
        .component('label-atom', Label)
        .component('progress-bar-atom', ProgressBar)
        .component('progress-spinner-atom', ProgressSpinner)
        .component('radio-button-atom', RadioButton)
}
