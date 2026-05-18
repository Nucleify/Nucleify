export interface FeatureItemInterface {
  icon: string
  label: string
}

export interface FeatureTemplateInterface {
  sectionId: string
  badge: string
  headingPrefix: string
  headingHighlight: string
  description: string
  features: FeatureItemInterface[]
  visualPosition?: 'left' | 'right'
}
