import { definePreset } from '@primevue/themes'
import Lara from '@primevue/themes/lara'

export const DataManagerPreset = definePreset(Lara, {
  components: {
    card: {
      colorScheme: {
        dark: {
          root: {
            background: '#13131399',
          },
        },
      },
    },
    datatable: {
      headers: {
        colorScheme: {
          dark: {
            root: {
              background: '#13131399',
            },
          },
        },
      },
      row: {
        colorScheme: {
          dark: {
            root: {
              background: '#13131399',
            },
          },
        },
      },
    },
    dialog: {
      colorScheme: {
        dark: {
          root: {
            background: '#13131399',
          },
        },
      },
    },
    inputtext: {
      colorScheme: {
        dark: {
          root: {
            background: '#13131399',
          },
        },
      },
    },
    paginator: {
      colorScheme: {
        dark: {
          root: {
            background: 'transparent',
          },
        },
      },
    },
    select: {
      colorScheme: {
        dark: {
          root: {
            background: '#13131399',
          },
        },
      },
    },
    selectbutton: {
      colorScheme: {
        dark: {
          root: {
            background: '#13131399',
          },
        },
      },
    },
    textarea: {
      colorScheme: {
        dark: {
          root: {
            background: '#13131399',
          },
        },
      },
    },
  },
})
