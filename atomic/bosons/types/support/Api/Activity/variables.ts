import { Ref } from 'vue'

import { ActivityLogInterface } from 'atomic/bosons/types'

export type ActivityResultsType = Ref<ActivityLogInterface[] | undefined>
