import Textarea from 'primevue/textarea'

import { TextAreaInterface } from '@/types'

const TextAreaTemplate = (args: TextAreaInterface) => ({
    components: { Textarea },
    setup(): { args: TextAreaInterface } {
        return { args }
    },
    template: `
    <Textarea
        :rows="args.rows"
        :cols="args.cols"
        :class="args.invalid ? 'p-invalid' : '' + args.class"
        :disabled="args.disabled"
        :auto-resize="args.autoResize"
    />
  `,
})

export default TextAreaTemplate
