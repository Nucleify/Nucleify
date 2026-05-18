'use client'

import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { NucEntityChartCard } from '../../../../nuc_charts/atomic/template/entity-chart-card'
import { isMobile } from '../../../../nuc_media/utils/is_mobile'
import { NucTiles } from '../../../../nuc_templates/components/tiles'
import type { NucTilesInterface } from '../../../../nuc_templates/components/tiles/interfaces'
import { questionRequests, technologyRequests } from '../../bosons/utils'
import {
  NucQuestionDashboard,
  NucTechnologyDashboard,
} from '../../templates/Dashboard'

export default function NucStructuralPage(): React.JSX.Element {
  const params = useParams<{ lang?: string }>()
  const lang = params?.lang || 'en'
  const { t } = useTranslation()

  const {
    results: questions,
    createdLastWeek: questionsCreatedLastWeek,
    loading: questionsLoading,
    getAllQuestions,
    getCountQuestionsByCreatedLastWeek,
  } = questionRequests()

  const {
    results: technologies,
    createdLastWeek: technologiesCreatedLastWeek,
    loading: technologiesLoading,
    getAllTechnologies,
    getCountTechnologiesByCreatedLastWeek,
  } = technologyRequests()

  const [allLoaded, setAllLoaded] = useState<boolean>(false)

  useEffect(() => {
    void getAllQuestions(true)
    void getCountQuestionsByCreatedLastWeek()
    void getAllTechnologies(true)
    void getCountTechnologiesByCreatedLastWeek()
  }, [])

  useEffect(() => {
    if (!questionsLoading && !technologiesLoading) {
      const timeout = window.setTimeout(() => {
        setAllLoaded(true)
      }, 200)

      return () => {
        window.clearTimeout(timeout)
      }
    }

    setAllLoaded(false)
    return undefined
  }, [questionsLoading, technologiesLoading])

  const entities = useMemo<NucTilesInterface['entities']>(
    () => [
      {
        href: `/${lang}/structural/questions`,
        header: t('admin-tile-questions'),
        count: questions?.length || 0,
        icon: 'prime:question',
        countSecondary: questionsCreatedLastWeek,
        textSecondary: t('admin-tile-this-week'),
        adType: 'question',
      },
      {
        href: `/${lang}/structural/technologies`,
        header: t('admin-tile-technologies'),
        count: technologies?.length || 0,
        icon: 'prime:microchip-ai',
        countSecondary: technologiesCreatedLastWeek,
        textSecondary: t('admin-tile-this-week'),
        adType: 'technology',
      },
    ],
    [
      lang,
      questions,
      questionsCreatedLastWeek,
      t,
      technologies,
      technologiesCreatedLastWeek,
    ]
  )

  return (
    <div className="panel-container">
      <NucTiles entities={entities} />

      <NucEntityChartCard
        entity="Structural"
        className="annual-chart-card"
        chartMethodType="annual"
        type="bar"
        direction={isMobile() ? 'horizontal' : 'vertical'}
        data={{
          question: questions,
          technology: technologies,
        }}
        loading={!allLoaded}
      />

      <NucQuestionDashboard
        data={questions as ObjectType[] | undefined}
        getData={getAllQuestions}
        loading={!allLoaded}
      />
      <NucTechnologyDashboard
        data={technologies as ObjectType[] | undefined}
        getData={getAllTechnologies}
        loading={!allLoaded}
      />
    </div>
  )
}
