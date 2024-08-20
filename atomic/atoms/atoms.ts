import { App } from 'vue'

import {
    AvatarAtom,
    ButtonAtom,
    ColorPickerAtom,
    HeadingAtom,
    ImageAtom,
    InputTextAtom,
    ItemAtom,
    LabelAtom,
    ProgressBarAtom,
    ProgressSpinnerAtom,
    RadioButtonAtom,
} from './'

export default function registerAtoms(app: App<Element>): void {
    app.component('avatar-atom', AvatarAtom)
        .component('button-atom', ButtonAtom)
        .component('color-picker-atom', ColorPickerAtom)
        .component('heading-atom', HeadingAtom)
        .component('image-atom', ImageAtom)
        .component('input-text-atom', InputTextAtom)
        .component('item-atom', ItemAtom)
        .component('label-atom', LabelAtom)
        .component('progress-bar-atom', ProgressBarAtom)
        .component('progress-spinner-atom', ProgressSpinnerAtom)
        .component('radio-button-atom', RadioButtonAtom)
}
