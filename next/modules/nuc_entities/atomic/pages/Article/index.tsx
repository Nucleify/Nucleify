'use client'

import type { JSX } from 'react'
import { useEffect } from 'react'

import {
  articleRequests,
  isMobile,
  NucArticleDashboard,
  NucEntityChartCard,
  useNucDialog,
} from 'nucleify'

export function NucArticlePage(): JSX.Element {
  const { closeDialog } = useNucDialog()
  const { loading, results, getAllArticles } = articleRequests(closeDialog)

  useEffect(() => {
    void getAllArticles(true)
  }, [])

  return (
    <div className="panel-container">
      <NucEntityChartCard
        entity="Article"
        chartClass="annual-chart-card"
        chartMethodType="annual"
        type="bar"
        direction={isMobile() ? 'horizontal' : 'vertical'}
        data={{ article: results }}
        loading={loading}
      />
      <NucArticleDashboard
        data={results ?? []}
        getData={getAllArticles}
        loading={loading}
      />
    </div>
  )
}
