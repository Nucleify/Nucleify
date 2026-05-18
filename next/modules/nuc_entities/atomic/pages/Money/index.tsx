'use client'

import type { JSX } from 'react'
import { useEffect } from 'react'

import {
  isMobile,
  moneyRequests,
  NucEntityChartCard,
  NucMoneyDashboard,
  useNucDialog,
} from 'nucleify'

export function NucMoneyPage(): JSX.Element {
  const { closeDialog } = useNucDialog()
  const { loading, results, getAllMoney } = moneyRequests(closeDialog)

  useEffect(() => {
    void getAllMoney(true)
  }, [])

  return (
    <div className="panel-container">
      <NucEntityChartCard
        entity="Money"
        chartClass="annual-chart-card"
        chartMethodType="annual"
        type="bar"
        direction={isMobile() ? 'horizontal' : 'vertical'}
        data={{ money: results }}
        loading={loading}
      />
      <NucMoneyDashboard
        data={results ?? []}
        getData={getAllMoney}
        loading={loading}
      />
    </div>
  )
}
