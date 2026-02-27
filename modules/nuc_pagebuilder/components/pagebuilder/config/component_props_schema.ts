/**
 * Schema registry for known component props.
 * Used by the page builder inspector to render proper form fields
 * instead of raw JSON editing.
 */

export type PropFieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'select'
  | 'color'
  | 'json'

export interface PropFieldSchema {
  key: string
  label: string
  type: PropFieldType
  default?: unknown
  placeholder?: string
  options?: string[] // for 'select'
}

export const COMPONENT_PROPS_SCHEMA: Record<string, PropFieldSchema[]> = {
  // ─── Atomic Atoms ───
  'ad-button': [
    {
      key: 'label',
      label: 'Label',
      type: 'string',
      default: 'Button',
      placeholder: 'Button text',
    },
    {
      key: 'icon',
      label: 'Icon',
      type: 'string',
      placeholder: 'e.g. mdi:home',
    },
    { key: 'src', label: 'Image src', type: 'string', placeholder: '/img/...' },
    { key: 'alt', label: 'Image alt', type: 'string', placeholder: 'Alt text' },
    {
      key: 'severity',
      label: 'Severity',
      type: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'info',
        'warn',
        'danger',
        'help',
        'contrast',
      ],
    },
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      options: ['', 'outlined', 'text', 'link'],
    },
    { key: 'rounded', label: 'Rounded', type: 'boolean', default: false },
    { key: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    { key: 'width', label: 'Width', type: 'string', placeholder: 'e.g. 200px' },
    { key: 'gap', label: 'Gap', type: 'string', placeholder: 'e.g. 8px' },
    {
      key: 'padding',
      label: 'Padding',
      type: 'string',
      placeholder: 'e.g. 10px 20px',
    },
  ],
  'ad-heading': [
    {
      key: 'tag',
      label: 'Heading level (1-6)',
      type: 'number',
      default: 2,
      placeholder: '2',
    },
    {
      key: 'text',
      label: 'Text',
      type: 'string',
      default: 'Heading',
      placeholder: 'Heading text',
    },
  ],
  'ad-paragraph': [
    {
      key: 'text',
      label: 'Text',
      type: 'string',
      default: 'Paragraph',
      placeholder: 'Paragraph text',
    },
  ],
  'ad-label': [
    {
      key: 'label',
      label: 'Text',
      type: 'string',
      default: 'Label',
      placeholder: 'Label text',
    },
    {
      key: 'forInput',
      label: 'For input',
      type: 'string',
      placeholder: 'input-id',
    },
  ],
  'ad-icon': [
    {
      key: 'icon',
      label: 'Icon name',
      type: 'string',
      placeholder: 'e.g. mdi:home, pi pi-check',
    },
    {
      key: 'size',
      label: 'Size',
      type: 'string',
      placeholder: 'e.g. 24px, 2rem',
    },
  ],
  'ad-image': [
    {
      key: 'src',
      label: 'Source URL',
      type: 'string',
      default: '/img/logo.svg',
      placeholder: '/img/...',
    },
    {
      key: 'alt',
      label: 'Alt text',
      type: 'string',
      default: 'Image',
      placeholder: 'Alt text',
    },
    { key: 'width', label: 'Width', type: 'string', placeholder: 'e.g. 200px' },
    {
      key: 'height',
      label: 'Height',
      type: 'string',
      placeholder: 'e.g. 100px',
    },
    {
      key: 'fetchpriority',
      label: 'Fetch priority',
      type: 'select',
      options: ['', 'high', 'low'],
    },
  ],
  'ad-badge': [
    {
      key: 'value',
      label: 'Value',
      type: 'string',
      default: '1',
      placeholder: 'Badge value',
    },
    {
      key: 'severity',
      label: 'Severity',
      type: 'select',
      options: [
        '',
        'secondary',
        'success',
        'info',
        'warn',
        'danger',
        'contrast',
      ],
    },
    {
      key: 'size',
      label: 'Size',
      type: 'select',
      options: ['', 'small', 'large', 'xlarge'],
    },
  ],
  'ad-tag': [
    {
      key: 'value',
      label: 'Value',
      type: 'string',
      default: 'Tag',
      placeholder: 'Tag text',
    },
    {
      key: 'severity',
      label: 'Severity',
      type: 'select',
      options: [
        '',
        'secondary',
        'success',
        'info',
        'warn',
        'danger',
        'contrast',
      ],
    },
    {
      key: 'icon',
      label: 'Icon',
      type: 'string',
      placeholder: 'e.g. pi pi-check',
    },
    { key: 'rounded', label: 'Rounded', type: 'boolean', default: false },
  ],
  'ad-avatar': [
    { key: 'label', label: 'Label', type: 'string', placeholder: 'A' },
    { key: 'icon', label: 'Icon', type: 'string', placeholder: 'pi pi-user' },
    {
      key: 'image',
      label: 'Image URL',
      type: 'string',
      placeholder: '/img/...',
    },
    {
      key: 'size',
      label: 'Size',
      type: 'select',
      options: ['', 'normal', 'large', 'xlarge'],
    },
    {
      key: 'shape',
      label: 'Shape',
      type: 'select',
      options: ['', 'square', 'circle'],
    },
  ],
  'ad-divider': [
    {
      key: 'align',
      label: 'Align',
      type: 'select',
      options: ['', 'left', 'center', 'right', 'top', 'center', 'bottom'],
    },
    {
      key: 'layout',
      label: 'Layout',
      type: 'select',
      options: ['', 'horizontal', 'vertical'],
    },
    {
      key: 'type',
      label: 'Type',
      type: 'select',
      options: ['', 'solid', 'dashed', 'dotted'],
    },
  ],
  'ad-checkbox': [
    { key: 'binary', label: 'Binary', type: 'boolean', default: true },
    { key: 'disabled', label: 'Disabled', type: 'boolean', default: false },
  ],
  'ad-input-text': [
    {
      key: 'placeholder',
      label: 'Placeholder',
      type: 'string',
      placeholder: 'Enter text...',
    },
    { key: 'disabled', label: 'Disabled', type: 'boolean', default: false },
  ],
  'ad-textarea': [
    {
      key: 'placeholder',
      label: 'Placeholder',
      type: 'string',
      placeholder: 'Enter text...',
    },
    { key: 'rows', label: 'Rows', type: 'number', default: 3 },
    { key: 'disabled', label: 'Disabled', type: 'boolean', default: false },
  ],
  'ad-input-number': [
    { key: 'placeholder', label: 'Placeholder', type: 'string' },
    { key: 'min', label: 'Min', type: 'number' },
    { key: 'max', label: 'Max', type: 'number' },
    { key: 'disabled', label: 'Disabled', type: 'boolean', default: false },
  ],
  'ad-slider': [
    { key: 'min', label: 'Min', type: 'number', default: 0 },
    { key: 'max', label: 'Max', type: 'number', default: 100 },
    { key: 'step', label: 'Step', type: 'number', default: 1 },
    { key: 'disabled', label: 'Disabled', type: 'boolean', default: false },
  ],
  'ad-knob': [
    { key: 'min', label: 'Min', type: 'number', default: 0 },
    { key: 'max', label: 'Max', type: 'number', default: 100 },
    { key: 'size', label: 'Size (px)', type: 'number', default: 150 },
    { key: 'strokeWidth', label: 'Stroke width', type: 'number', default: 14 },
    { key: 'showValue', label: 'Show value', type: 'boolean', default: true },
    { key: 'disabled', label: 'Disabled', type: 'boolean', default: false },
  ],
  'ad-rating': [
    { key: 'stars', label: 'Stars', type: 'number', default: 5 },
    { key: 'cancel', label: 'Allow cancel', type: 'boolean', default: true },
    { key: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    { key: 'readonly', label: 'Read only', type: 'boolean', default: false },
  ],
  'ad-progress-bar': [
    { key: 'value', label: 'Value (%)', type: 'number', default: 50 },
    { key: 'showValue', label: 'Show value', type: 'boolean', default: true },
    { key: 'width', label: 'Width', type: 'string', placeholder: '100%' },
    { key: 'height', label: 'Height', type: 'string', placeholder: '20px' },
  ],
  'ad-progress-spinner': [
    { key: 'strokeWidth', label: 'Stroke width', type: 'string', default: '4' },
    {
      key: 'animationDuration',
      label: 'Duration',
      type: 'string',
      default: '2s',
    },
  ],
  'ad-skeleton': [
    { key: 'width', label: 'Width', type: 'string', default: '100%' },
    { key: 'height', label: 'Height', type: 'string', default: '1rem' },
    {
      key: 'shape',
      label: 'Shape',
      type: 'select',
      options: ['', 'rectangle', 'circle'],
    },
    {
      key: 'borderRadius',
      label: 'Border radius',
      type: 'string',
      placeholder: '4px',
    },
  ],
  'ad-logo': [
    {
      key: 'type',
      label: 'Type',
      type: 'select',
      options: ['', 'symbol', 'paths', 'svg'],
    },
  ],
  'ad-radio-button': [
    { key: 'disabled', label: 'Disabled', type: 'boolean', default: false },
  ],
  'ad-select-button': [
    { key: 'disabled', label: 'Disabled', type: 'boolean', default: false },
  ],
  'ad-input-otp': [
    { key: 'length', label: 'Length', type: 'number', default: 6 },
    {
      key: 'integerOnly',
      label: 'Integer only',
      type: 'boolean',
      default: false,
    },
  ],
  'ad-input-mask': [
    { key: 'mask', label: 'Mask', type: 'string', placeholder: '99-999999' },
    { key: 'placeholder', label: 'Placeholder', type: 'string' },
  ],

  // ─── Atomic Molecules ───
  'ad-anchor': [
    {
      key: 'href',
      label: 'Link URL',
      type: 'string',
      placeholder: 'https://...',
    },
    { key: 'label', label: 'Label', type: 'string', placeholder: 'Link text' },
    { key: 'icon', label: 'Icon', type: 'string', placeholder: 'mdi:link' },
    { key: 'src', label: 'Image src', type: 'string' },
    { key: 'alt', label: 'Image alt', type: 'string' },
    {
      key: 'target',
      label: 'Target',
      type: 'select',
      options: ['', '_self', '_blank', '_parent', '_top'],
    },
    {
      key: 'rel',
      label: 'Rel',
      type: 'select',
      options: ['', 'noopener', 'noreferrer', 'nofollow'],
    },
    { key: 'tooltip', label: 'Tooltip', type: 'string' },
  ],
  'ad-float-label': [
    { key: 'label', label: 'Label text', type: 'string', placeholder: 'Label' },
  ],
  'ad-tile': [
    {
      key: 'header',
      label: 'Header',
      type: 'string',
      placeholder: 'Tile header',
    },
    { key: 'icon', label: 'Icon', type: 'string', placeholder: 'mdi:star' },
    { key: 'href', label: 'Link', type: 'string', placeholder: 'https://...' },
    { key: 'count', label: 'Count', type: 'number' },
    { key: 'countSecondary', label: 'Secondary count', type: 'number' },
    { key: 'textSecondary', label: 'Secondary text', type: 'string' },
  ],

  // ─── Atomic Organisms ───
  'ad-accordion': [
    {
      key: 'hexagons',
      label: 'Hexagon markers',
      type: 'boolean',
      default: false,
    },
    {
      key: 'panels',
      label: 'Panels (JSON)',
      type: 'json',
      placeholder: '[{"index":0,"content":"Title","answer":"Answer"}]',
    },
  ],
  'ad-card': [
    { key: 'title', label: 'Title', type: 'string', placeholder: 'Card title' },
    { key: 'subtitle', label: 'Subtitle', type: 'string' },
  ],
  'ad-dialog': [
    {
      key: 'header',
      label: 'Header',
      type: 'string',
      placeholder: 'Dialog title',
    },
    { key: 'modal', label: 'Modal', type: 'boolean', default: true },
    { key: 'closable', label: 'Closable', type: 'boolean', default: true },
    { key: 'visible', label: 'Visible', type: 'boolean', default: false },
  ],
  'ad-fieldset': [
    {
      key: 'legend',
      label: 'Legend',
      type: 'string',
      placeholder: 'Fieldset legend',
    },
    { key: 'toggleable', label: 'Toggleable', type: 'boolean', default: false },
  ],
  'ad-panel': [
    {
      key: 'header',
      label: 'Header',
      type: 'string',
      placeholder: 'Panel header',
    },
    { key: 'toggleable', label: 'Toggleable', type: 'boolean', default: false },
  ],
  'ad-tabs': [
    { key: 'value', label: 'Active tab', type: 'string', default: '0' },
  ],
  'ad-carousel': [
    { key: 'numVisible', label: 'Visible items', type: 'number', default: 1 },
    { key: 'numScroll', label: 'Scroll items', type: 'number', default: 1 },
    { key: 'circular', label: 'Circular', type: 'boolean', default: false },
    {
      key: 'autoplayInterval',
      label: 'Autoplay (ms)',
      type: 'number',
      default: 0,
    },
  ],
  'ad-select': [
    {
      key: 'placeholder',
      label: 'Placeholder',
      type: 'string',
      placeholder: 'Select...',
    },
    { key: 'disabled', label: 'Disabled', type: 'boolean', default: false },
  ],
  'ad-multi-select': [
    {
      key: 'placeholder',
      label: 'Placeholder',
      type: 'string',
      placeholder: 'Select...',
    },
    { key: 'disabled', label: 'Disabled', type: 'boolean', default: false },
  ],
  'ad-password': [
    {
      key: 'placeholder',
      label: 'Placeholder',
      type: 'string',
      placeholder: 'Password',
    },
    {
      key: 'toggleMask',
      label: 'Toggle mask',
      type: 'boolean',
      default: false,
    },
    { key: 'feedback', label: 'Feedback', type: 'boolean', default: true },
  ],
  'ad-editor': [{ key: 'placeholder', label: 'Placeholder', type: 'string' }],
  'ad-mega-menu': [
    {
      key: 'orientation',
      label: 'Orientation',
      type: 'select',
      options: ['', 'horizontal', 'vertical'],
    },
  ],
  'ad-menu': [],
  'ad-dock': [
    {
      key: 'position',
      label: 'Position',
      type: 'select',
      options: ['', 'top', 'bottom', 'left', 'right'],
    },
  ],
  'ad-speed-dial': [
    {
      key: 'direction',
      label: 'Direction',
      type: 'select',
      options: ['', 'up', 'down', 'left', 'right'],
    },
    {
      key: 'type',
      label: 'Type',
      type: 'select',
      options: ['', 'linear', 'circle', 'semi-circle', 'quarter-circle'],
    },
  ],

  // ─── NUC Templates ───
  'nuc-shiny-badge': [
    {
      key: 'icon',
      label: 'Icon',
      type: 'string',
      default: 'mdi:star',
      placeholder: 'mdi:star',
    },
    {
      key: 'label',
      label: 'Label',
      type: 'string',
      default: 'Badge label',
      placeholder: 'Badge text',
    },
  ],
  'nuc-grid-background': [],
  'nuc-trust-badges': [
    {
      key: 'items',
      label: 'Items (JSON)',
      type: 'json',
      placeholder: '[{"icon":"mdi:check","label":"Badge"}]',
    },
  ],

  // ─── NUC Sections ───
  'nuc-section-navbar': [],
  'nuc-section-footer': [],
  'nuc-section-faq': [
    {
      key: 'site',
      label: 'Site key',
      type: 'string',
      default: 'home',
      placeholder: 'home',
    },
    { key: 'lang', label: 'Language', type: 'string', placeholder: 'en' },
  ],
  'nuc-section-contact': [],
  'nuc-section-email-us': [],
}
