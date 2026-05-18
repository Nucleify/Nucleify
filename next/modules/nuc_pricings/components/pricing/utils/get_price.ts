import type { BillingPeriodType, PricingPlanInterface } from 'nucleify'

export function getPrice(
  plan: PricingPlanInterface,
  billingPeriod: BillingPeriodType
): number {
  return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.oneTimePrice
}
