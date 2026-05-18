'use client'

import { useEffect } from 'react'

import { NucEntityChartCard } from '../../../../nuc_charts/atomic/template/entity-chart-card'
import { useNucDialog } from '../../../../nuc_dialog/utils/use_nuc_dialog'
import { isMobile } from '../../../../nuc_media/utils/is_mobile'
import { technologyRequests } from '../../bosons/utils'
import { NucTechnologyDashboard } from '../../templates/Dashboard'

export default function NucTechnologyPage(): React.JSX.Element {
  const { closeDialog } = useNucDialog()
  const { results, loading, getAllTechnologies } =
    technologyRequests(closeDialog)

  useEffect(() => {
    void getAllTechnologies(true)
  }, [])

  return (
    <div className="panel-container">
      <NucEntityChartCard
        entity="Technology"
        className="annual-chart-card"
        chartMethodType="annual"
        type="bar"
        direction={isMobile() ? 'horizontal' : 'vertical'}
        data={{ technology: results }}
        loading={loading}
      />
      <NucTechnologyDashboard
        data={results as ObjectType[] | undefined}
        getData={getAllTechnologies}
        loading={loading}
      />
    </div>
  )
}
