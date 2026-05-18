'use client'

import { usePathname } from 'next/navigation'
import type { JSX } from 'react'
import { useEffect, useMemo, useState } from 'react'

import * as nucleify from 'nucleify'

import type { NucEntityChartDataInterface } from '../../../nuc_charts/atomic/template/entity-chart/types/interfaces'
import { NucEntityChartCard } from '../../../nuc_charts/atomic/template/entity-chart-card'
import { NucTiles } from '../../../nuc_templates/components/tiles'

type DataItem = Record<string, unknown>
const EMPTY_DATA: DataItem[] = []

type RequestResult = {
  results?: DataItem[] | { value?: DataItem[] }
  createdLastWeek?: number | { value?: number }
  loading?: boolean | { value?: boolean }
  getAllArticles?: (force?: boolean) => void
  getCountArticlesByCreatedLastWeek?: () => void
  getAllContacts?: (force?: boolean) => void
  getCountContactsByCreatedLastWeek?: () => void
  getAllMoney?: (force?: boolean) => void
  getCountMoneyByCreatedLastWeek?: () => void
  getAllUsers?: (force?: boolean) => void
  getCountUsersByCreatedLastWeek?: () => void
}

function getValue<T>(value: T | { value?: T } | undefined, fallback: T): T {
  if (value !== null && typeof value === 'object' && 'value' in value) {
    return (value.value as T) ?? fallback
  }
  return (value as T) ?? fallback
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function updateMobileState(): void {
      setIsMobile(window.innerWidth < 992)
    }

    updateMobileState()
    window.addEventListener('resize', updateMobileState)

    return () => {
      window.removeEventListener('resize', updateMobileState)
    }
  }, [])

  return isMobile
}

export function NucAdminPage(): JSX.Element {
  const lib = nucleify as Record<string, unknown>
  const articleRequests = lib.articleRequests as
    | (() => RequestResult)
    | undefined
  const contactRequests = lib.contactRequests as
    | (() => RequestResult)
    | undefined
  const moneyRequests = lib.moneyRequests as (() => RequestResult) | undefined
  const userRequests = lib.userRequests as (() => RequestResult) | undefined
  const NucArticleDashboard = lib.NucArticleDashboard as
    | ((props: Record<string, unknown>) => JSX.Element)
    | undefined
  const NucContactDashboard = lib.NucContactDashboard as
    | ((props: Record<string, unknown>) => JSX.Element)
    | undefined
  const NucMoneyDashboard = lib.NucMoneyDashboard as
    | ((props: Record<string, unknown>) => JSX.Element)
    | undefined
  const NucUserDashboard = lib.NucUserDashboard as
    | ((props: Record<string, unknown>) => JSX.Element)
    | undefined
  const t = (lib.t as ((key: string) => string) | undefined) ?? ((key) => key)

  const articleData = articleRequests?.() ?? {}
  const contactData = contactRequests?.() ?? {}
  const moneyData = moneyRequests?.() ?? {}
  const userData = userRequests?.() ?? {}

  const articles = getValue(articleData.results, EMPTY_DATA)
  const contacts = getValue(contactData.results, EMPTY_DATA)
  const money = getValue(moneyData.results, EMPTY_DATA)
  const users = getValue(userData.results, EMPTY_DATA)

  const articlesCreatedLastWeek = getValue(articleData.createdLastWeek, 0)
  const contactsCreatedLastWeek = getValue(contactData.createdLastWeek, 0)
  const moneyCreatedLastWeek = getValue(moneyData.createdLastWeek, 0)
  const usersCreatedLastWeek = getValue(userData.createdLastWeek, 0)

  const articlesLoading = getValue(articleData.loading, false)
  const contactsLoading = getValue(contactData.loading, false)
  const moneyLoading = getValue(moneyData.loading, false)
  const usersLoading = getValue(userData.loading, false)

  const [allLoaded, setAllLoaded] = useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()

  useEffect(() => {
    articleData.getAllArticles?.(true)
    contactData.getAllContacts?.(true)
    moneyData.getAllMoney?.(true)
    userData.getAllUsers?.(true)
    articleData.getCountArticlesByCreatedLastWeek?.()
    contactData.getCountContactsByCreatedLastWeek?.()
    moneyData.getCountMoneyByCreatedLastWeek?.()
    userData.getCountUsersByCreatedLastWeek?.()
  }, [])

  useEffect(() => {
    if (
      !articlesLoading &&
      !contactsLoading &&
      !moneyLoading &&
      !usersLoading
    ) {
      const timeout = window.setTimeout(() => {
        setAllLoaded(true)
      }, 200)
      return () => window.clearTimeout(timeout)
    }

    setAllLoaded(false)
    return undefined
  }, [articlesLoading, contactsLoading, moneyLoading, usersLoading])

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    return segments[0] || 'en'
  }, [pathname])

  const entities = useMemo(
    () => [
      {
        href: `/${lang}/admin#articles`,
        header: t('admin-tile-articles'),
        count: articles.length || 0,
        icon: 'prime:comment',
        countSecondary: articlesCreatedLastWeek,
        textSecondary: t('admin-tile-this-week'),
      },
      {
        href: `/${lang}/admin#contacts`,
        header: t('admin-tile-contacts'),
        count: contacts.length || 0,
        icon: 'prime:user',
        countSecondary: contactsCreatedLastWeek,
        textSecondary: t('admin-tile-this-week'),
      },
      {
        href: `/${lang}/admin#money`,
        header: t('admin-tile-money'),
        count: money.length || 0,
        icon: 'prime:dollar',
        countSecondary: moneyCreatedLastWeek,
        textSecondary: t('admin-tile-this-week'),
      },
      {
        href: `/${lang}/admin#users`,
        header: t('admin-tile-users'),
        count: users.length || 0,
        icon: 'prime:user',
        countSecondary: usersCreatedLastWeek,
        textSecondary: t('admin-tile-this-week'),
      },
    ],
    [
      lang,
      t,
      articles.length,
      contacts.length,
      money.length,
      users.length,
      articlesCreatedLastWeek,
      contactsCreatedLastWeek,
      moneyCreatedLastWeek,
      usersCreatedLastWeek,
    ]
  )

  const chartData = useMemo<NucEntityChartDataInterface>(
    () =>
      ({
        article: articles,
        contact: contacts,
        money,
        user: users,
      }) as unknown as NucEntityChartDataInterface,
    [articles, contacts, money, users]
  )

  return (
    <div className="panel-container">
      <NucTiles entities={entities} />

      <NucEntityChartCard
        entity="Admin"
        chartClass="annual-chart-card"
        chartMethodType="annual"
        type="bar"
        direction={isMobile ? 'horizontal' : 'vertical'}
        data={chartData}
        loading={!allLoaded}
      />

      {NucArticleDashboard && (
        <NucArticleDashboard
          data={articles}
          getData={articleData.getAllArticles}
          loading={!allLoaded}
        />
      )}
      {NucContactDashboard && (
        <NucContactDashboard
          data={contacts}
          getData={contactData.getAllContacts}
          loading={!allLoaded}
        />
      )}
      {NucMoneyDashboard && (
        <NucMoneyDashboard
          data={money}
          getData={moneyData.getAllMoney}
          loading={!allLoaded}
        />
      )}
      {NucUserDashboard && (
        <NucUserDashboard
          data={users}
          getData={userData.getAllUsers}
          loading={!allLoaded}
        />
      )}
    </div>
  )
}
