import { MenuItem } from 'primevue/menuitem'
import { HintedString } from 'primevue/ts-helpers'

export interface MenuInterface {
    ref: string
    model: MenuItem[]
    popup: boolean
    appendTo?: HTMLElement | HintedString<'body' | 'self'>
    autoZIndex?: boolean
    baseZIndex?: number
}
