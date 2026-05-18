'use client'

import { usePathname } from 'next/navigation'
import { type JSX, useEffect, useState } from 'react'

import {
  AdAccordion,
  apiHandle,
  type NucFaqQuestionInterface,
  type NucSectionFaqInterface,
} from 'nucleify'

import { useSplitQuestions } from './utils/use_split_questions'

import './_index.scss'

export function NucSectionFaq({
  questions,
  site,
}: NucSectionFaqInterface): JSX.Element {
  const pathname = usePathname()
  const locale = pathname.split('/').filter(Boolean).at(0) || 'en'
  const [resultsBySite, setResultsBySite] = useState<NucFaqQuestionInterface[]>(
    []
  )
  const [column1, setColumn1] = useState<NucFaqQuestionInterface[]>([])
  const [column2, setColumn2] = useState<NucFaqQuestionInterface[]>([])

  useEffect(() => {
    if (!site || questions) return

    void apiHandle<NucFaqQuestionInterface[]>({
      url: process.env.NEXT_PUBLIC_API_URL + '/questions/get-site-questions',
      id: `${site}/${locale}`,
      onSuccess: (data) => setResultsBySite(Array.isArray(data) ? data : []),
    }).catch(() => setResultsBySite([]))
  }, [questions, site])

  useEffect(() => {
    const sourceQuestions = questions || resultsBySite
    if (!sourceQuestions) return

    const normalizedQuestions = Array.isArray(sourceQuestions)
      ? sourceQuestions
      : [sourceQuestions]
    const splitQuestions = useSplitQuestions(normalizedQuestions)

    setColumn1(splitQuestions.column1)
    setColumn2(splitQuestions.column2)
  }, [questions, resultsBySite])

  const renderColumn = (panels: NucFaqQuestionInterface[]): JSX.Element => (
    <AdAccordion panels={panels} className="p-accordion" />
  )

  return (
    <section id="faq" className="faq-section container">
      <p className="faq-section-header">
        <span>F</span>
        <span>A</span>
        <span>Q</span>
      </p>

      <div className="faq-section-questions">
        {column1.length > 0 && renderColumn(column1)}
        {column2.length > 0 && renderColumn(column2)}
      </div>
    </section>
  )
}
