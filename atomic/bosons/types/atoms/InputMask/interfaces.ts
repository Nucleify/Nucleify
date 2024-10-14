import { InputMaskPassThroughOptions } from 'primevue/inputmask'
import { PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

export interface InputMaskInterface {
    value?: string
    slotChar?: string
    mask?: string
    autoClear?: boolean
    unmask?: boolean
    readonly?: boolean
    invalid?: boolean
    variant?: 'filled' | 'outlined'
    pt?: PassThrough<InputMaskPassThroughOptions>
    ptOptions?: PassThroughOptions
    unstyled?: boolean
    disabled?: boolean
}
