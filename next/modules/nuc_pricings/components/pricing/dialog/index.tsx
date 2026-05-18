'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

import { AdButton, AdDialog, NucSubmitButton } from 'nucleify'

import { NucPricingEmailUs } from '../NucPricingEmailUs'
import type { BillingPeriodType, PricingPlanInterface } from '../types'
import { formatPrice, getPrice } from '../utils'

import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'

interface PricingDialogProps {
  isOpen: boolean
  onClose: () => void
  plan: PricingPlanInterface | null
  billingPeriod: BillingPeriodType
  previousPlanName?: string | null
}

export const NucPricingDialog: React.FC<PricingDialogProps> = ({
  isOpen,
  onClose,
  plan,
  billingPeriod,
  previousPlanName,
}) => {
  const { t } = useTranslation()
  const router = useRouter()

  const FEATURES_LIMIT = 6

  const [showAllFeatures, setShowAllFeatures] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const visibleFeatures = useMemo(() => {
    if (!plan?.features) return []
    if (showAllFeatures || plan.features.length <= FEATURES_LIMIT) {
      return plan.features
    }
    return plan.features.slice(0, FEATURES_LIMIT)
  }, [plan?.features, showAllFeatures])

  const hasMoreFeatures = (plan?.features?.length ?? 0) > FEATURES_LIMIT
  const remainingFeaturesCount = (plan?.features?.length ?? 0) - FEATURES_LIMIT

  const handleEmailSuccess = () => {
    setShowEmailDialog(false)
    router.push('/thank-you')
  }

  if (!isMounted) return null

  const dialogHeader = plan && (
    <div className="plan-dialog-header-wrapper">
      <div className="plan-dialog-header">
        <div className="plan-dialog-icon">
          <Icon icon={plan.icon} />
        </div>
        <h3>{plan.name}</h3>
        <p>{plan.description}</p>
      </div>

      <div className="plan-dialog-price">
        <span className="currency">{plan.currency}</span>
        <span className="amount">
          {formatPrice(getPrice(plan, billingPeriod))}
        </span>
        <span className="period">
          {billingPeriod === 'monthly'
            ? t('pricing-dialog-period-month')
            : t('pricing-dialog-period-one-time')}
        </span>
      </div>
      <h4>{t('pricing-dialog-whats-included')}</h4>
    </div>
  )

  const dialogFooter = (
    <div className="plan-dialog-footer-wrapper">
      <NucSubmitButton
        label={t('pricing-dialog-contact-email')}
        className="plan-dialog-button"
        icon="mdi:email-outline"
        onClick={() => setShowEmailDialog(true)}
      />

      {billingPeriod === 'monthly' && (
        <p className="plan-dialog-note">
          <Icon icon="mdi:information-outline" />
          {t('pricing-dialog-monthly-note')}
        </p>
      )}
    </div>
  )

  return (
    <>
      {plan && (
        <AdDialog
          visible={isOpen}
          onHide={onClose}
          modal
          dismissableMask
          draggable={false}
          showHeader
          className="pricing-plan-dialog"
          header={dialogHeader}
          footer={dialogFooter}
        >
          <div className="plan-dialog-content">
            {previousPlanName && (
              <div className="plan-dialog-includes-previous">
                <Icon icon="mdi:arrow-up-circle-outline" />
                <span>
                  {t('pricing-dialog-everything-plus', {
                    plan: previousPlanName,
                  })}
                </span>
              </div>
            )}

            <div className="plan-dialog-benefits">
              <ul>
                {visibleFeatures.map((feature, index) => (
                  <li
                    key={index}
                    className={feature.highlight ? 'highlight' : ''}
                  >
                    <Icon icon="mdi:check-circle" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              {hasMoreFeatures && !showAllFeatures && (
                <AdButton
                  type="button"
                  adType="main"
                  text
                  className="show-more-features"
                  label={t('pricing-dialog-show-more-features', {
                    count: remainingFeaturesCount,
                  })}
                  icon="mdi:chevron-down"
                  onClick={() => setShowAllFeatures(true)}
                />
              )}
            </div>
          </div>
        </AdDialog>
      )}

      <NucPricingEmailUs
        visible={showEmailDialog}
        onHide={() => setShowEmailDialog(false)}
        header={t('offer-trust-consultation')}
        onSuccess={handleEmailSuccess}
      />
    </>
  )
}
export default NucPricingDialog
