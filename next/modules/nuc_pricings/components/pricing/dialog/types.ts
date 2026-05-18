import type { PricingPlanInterface } from '../types/interfaces'
import type { BillingPeriodType } from '../types/variables'

export interface PricingDialogInterface {
  modelValue: boolean
  plan: PricingPlanInterface | null
  billingPeriod: BillingPeriodType
  previousPlanName?: string | null
}
