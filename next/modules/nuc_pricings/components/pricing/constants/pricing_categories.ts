import type { PricingCategoryInterface } from 'nucleify'

import type { TFunction } from 'i18next'

export const getPricingCategories = (
  t: TFunction
): PricingCategoryInterface[] => {
  return [
    {
      id: 'customer',
      name: t('pricing-category-customer-name'),
      description: t('pricing-category-customer-description'),
      icon: 'mdi:account-outline',
      plans: [
        {
          id: 'customer-starter',
          name: t('pricing-plan-customer-starter-name'),
          monthlyPrice: 49,
          oneTimePrice: 235,
          currency: '$',
          description: t('pricing-plan-customer-starter-description'),
          icon: 'mdi:rocket-launch-outline',
          monthlyLink: 'https://buy.stripe.com/4gM3cxgwledbayVgAhf3a0a',
          oneTimeLink: 'https://buy.stripe.com/00wcN7gwlfhffTf4Rzf3a0j',
          features: [
            {
              text: t('pricing-feature-customer-starter-1'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-customer-starter-2'),
              included: true,
              highlight: true,
            },
            { text: t('pricing-feature-customer-starter-3'), included: true },
            { text: t('pricing-feature-customer-starter-4'), included: true },
            { text: t('pricing-feature-customer-starter-5'), included: true },
            { text: t('pricing-feature-customer-starter-6'), included: true },
            {
              text: t('pricing-feature-customer-starter-7'),
              included: true,
              highlight: true,
            },
            { text: t('pricing-feature-customer-starter-8'), included: true },
          ],
        },
        {
          id: 'customer-professional',
          name: t('pricing-plan-customer-professional-name'),
          monthlyPrice: 99,
          oneTimePrice: 475,
          currency: '$',
          description: t('pricing-plan-customer-professional-description'),
          icon: 'mdi:trending-up',
          monthlyLink: 'https://buy.stripe.com/7sY3cxdk97ONePb4Rzf3a02',
          oneTimeLink: 'https://buy.stripe.com/cNi6oJa7X2ut8qN97Pf3a0k',
          popular: true,
          features: [
            {
              text: t('pricing-feature-customer-professional-1'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-customer-professional-2'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-customer-professional-3'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-customer-professional-4'),
              included: true,
            },
            {
              text: t('pricing-feature-customer-professional-5'),
              included: true,
            },
            {
              text: t('pricing-feature-customer-professional-6'),
              included: true,
            },
            {
              text: t('pricing-feature-customer-professional-7'),
              included: true,
              highlight: true,
            },
          ],
        },
        {
          id: 'customer-enterprise',
          name: t('pricing-plan-customer-enterprise-name'),
          monthlyPrice: 199,
          oneTimePrice: 955,
          currency: '$',
          description: t('pricing-plan-customer-enterprise-description'),
          icon: 'mdi:domain',
          monthlyLink: 'https://buy.stripe.com/28E9AVeod7ON8qN4Rzf3a04',
          oneTimeLink: 'https://buy.stripe.com/cNi28t1Br2ut36t0Bjf3a0l',
          features: [
            {
              text: t('pricing-feature-customer-enterprise-1'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-customer-enterprise-2'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-customer-enterprise-3'),
              included: true,
            },
            {
              text: t('pricing-feature-customer-enterprise-4'),
              included: true,
            },
            {
              text: t('pricing-feature-customer-enterprise-5'),
              included: true,
            },
            {
              text: t('pricing-feature-customer-enterprise-6'),
              included: true,
              highlight: true,
            },
          ],
        },
      ],
    },
    {
      id: 'programmer',
      name: t('pricing-category-programmer-name'),
      description: t('pricing-category-programmer-description'),
      icon: 'mdi:code-tags',
      plans: [
        {
          id: 'programmer-single',
          name: t('pricing-plan-programmer-single-name'),
          monthlyPrice: 79,
          oneTimePrice: 379,
          currency: '$',
          description: t('pricing-plan-programmer-single-description'),
          icon: 'mdi:laptop',
          monthlyLink: 'https://buy.stripe.com/cNi14p93T8SRcH3abTf3a06',
          oneTimeLink: 'https://buy.stripe.com/fZu6oJ93T0ml22pck1f3a0m',
          features: [
            {
              text: t('pricing-feature-programmer-single-1'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-programmer-single-2'),
              included: true,
              highlight: true,
            },
            { text: t('pricing-feature-programmer-single-3'), included: true },
            { text: t('pricing-feature-programmer-single-4'), included: true },
            { text: t('pricing-feature-programmer-single-5'), included: true },
            { text: t('pricing-feature-programmer-single-6'), included: true },
            { text: t('pricing-feature-programmer-single-7'), included: true },
            { text: t('pricing-feature-programmer-single-8'), included: true },
            { text: t('pricing-feature-programmer-single-9'), included: true },
          ],
        },
        {
          id: 'programmer-team',
          name: t('pricing-plan-programmer-team-name'),
          monthlyPrice: 149,
          oneTimePrice: 715,
          currency: '$',
          description: t('pricing-plan-programmer-team-description'),
          icon: 'mdi:account-group',
          monthlyLink: 'https://buy.stripe.com/6oU00l2Fv5GF7mJbfXf3a08',
          oneTimeLink: 'https://buy.stripe.com/9B600l7ZP6KJfTf2Jrf3a0n',
          popular: true,
          features: [
            {
              text: t('pricing-feature-programmer-team-1'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-programmer-team-2'),
              included: true,
              highlight: true,
            },
            { text: t('pricing-feature-programmer-team-3'), included: true },
            { text: t('pricing-feature-programmer-team-4'), included: true },
            { text: t('pricing-feature-programmer-team-5'), included: true },
          ],
        },
        {
          id: 'programmer-agency',
          name: t('pricing-plan-programmer-agency-name'),
          monthlyPrice: 299,
          oneTimePrice: 1435,
          currency: '$',
          description: t('pricing-plan-programmer-agency-description'),
          icon: 'mdi:office-building',
          monthlyLink: 'https://buy.stripe.com/9B6fZj93T4CB4axbfXf3a0b',
          oneTimeLink: 'https://buy.stripe.com/fZufZj6VLfhfayV3Nvf3a0o',
          features: [
            {
              text: t('pricing-feature-programmer-agency-1'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-programmer-agency-2'),
              included: true,
              highlight: true,
            },
            { text: t('pricing-feature-programmer-agency-3'), included: true },
            { text: t('pricing-feature-programmer-agency-4'), included: true },
            {
              text: t('pricing-feature-programmer-agency-5'),
              included: true,
              highlight: true,
            },
          ],
        },
      ],
    },
    {
      id: 'entrepreneur',
      name: t('pricing-category-entrepreneur-name'),
      description: t('pricing-category-entrepreneur-description'),
      icon: 'mdi:briefcase-outline',
      plans: [
        {
          id: 'entrepreneur-launch',
          name: t('pricing-plan-entrepreneur-launch-name'),
          monthlyPrice: 299,
          oneTimePrice: 1435,
          currency: '$',
          description: t('pricing-plan-entrepreneur-launch-description'),
          icon: 'mdi:lightbulb-outline',
          monthlyLink: 'https://buy.stripe.com/7sYdRbcg56KJ5eBbfXf3a0d',
          oneTimeLink: 'https://buy.stripe.com/5kQeVfgwld97bCZbfXf3a0p',
          features: [
            {
              text: t('pricing-feature-entrepreneur-launch-1'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-entrepreneur-launch-2'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-entrepreneur-launch-3'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-entrepreneur-launch-4'),
              included: true,
            },
            {
              text: t('pricing-feature-entrepreneur-launch-5'),
              included: true,
            },
            {
              text: t('pricing-feature-entrepreneur-launch-6'),
              included: true,
            },
            {
              text: t('pricing-feature-entrepreneur-launch-7'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-entrepreneur-launch-8'),
              included: true,
            },
          ],
        },
        {
          id: 'entrepreneur-growth',
          name: t('pricing-plan-entrepreneur-growth-name'),
          monthlyPrice: 499,
          oneTimePrice: 2395,
          currency: '$',
          description: t('pricing-plan-entrepreneur-growth-description'),
          icon: 'mdi:chart-line',
          monthlyLink: 'https://buy.stripe.com/4gMbJ3dk97ONdL75VDf3a0f',
          oneTimeLink: 'https://buy.stripe.com/dRm5kF4NDedbdL797Pf3a0q',
          popular: true,
          features: [
            {
              text: t('pricing-feature-entrepreneur-growth-1'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-entrepreneur-growth-2'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-entrepreneur-growth-3'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-entrepreneur-growth-4'),
              included: true,
            },
            {
              text: t('pricing-feature-entrepreneur-growth-5'),
              included: true,
            },
            {
              text: t('pricing-feature-entrepreneur-growth-6'),
              included: true,
              highlight: true,
            },
          ],
        },
        {
          id: 'entrepreneur-scale',
          name: t('pricing-plan-entrepreneur-scale-name'),
          monthlyPrice: 999,
          oneTimePrice: 4795,
          currency: '$',
          description: t('pricing-plan-entrepreneur-scale-description'),
          icon: 'mdi:rocket',
          monthlyLink: 'https://buy.stripe.com/8x2bJ36VL5GFePb3Nvf3a0h',
          oneTimeLink: 'https://buy.stripe.com/eVqaEZcg56KJ7mJdo5f3a0r',
          features: [
            {
              text: t('pricing-feature-entrepreneur-scale-1'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-entrepreneur-scale-2'),
              included: true,
              highlight: true,
            },
            {
              text: t('pricing-feature-entrepreneur-scale-3'),
              included: true,
              highlight: true,
            },
            { text: t('pricing-feature-entrepreneur-scale-4'), included: true },
            { text: t('pricing-feature-entrepreneur-scale-5'), included: true },
            { text: t('pricing-feature-entrepreneur-scale-6'), included: true },
            {
              text: t('pricing-feature-entrepreneur-scale-7'),
              included: true,
              highlight: true,
            },
          ],
        },
      ],
    },
  ]
}
