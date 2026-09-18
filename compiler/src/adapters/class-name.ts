/** `class` / `className` adapters. */

export function toVueClassAttr(irName: string): string {
  return irName === 'className' ? 'class' : irName
}

/** Map of HTML/SVG attributes to their React camelCase equivalents. */
const HTML_TO_REACT_ATTR: Record<string, string> = {
  class: 'className',
  for: 'htmlFor',
  tabindex: 'tabIndex',
  readonly: 'readOnly',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  formnovalidate: 'formNoValidate',
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  crossorigin: 'crossOrigin',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  enctype: 'encType',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formmethod: 'formMethod',
  formtarget: 'formTarget',
  inputmode: 'inputMode',
  accesskey: 'accessKey',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  spellcheck: 'spellCheck',
  // SVG attributes
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'fill-opacity': 'fillOpacity',
  'fill-rule': 'fillRule',
  'clip-path': 'clipPath',
  'clip-rule': 'clipRule',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-opacity': 'strokeOpacity',
  'font-size': 'fontSize',
  'font-family': 'fontFamily',
  'font-weight': 'fontWeight',
  'text-anchor': 'textAnchor',
  'dominant-baseline': 'dominantBaseline',
  'alignment-baseline': 'alignmentBaseline',
  'flood-color': 'floodColor',
  'flood-opacity': 'floodOpacity',
  'color-interpolation': 'colorInterpolation',
  'color-interpolation-filters': 'colorInterpolationFilters',
  viewbox: 'viewBox',
}

export function toReactClassName(irName: string): string {
  return HTML_TO_REACT_ATTR[irName] ?? irName
}

export function toVueClass(value: string): string {
  return value
}
