import { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { HintedString, PassThrough } from 'primevue/ts-helpers'
import { PasswordPassThroughOptions } from 'primevue/password'
import { PassThroughOptions } from 'primevue/passthrough'

import { ObjectNameType } from 'atomic/bosons/support'

export interface PasswordInterface {
    value?: string
    modelValue?: string
    promptLabel?: string
    mediumRegex?: string | RegExp
    strongRegex?: string | RegExp
    weakLabel?: string
    mediumLabel?: string
    strongLabel?: string
    feedback?: boolean
    appendTo?: HTMLElement | HintedString<'body' | 'self'>
    toggleMask?: boolean
    invalid?: boolean
    disabled?: boolean
    variant?: 'filled' | 'outlined'
    placeholder?: string
    required?: boolean
    inputId?: string
    inputStyle?: object
    inputClass?: string | object
    inputProps?: InputHTMLAttributes
    panelId?: string
    panelClass?: string | object
    panelStyle?: object
    panelProps?: HTMLAttributes
    ariaLabelledby?: string
    ariaLabel?: string
    pt?: PassThrough<PasswordPassThroughOptions>
    ptOptions?: PassThroughOptions
    unstyled?: boolean
    id?: string
    passwordsMatch?: boolean
    emptyPassword?: boolean
    emptyConfirmPassword?: boolean
    type?: ObjectNameType
}
