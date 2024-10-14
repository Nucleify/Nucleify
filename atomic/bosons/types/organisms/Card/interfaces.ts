import { PassThrough } from 'primevue/ts-helpers'
import { CardPassThroughOptions } from 'primevue/card'
import { PassThroughOptions } from 'primevue/passthrough'

export interface CardInterface {
    pt?: PassThrough<CardPassThroughOptions>
    ptOptions?: PassThroughOptions
    unstyled?: boolean
}
