import type { BillingPeriodType, PricingPlanInterface } from 'nucleify'

export function getPaymentLink(
  plan: PricingPlanInterface,
  billingPeriod: BillingPeriodType
): string {
  return billingPeriod === 'monthly'
    ? plan.monthlyLink || '#'
    : plan.oneTimeLink || '#'
}
