import Lara from '@primeuix/themes/lara'

export const primevueConfig = {
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
