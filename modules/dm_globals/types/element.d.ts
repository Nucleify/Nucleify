export {}

declare global {
  type ElementAppendTo = HTMLElement | 'body' | 'self'
  type ElementType = HTMLElement | null
  type ElementsType = ElementType[]
  type ElementDirectionType = 'horizontal' | 'vertical'
  type ElementShapeType = 'square' | 'circle'
  type ElementSizeType = 'small' | 'large'
  type ElementVariantType = 'filled' | 'outlined'
}
