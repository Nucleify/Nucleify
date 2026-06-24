import Lara from '@primeuix/themes/lara'

const PRIMEVUE_COMPONENT_INCLUDE = [
  'Accordion',
  'AccordionContent',
  'AccordionHeader',
  'AccordionPanel',
  'Avatar',
  'Badge',
  'Button',
  'Card',
  'Chart',
  'Checkbox',
  'ColorPicker',
  'Column',
  'DataTable',
  'DatePicker',
  'DeferredContent',
  'Dialog',
  'Divider',
  'Dock',
  'Drawer',
  'FileUpload',
  'FloatLabel',
  'Image',
  'InputMask',
  'InputNumber',
  'InputOtp',
  'InputText',
  'Knob',
  'Menu',
  'MeterGroup',
  'Paginator',
  'Password',
  'Popover',
  'ProgressBar',
  'ProgressSpinner',
  'RadioButton',
  'Rating',
  'ScrollPanel',
  'ScrollTop',
  'Select',
  'SelectButton',
  'Skeleton',
  'Slider',
  'SpeedDial',
  'Tag',
  'Terminal',
  'Textarea',
  'Toast',
  'Tree',
]

const PRIMEVUE_DIRECTIVE_INCLUDE = ['ripple']

export const primevueConfig = {
  autoImport: false,
  components: {
    include: [...PRIMEVUE_COMPONENT_INCLUDE],
    exclude: [],
  },
  directives: {
    include: [...PRIMEVUE_DIRECTIVE_INCLUDE],
    exclude: [],
  },
  options: {
    theme: {
      preset: Lara,
      options: {
        darkModeSelector: '.p-dark',
        cssLayer: {
          name: 'primevue',
          order: 'app-styles, primevue',
        },
      },
    },
    ripple: true,
  },
}
