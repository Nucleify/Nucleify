import Button from 'primevue/button'

import { ButtonInterface } from '@/types'

const ButtonTemplate = (args: ButtonInterface) => ({
    components: { Button },
    setup(): { args: ButtonInterface } {
        return { args }
    },
    template: `
    <Button
        :class="args.class"
        :severity="args.severity"
        :disabled="args.disabled"
        :raised="args.raised"
        :rounded="args.rounded"
        :text="args.text"
        :outlined="args.outlined"
        :style="{ gap: args.gap, padding: args.padding }"
    >
      <i :class="args.iconClass"></i>
      <span class="p-button-label">{{ args.label }}</span>
    </Button>
  `,
})

export default ButtonTemplate
