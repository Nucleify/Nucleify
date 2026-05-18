import type { TrustBadgeItemInterface } from 'nucleify'

import type { TFunction } from 'i18next'

export const getTrustItems = (t: TFunction): TrustBadgeItemInterface[] => {
  return [
    { icon: 'mdi:shield-check', label: t('pricing-trust-moneyback') },
    { icon: 'mdi:lock-outline', label: t('pricing-trust-secure') },
    { icon: 'mdi:headset', label: t('pricing-trust-consultation') },
  ]
}
