import { HintedString } from 'primevue/ts-helpers'

export type ElementAppendTo = HTMLElement | HintedString<'body' | 'self'>

export type ElementType = HTMLElement | null
export type ElementsType = ElementType[]

export type ElementDirectionType = 'horizontal' | 'vertical'
export type ElementShapeType = 'square' | 'circle'
export type ElementSizeType = 'small' | 'large'
export type ElementVariantType = 'filled' | 'outlined'
