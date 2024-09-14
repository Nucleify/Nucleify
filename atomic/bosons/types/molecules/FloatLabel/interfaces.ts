import { FloatLabelPassThroughOptions } from 'primevue/floatlabel'
import { PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

export interface FloatLabelInterface {
    unstyled?: boolean
    pt?: PassThrough<FloatLabelPassThroughOptions>
    ptOptions?: PassThroughOptions
}
