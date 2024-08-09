import {
    ActivityLogInterface,
    ArticleInterface,
    ContactInterface,
    UserInterface,
} from '@/types'

import { ChartType, ChartMethodType } from 'atomic/bosons/types'

export interface ChartInterface {
    type: ChartType
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
    setDefaultChartsDisplay: (reload?: boolean) => void
    allChartsDisplayToggle: () => void
}
