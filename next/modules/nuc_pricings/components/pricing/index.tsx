'use client'

import './_index.scss'

import React, { useMemo, useState } from 'react'

import {
  AdButton,
  NucSectionEmailUsDialog,
  NucShinyBadge,
  NucSubmitButton,
  NucTrustBadges,
} from 'nucleify'

import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import { getPricingCategories, getTrustItems } from './constants'
import { NucPricingDialog } from './dialog'
import type { BillingPeriodType, PricingPlanInterface } from './types'
import { formatPrice, getPrice } from './utils'
export const NucSectionPricing: React.FC = () => {
  const { t } = useTranslation()

  const [activeCategory, setActiveCategory] = useState('customer')
  const [billingPeriod, setBillingPeriod] =
    useState<BillingPeriodType>('one-time')
  const [showPlanDialog, setShowPlanDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PricingPlanInterface | null>(
    null
  )
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(-1)

  const pricingCategories = useMemo(() => getPricingCategories(t), [t])
  const trustItems = useMemo(() => getTrustItems(t), [t])

  const currentPlans = useMemo(() => {
    const category = pricingCategories.find((c) => c.id === activeCategory)
    return category?.plans || []
  }, [pricingCategories, activeCategory])

  const previousPlanName = useMemo(() => {
    if (selectedPlanIndex > 0) {
      return currentPlans[selectedPlanIndex - 1]?.name ?? null
    }
    return null
  }, [selectedPlanIndex, currentPlans])

  const openPlanDialog = (plan: PricingPlanInterface) => {
    setSelectedPlan(plan)
    setSelectedPlanIndex(currentPlans.findIndex((p) => p.id === plan.id))
    setShowPlanDialog(true)
  }

  return (
    <section id="pricing">
      <div className="pricing-glow"></div>
      <div className="pricing-container container">
        <div className="pricing-header">
          <NucShinyBadge icon="mdi:tag-outline" label={t('pricing-badge')} />
          <h2 className="pricing-heading">
            {t('pricing-heading-prefix')}{' '}
            <span className="highlight">{t('pricing-heading-highlight')}</span>
          </h2>
          <p className="pricing-description">
            {t('pricing-description')}{' '}
            <span className="vat-note">{t('pricing-vat-note')}</span>
          </p>
          <NucSectionEmailUsDialog
            buttonClass="ask-sticker"
            buttonLabel={t('pricing-help-choosing')}
            buttonStrong={t('pricing-lets-talk')}
          />
        </div>

        <div className="pricing-controls">
          <div className="billing-toggle">
            <AdButton
              type="button"
              adType="main"
              className={`billing-option ${billingPeriod === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingPeriod('monthly')}
            >
              <Icon icon="mdi:calendar-month" />
              <span>{t('pricing-billing-monthly')}</span>
            </AdButton>
            <AdButton
              type="button"
              adType="main"
              className={`billing-option ${billingPeriod === 'one-time' ? 'active' : ''}`}
              onClick={() => setBillingPeriod('one-time')}
            >
              <Icon icon="mdi:lightning-bolt" />
              <span>{t('pricing-billing-one-time')}</span>
              <span className="save-badge">{t('pricing-save-badge')}</span>
            </AdButton>
          </div>

          <div className="category-tabs">
            {pricingCategories.map((category) => (
              <AdButton
                key={category.id}
                type="button"
                adType="main"
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <Icon icon={category.icon} />
                <span>{category.name}</span>
              </AdButton>
            ))}
          </div>
        </div>

        <div key={`${activeCategory}-${billingPeriod}`} className="plans-grid">
          {currentPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`plan-card ${plan.popular ? 'popular' : ''}`}
              style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
              onClick={() => openPlanDialog(plan)}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <Icon icon="mdi:star" />
                  <span>{t('pricing-most-popular')}</span>
                </div>
              )}

              <div className="plan-header">
                <div className="plan-icon-wrapper">
                  <Icon icon={plan.icon} className="plan-icon" />
                </div>
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="plan-price">
                <div className="price-row">
                  <span className="currency">{plan.currency}</span>
                  <span className="amount">
                    {formatPrice(getPrice(plan, billingPeriod))}
                  </span>
                </div>
                <span className="period">
                  {billingPeriod === 'monthly'
                    ? t('pricing-period-month')
                    : t('pricing-period-one-time')}
                </span>
              </div>

              <ul className="plan-features">
                {plan.features.slice(0, 5).map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    className={`feature-item ${feature.included ? 'included' : ''} ${
                      feature.highlight ? 'highlight' : ''
                    }`}
                  >
                    <Icon
                      icon={
                        feature.included
                          ? 'mdi:check-circle'
                          : 'mdi:close-circle'
                      }
                      className="feature-icon"
                    />
                    <span>{feature.text}</span>
                  </li>
                ))}

                {plan.features.length > 5 && (
                  <li className="feature-item more-features">
                    <Icon
                      icon="mdi:plus-circle-outline"
                      className="feature-icon"
                    />
                    <span>
                      {t('pricing-more-features', {
                        count: plan.features.length - 5,
                      })}
                    </span>
                  </li>
                )}
              </ul>

              {index > 0 && (
                <p className="includes-previous">
                  <Icon icon="mdi:layers-outline" />
                  <span>
                    {t('pricing-includes-all-features', {
                      plan: currentPlans[index - 1].name,
                    })}
                  </span>
                </p>
              )}

              <NucSubmitButton
                label={t('pricing-choose-plan')}
                className={`plan-button ${plan.popular ? 'primary' : ''}`}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  openPlanDialog(plan)
                }}
              />
            </div>
          ))}
        </div>
        {billingPeriod === 'monthly' && (
          <p className="contract-note">
            <Icon icon="mdi:file-document-outline" />
            {t('pricing-contract-note')}{' '}
            <span className="note-highlight">
              {t('pricing-contract-note-highlight')}
            </span>
          </p>
        )}

        <NucTrustBadges items={trustItems} />
      </div>

      <NucPricingDialog
        isOpen={showPlanDialog}
        onClose={() => setShowPlanDialog(false)}
        plan={selectedPlan}
        billingPeriod={billingPeriod}
        previousPlanName={previousPlanName}
      />
    </section>
  )
}
export default NucSectionPricing
