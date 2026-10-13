/** Event name adapters (IR ↔ Vue ↔ React ↔ Svelte). */

const IR_TO_VUE: Record<string, string> = {
  click: '@click',
  input: '@input',
  change: '@change',
  submit: '@submit',
}

const IR_TO_REACT: Record<string, string> = {
  click: 'onClick',
  input: 'onInput',
  change: 'onChange',
  submit: 'onSubmit',
  mouseenter: 'onMouseEnter',
  mouseleave: 'onMouseLeave',
  mouseover: 'onMouseOver',
  mouseout: 'onMouseOut',
  mousedown: 'onMouseDown',
  mouseup: 'onMouseUp',
  mousemove: 'onMouseMove',
  keydown: 'onKeyDown',
  keyup: 'onKeyUp',
  keypress: 'onKeyPress',
  touchstart: 'onTouchStart',
  touchend: 'onTouchEnd',
  touchmove: 'onTouchMove',
  focusin: 'onFocus',
  focusout: 'onBlur',
  focus: 'onFocus',
  blur: 'onBlur',
  dblclick: 'onDoubleClick',
  contextmenu: 'onContextMenu',
  pointerdown: 'onPointerDown',
  pointerup: 'onPointerUp',
  pointermove: 'onPointerMove',
  pointerenter: 'onPointerEnter',
  pointerleave: 'onPointerLeave',
  scroll: 'onScroll',
  wheel: 'onWheel',
  animationstart: 'onAnimationStart',
  animationend: 'onAnimationEnd',
  transitionend: 'onTransitionEnd',
}

/** Svelte 5 DOM event props are lowercase (`onclick`), not React `onClick` / Svelte 4 `on:click`. */
const IR_TO_SVELTE: Record<string, string> = Object.fromEntries(
  Object.keys(IR_TO_REACT).map((ir) => [ir, `on${ir}`]),
)

const REACT_TO_IR: Record<string, string> = Object.fromEntries(
  Object.entries(IR_TO_REACT).map(([ir, react]) => [react, ir]),
)

export function irEventToVue(irName: string): string {
  return IR_TO_VUE[irName] ?? `@${irName}`
}

export function irEventToReact(irName: string): string {
  return IR_TO_REACT[irName] ?? `on${irName.charAt(0).toUpperCase()}${irName.slice(1)}`
}

export function irEventToSvelte(irName: string): string {
  return IR_TO_SVELTE[irName] ?? `on${irName}`
}

export function vueEventToIr(directiveName: string, arg?: string | null): string {
  if (directiveName === 'on' && arg) return arg
  return directiveName
}

export function reactEventToIr(reactName: string): string {
  return REACT_TO_IR[reactName] ?? reactName.replace(/^on/, '').replace(/^./, (c) => c.toLowerCase())
}

/** Svelte 5 lowercase DOM props (`onclick`) → IR event name. */
export function svelteEventToIr(svelteName: string): string {
  if (!/^on[a-z]/.test(svelteName)) return svelteName
  const rest = svelteName.slice(2)
  return reactEventToIr(`on${rest.charAt(0).toUpperCase()}${rest.slice(1)}`)
}

/** @deprecated use irEventToVue / irEventToReact */
export function adaptEventName(name: string): string {
  return name
}

export { IR_TO_REACT, IR_TO_VUE, IR_TO_SVELTE }
