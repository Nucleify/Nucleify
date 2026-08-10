/** `class` / `className` adapters. */

export function toVueClassAttr(irName: string): string {
  return irName === 'className' ? 'class' : irName
}

export function toReactClassName(irName: string): string {
  return irName === 'class' ? 'className' : irName
}

export function toVueClass(value: string): string {
  return value
}
