export interface DocPageInterface {
  slug: string
  title: string
  category?: string
  order?: number
}

export interface DocCategoryInterface {
  name: string
  slug: string
  pages: DocPageInterface[]
  order?: number
}

export interface DocHeadingInterface {
  id: string
  text: string
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
