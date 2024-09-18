import { HintedString, PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

import { LoadingType, ObjectNameType } from 'atomic/bosons/types'

export interface ButtonInterface {
    label?: string
    icon?: string
    iconPos?: 'left' | 'top' | 'bottom' | 'right'
    iconClass?: string
    badge?: string
    badgeClass?: string
    badgeSeverity?: null | HintedString<
        'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast'
    >
    loading?: LoadingType
    loadingIcon?: string
    link?: string
    severity?:
        | string
        | 'primary'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warning'
        | 'help'
        | 'danger'
    raised?: boolean
    rounded?: boolean
    text?: boolean
    outlined?: boolean
    size?: 'small' | 'large'
    plain?: string
    pt?: PassThrough<PassThroughOptions>
    ptOptions?: PassThroughOptions
    unstyled?: string
    disabled?: boolean
    onclick?: (event: MouseEvent) => void
    type?: ObjectNameType
    width?: string
    height?: string
    gap?: string
    padding?: string
    src?: string
}
