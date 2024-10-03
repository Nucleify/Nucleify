import { Ref } from 'vue'

import { ArticleInterface } from 'atomic/bosons/types'

export type ArticleResultsType = Ref<ArticleInterface[] | undefined>
