import type { BillingPeriodType, PricingPlanInterface } from '../types'

import { getPaymentLink } from './get_payment_link'

export function openPaymentLink(
  plan: PricingPlanInterface,
  billingPeriod: BillingPeriodType
): void {
  window.open(getPaymentLink(plan, billingPeriod), '_blank')
}
