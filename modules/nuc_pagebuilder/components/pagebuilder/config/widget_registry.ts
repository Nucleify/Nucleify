import type { PageBuilderWidgetDefinitionInterface } from '../types'

const ATOMIC_ATOM_TAGS = [
  'ad-avatar',
  'ad-badge',
  'ad-button',
  'ad-checkbox',
  'ad-divider',
  'ad-heading',
  'ad-icon',
  'ad-image',
  'ad-input-mask',
  'ad-input-number',
  'ad-input-otp',
  'ad-input-text',
  'ad-knob',
  'ad-label',
  'ad-logo',
  'ad-paragraph',
  'ad-progress-bar',
  'ad-progress-spinner',
  'ad-radio-button',
  'ad-rating',
  'ad-scroll-top',
  'ad-select-button',
  'ad-skeleton',
  'ad-slider',
  'ad-tag',
  'ad-textarea',
  'ad-tooltip',
] as const

const ATOMIC_MOLECULE_TAGS = ['ad-anchor', 'ad-float-label', 'ad-tile'] as const

const ATOMIC_ORGANISM_TAGS = [
  'ad-accordion',
  'ad-auto-complete',
  'ad-card',
  'ad-carousel',
  'ad-chart',
  'ad-color-picker',
  'ad-data-table',
  'ad-date-picker',
  'ad-deferred-content',
  'ad-dialog',
  'ad-dock',
  'ad-editor',
  'ad-fieldset',
  'ad-file-upload',
  'ad-galleria',
  'ad-mega-menu',
  'ad-menu',
  'ad-meter-group',
  'ad-multi-select',
  'ad-navbar',
  'ad-organization-chart',
  'ad-panel',
  'ad-password',
  'ad-pick-list',
  'ad-popover',
  'ad-scroll-panel',
  'ad-select',
  'ad-speed-dial',
  'ad-swiper',
  'ad-tabs',
  'ad-terminal',
  'ad-timeline',
  'ad-toast',
  'ad-tree',
] as const

