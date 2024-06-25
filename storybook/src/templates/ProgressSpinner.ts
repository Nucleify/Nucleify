import ProgressSpinner from 'primevue/progressspinner'

import { ProgressSpinnerInterface } from '@/types'

const ProgressSpinnerTemplate = (args: ProgressSpinnerInterface) => ({
    components: { ProgressSpinner },
    setup(): { args: ProgressSpinnerInterface } {
        return { args }
    },
    template: `
    <ProgressSpinner
        :style="{ width: args.width, height: args.height }"
        :strokeWidth="args.strokeWidth"
        :fill="args.fill"
        :animationDuration="args.animationDuration"
    />
  `,
})

export default ProgressSpinnerTemplate
