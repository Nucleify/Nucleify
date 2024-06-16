import Button from 'primevue/button'

import { ButtonInterface } from '@/types'

const ButtonTemplate = (args: ButtonInterface) => ({
  components: { Button },
  setup(): { args: ButtonInterface } {
    return { args }
  },
  template: `
    <Button :severity="args.severity" :disabled="args.disabled" :raised="args.raised" :rounded="args.rounded" :text="args.text" :outlined="args.outlined" :label="args.label" />
  `
})

export default ButtonTemplate
