'use client'

import type { JSX } from 'react'
import { useEffect } from 'react'

import {
  contactRequests,
  isMobile,
  NucContactDashboard,
  NucEntityChartCard,
  useNucDialog,
} from 'nucleify'

export function NucContactPage(): JSX.Element {
  const { closeDialog } = useNucDialog()
  const { loading, results, getAllContacts } = contactRequests(closeDialog)

  useEffect(() => {
    void getAllContacts(true)
  }, [])

  return (
    <div className="panel-container">
      <NucEntityChartCard
        entity="Contact"
        chartClass="annual-chart-card"
        chartMethodType="annual"
        type="bar"
        direction={isMobile() ? 'horizontal' : 'vertical'}
        data={{ contact: results }}
        loading={loading}
      />
      <NucContactDashboard
        data={results ?? []}
        getData={getAllContacts}
        loading={loading}
      />
    </div>
  )
}
