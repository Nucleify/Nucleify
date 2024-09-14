import { ProgressBarPassThroughOptions } from 'primevue/progressbar'
import { PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

export interface ProgressBarInterface {
    value?: number
    mode?: 'indeterminate' | 'determinate'
    showValue?: boolean
    pt?: PassThrough<ProgressBarPassThroughOptions>
    ptOptions?: PassThroughOptions
    unstyled?: boolean
    width?: string
    height?: string
}
