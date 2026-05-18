'use client'

import type { JSX } from 'react'
import { useEffect } from 'react'

import {
  activityRequests,
  isMobile,
  NucActivityDashboard,
  NucEntityChartCard,
  useNucDialog,
} from 'nucleify'

export function NucActivityPage(): JSX.Element {
  const { closeDialog } = useNucDialog()
  const { loading, results, getAllActivities } = activityRequests(closeDialog)

  useEffect(() => {
    void getAllActivities(true)
  }, [])

  return (
    <div className="panel-container">
      <NucEntityChartCard
        entity="Activity"
        chartClass="annual-chart-card"
        chartMethodType="annual"
        type="bar"
        direction={isMobile() ? 'horizontal' : 'vertical'}
        data={{ activity: results }}
        loading={loading}
      />
      <NucActivityDashboard
        data={results ?? []}
        getData={getAllActivities}
        loading={loading}
      />
    </div>
  )
}
