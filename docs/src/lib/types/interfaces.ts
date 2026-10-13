import type { LocalizedString } from '../utils/resolve_localized'

export interface DocPageInterface {
  slug: string
  title: LocalizedString
  category?: string
  order?: number
}

export interface DocCategoryInterface {
  name: LocalizedString
  slug: string
  pages: DocPageInterface[]
  order?: number
}

export interface DocHeadingInterface {
  id: string
  text: string
  html?: string
  level: number
  children?: DocHeadingInterface[]
}

export interface DocLanguageInterface {
  code: string
  name: string
  isDefault: boolean
}

export interface DocPathInfoInterface {
  lang: string
  category: string
  slug: string
}
