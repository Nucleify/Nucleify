import { CanvasHTMLAttributes } from 'vue'
import { ChartPassThroughOptions } from 'primevue/chart'
import { PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

import {
    ActivityLogInterface,
    ArticleInterface,
    ContactInterface,
    ChartType,
    ChartMethodType,
    UserInterface,
} from 'atomic/bosons/types'

export interface ChartInterface {
    type: ChartType
    data?: object
    options?: object
    plugins?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    width?: number
    height?: number
    canvasProps?: CanvasHTMLAttributes
    pt?: PassThrough<ChartPassThroughOptions>
    ptOptions?: PassThroughOptions
    direction?: string
    chartMethodType: ChartMethodType
    activityLogData?: ActivityLogInterface[]
    articleData?: ArticleInterface[]
    contactData?: ContactInterface[]
    userData?: UserInterface[]
    chartClass?: string
    example?: boolean
}

export interface DisplayChartsInterface {
    [key: string]: boolean
    Activity: boolean
    Admin: boolean
    Article: boolean
    Contact: boolean
}

export interface UseDisplayChartsInterface {
    display: DisplayChartsInterface
    displayChartsToggle: (action: string) => void
    setDefaultChartsDisplay: (initial?: boolean, reload?: boolean) => void
}
