import { definePreset } from '@primevue/themes'
import Lara from '@primevue/themes/lara'

export const DataManagerPreset = definePreset(Lara, {
  components: {
    card: {
      root: {
        background: '#13131399',
      },
    },
    datatable: {
      headers: {
        root: {
          background: '#13131399',
        },
      },
      row: {
        root: {
          background: '#13131399',
        },
      },
    },
    dialog: {
      root: {
        background: '#13131399',
      },
    },
    inputtext: {
      root: {
        background: '#13131399',
      },
    },
    menu: {
      root: {
        background: '#13131399',
      },
    },
    paginator: {
      root: {
        background: 'transparent',
      },
    },
    select: {
      root: {
        background: '#13131399',
      },
    },
    selectbutton: {
      root: {
        background: '#13131399',
      },
    },
    textarea: {
      root: {
        background: '#13131399',
      },
    },
    toast: {
      root: {
        background: '#13131399',
      },
    },
  },
})