function formatLabel(tag: string): string {
  return tag
    .replace(/^ad-|^nuc-/, '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

const ATOMIC_DEFAULT_PROPS: Record<string, Record<string, unknown>> = {
  'ad-button': { label: 'Button', severity: 'primary' },
  'ad-heading': { tag: 2, text: 'Heading' },
  'ad-paragraph': { text: 'Paragraph text' },
  'ad-label': { label: 'Label' },
  'ad-tag': { value: 'Tag' },
  'ad-badge': { value: '1' },
  'ad-image': { src: '/img/logo.svg', alt: 'Image' },
  'ad-icon': { icon: 'mdi:star', size: '24px' },
  'ad-divider': {},
  'ad-avatar': { label: 'A', size: 'large' },
  'ad-progress-bar': { value: 50, showValue: true },
  'ad-rating': { stars: 5 },
  'ad-knob': { min: 0, max: 100 },
  'ad-skeleton': { width: '100%', height: '1rem' },
  'ad-slider': { min: 0, max: 100 },
  'ad-anchor': { href: '#', label: 'Link' },
  'ad-tile': { header: 'Tile', icon: 'mdi:star' },
  'ad-card': { title: 'Card Title' },
  'ad-fieldset': { legend: 'Fieldset' },
  'ad-panel': { header: 'Panel' },
}

function atomicWidget(
  tag: string,
  group: string
): PageBuilderWidgetDefinitionInterface {
  return {
    key: `atomic-${tag}`,
    label: `Atomic ${group}: ${formatLabel(tag)}`,
    source: 'atomic',
    type: 'component',
    componentTag: tag,
    defaultProps: ATOMIC_DEFAULT_PROPS[tag] ?? {},
  }
}

export const PAGE_BUILDER_WIDGET_REGISTRY: PageBuilderWidgetDefinitionInterface[] =
  [
    {
      key: 'native-heading',
      label: 'Heading',
      source: 'native',
      type: 'heading',
      defaultProps: {
        text: 'New heading',
        level: 'h2',
      },
    },
    {
      key: 'native-text',
      label: 'Text',
      source: 'native',
      type: 'text',
      defaultProps: {
        text: 'Write your content here.',
      },
    },
    {
      key: 'native-button',
      label: 'Button',
      source: 'native',
      type: 'button',
      defaultProps: {
        text: 'Click me',
        href: '#',
      },
    },
    {
      key: 'native-image',
      label: 'Image',
      source: 'native',
      type: 'image',
      defaultProps: {
        src: '/img/logo.svg',
        alt: 'Image',
        width: '',
      },
    },
    {
      key: 'native-video',
      label: 'Video Embed',
      source: 'native',
      type: 'video',
      defaultProps: {
        src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        width: '100%',
        height: '400',
      },
    },
    {
      key: 'native-divider',
      label: 'Divider',
      source: 'native',
      type: 'divider',
      defaultProps: {},
    },
    {
      key: 'native-spacer',
      label: 'Spacer',
      source: 'native',
      type: 'spacer',
      defaultProps: {
        height: '40px',
      },
    },
    {
      key: 'native-html',
      label: 'Raw HTML',
      source: 'native',
      type: 'html',
      defaultProps: {
        html: '<div style="padding:16px;border:1px dashed #333;border-radius:8px;">Custom HTML block</div>',
      },
    },
    {
      key: 'native-list',
      label: 'List',
      source: 'native',
      type: 'list',
      defaultProps: {
        items: 'Item one\nItem two\nItem three',
        ordered: false,
      },
    },
    {
      key: 'native-quote',
      label: 'Blockquote',
      source: 'native',
      type: 'quote',
      defaultProps: {
        text: 'To be or not to be, that is the question.',
        cite: 'Shakespeare',
      },
    },
    {
      key: 'native-code',
      label: 'Code Block',
      source: 'native',
      type: 'code',
      defaultProps: {
        code: 'console.log("Hello world")',
        language: 'javascript',
      },
    },
    ...ATOMIC_ATOM_TAGS.map((tag) => atomicWidget(tag, 'Atom')),
    ...ATOMIC_MOLECULE_TAGS.map((tag) => atomicWidget(tag, 'Molecule')),
    ...ATOMIC_ORGANISM_TAGS.map((tag) => atomicWidget(tag, 'Organism')),
    {
      key: 'templates-grid-background',
      label: 'Template: Grid Background',
      source: 'templates',
      type: 'component',
      componentTag: 'nuc-grid-background',
      defaultProps: {},
    },
    {
      key: 'templates-shiny-badge',
      label: 'Template: Shiny Badge',
      source: 'templates',
      type: 'component',
      componentTag: 'nuc-shiny-badge',
      defaultProps: {
        label: 'Badge label',
        icon: 'mdi:star',
      },
    },
    {
      key: 'templates-trust-badges',
      label: 'Template: Trust Badges',
      source: 'templates',
      type: 'component',
      componentTag: 'nuc-trust-badges',
      defaultProps: {
        items: [],
      },
    },
    {
      key: 'sections-navbar',
      label: 'Section: Navbar',
      source: 'sections',
      type: 'component',
      componentTag: 'nuc-section-navbar',
      defaultProps: {},
    },
    {
      key: 'sections-footer',
      label: 'Section: Footer',
      source: 'sections',
      type: 'component',
      componentTag: 'nuc-section-footer',
      defaultProps: {},
    },
    {
      key: 'sections-faq',
      label: 'Section: FAQ',
      source: 'sections',
      type: 'component',
      componentTag: 'nuc-section-faq',
      defaultProps: {},
    },
    {
      key: 'sections-contact',
      label: 'Section: Contact',
      source: 'sections',
      type: 'component',
      componentTag: 'nuc-section-contact',
      defaultProps: {},
    },
    {
      key: 'sections-email-us',
      label: 'Section: Email Us',
      source: 'sections',
      type: 'component',
      componentTag: 'nuc-section-email-us',
      defaultProps: {},
    },
  ]
