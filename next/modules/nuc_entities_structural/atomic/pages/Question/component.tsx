'use client'

import { useEffect } from 'react'

import { NucEntityChartCard } from '../../../../nuc_charts/atomic/template/entity-chart-card'
import { useNucDialog } from '../../../../nuc_dialog/utils/use_nuc_dialog'
import { isMobile } from '../../../../nuc_media/utils/is_mobile'
import { questionRequests } from '../../bosons/utils'
import { NucQuestionDashboard } from '../../templates/Dashboard'

export default function NucQuestionPage(): React.JSX.Element {
  const { closeDialog } = useNucDialog()
  const { results, loading, getAllQuestions } = questionRequests(closeDialog)

  useEffect(() => {
    void getAllQuestions(true)
  }, [])

  return (
    <div className="panel-container">
      <NucEntityChartCard
        entity="Question"
        className="annual-chart-card"
        chartMethodType="annual"
        type="bar"
        direction={isMobile() ? 'horizontal' : 'vertical'}
        data={{ question: results }}
        loading={loading}
      />
      <NucQuestionDashboard
        data={results as ObjectType[] | undefined}
        getData={getAllQuestions}
        loading={loading}
      />
    </div>
  )
}
