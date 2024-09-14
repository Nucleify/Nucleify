import { PassThrough } from 'primevue/ts-helpers'
import { AvatarPassThroughOptions } from 'primevue/avatar'
import { PassThroughOptions } from 'primevue/passthrough'

export interface AvatarInterface {
    label?: string
    icon?: string
    image?: string
    size?: 'normal' | 'large' | 'xlarge'
    shape?: 'square' | 'circle'
    ariaLabel?: string
    ariaLabelledby?: string
    pt?: PassThrough<AvatarPassThroughOptions>
    ptOptions?: PassThroughOptions
    unstyled?: boolean
}
