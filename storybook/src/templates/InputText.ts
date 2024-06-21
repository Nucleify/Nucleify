import InputText from 'primevue/inputtext'

import { InputTextInterface } from '@/types'

const InputTextTemplate = (args: InputTextInterface) => ({
  components: { InputText },
  setup(): { args: InputTextInterface } {
    return { args }
  },
  template: `
    <InputText
        :v-model="args.value"
        :class="args.class"
        :type="args.type"
        :unstyled="args.unstyled"
        :size="args.size"
        :variant="args.variant"
        :invalid="args.invalid"
        :style="{ width: args.width, height: args.height, padding: args.padding }"
    />
  `
})

export default InputTextTemplate
