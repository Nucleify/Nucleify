export interface PricingFeatureInterface {
  text: string
  included: boolean
  highlight?: boolean
}

export interface PricingPlanInterface {
  id: string
  name: string
  monthlyPrice: number
  oneTimePrice: number
  currency: string
  description: string
  features: PricingFeatureInterface[]
  monthlyLink?: string
  oneTimeLink?: string
  popular?: boolean
  icon: string
  accentColor?: string
}

export interface PricingCategoryInterface {
  id: string
  name: string
  description: string
  icon: string
  plans: PricingPlanInterface[]
}
