import { ObjectNameType } from 'atomic/bosons/types'
import { RadioButtonPassThroughOptions } from 'primevue/radiobutton'
import { PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

export interface RadioButtonInterface {
    value?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    name?: string
    binary?: boolean
    invalid?: boolean
    disabled?: boolean
    variant?: 'filled' | 'outlined'
    readonly?: boolean
    tabindex?: number
    inputId?: string
    inputStyle?: object
    inputClass?: string
    ariaLabelledby?: string
    ariaLabel?: string
    pt?: PassThrough<RadioButtonPassThroughOptions>
    ptOptions?: PassThroughOptions
    unstyled?: boolean
    type?: ObjectNameType
}
