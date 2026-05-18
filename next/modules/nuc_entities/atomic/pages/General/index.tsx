'use client'

import { usePathname } from 'next/navigation'
import type { JSX } from 'react'
import { useEffect, useMemo, useState } from 'react'

import type { TileInterface } from 'nucleify'
import {
  AdTile,
  articleRequests,
  contactRequests,
  isMobile,
  moneyRequests,
  NucArticleDashboard,
  NucContactDashboard,
  NucEntityChartCard,
  NucMoneyDashboard,
  t,
} from 'nucleify'

export function NucEntitiesPage(): JSX.Element {
  const pathname = usePathname()
  const lang = pathname.split('/').filter(Boolean).at(0) || 'en'
  const {
    results: articles,
    createdLastWeek: articlesCreatedLastWeek,
    loading: articlesLoading,
    getAllArticles,
    getCountArticlesByCreatedLastWeek,
  } = articleRequests()
  const {
    results: contacts,
    createdLastWeek: contactsCreatedLastWeek,
    loading: contactsLoading,
    getAllContacts,
    getCountContactsByCreatedLastWeek,
  } = contactRequests()
  const {
    results: money,
    createdLastWeek: moneyCreatedLastWeek,
    loading: moneyLoading,
    getAllMoney,
    getCountMoneyByCreatedLastWeek,
  } = moneyRequests()
  const [allLoaded, setAllLoaded] = useState<boolean>(false)

  useEffect(() => {
    void getAllArticles(true)
    void getAllContacts(true)
    void getAllMoney(true)
    void getCountArticlesByCreatedLastWeek()
    void getCountContactsByCreatedLastWeek()
    void getCountMoneyByCreatedLastWeek()
  }, [])

  useEffect(() => {
    if (!articlesLoading && !contactsLoading && !moneyLoading) {
      const timeout = setTimeout(() => {
        setAllLoaded(true)
      }, 200)
      return () => clearTimeout(timeout)
    }
    setAllLoaded(false)
    return
  }, [articlesLoading, contactsLoading, moneyLoading])

  const entities = useMemo<TileInterface[]>(
    () => [
      {
        href: `/${lang}/entities/articles`,
        header: t('admin-tile-articles'),
        count: articles?.length || 0,
        icon: 'prime:comment',
        countSecondary: articlesCreatedLastWeek || 0,
        textSecondary: t('admin-tile-this-week'),
      },
      {
        href: `/${lang}/entities/contacts`,
        header: t('admin-tile-contacts'),
        count: contacts?.length || 0,
        icon: 'prime:user',
        countSecondary: contactsCreatedLastWeek || 0,
        textSecondary: t('admin-tile-this-week'),
      },
      {
        href: `/${lang}/entities/money`,
        header: t('admin-tile-money'),
        count: money?.length || 0,
        icon: 'prime:dollar',
        countSecondary: moneyCreatedLastWeek || 0,
        textSecondary: t('admin-tile-this-week'),
      },
    ],
    [
      articles,
      contacts,
      money,
      articlesCreatedLastWeek,
      contactsCreatedLastWeek,
      moneyCreatedLastWeek,
      lang,
    ]
  )

  return (
    <div className="panel-container">
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.7em',
          marginBottom: '1em',
        }}
      >
        {entities.map((entity) => (
          <AdTile key={entity.href} {...entity} />
        ))}
      </div>
      <NucEntityChartCard
        entity="Entities"
        chartClass="annual-chart-card"
        chartMethodType="annual"
        type="bar"
        direction={isMobile() ? 'horizontal' : 'vertical'}
        data={{
          article: articles,
          contact: contacts,
          money: money,
        }}
        loading={!allLoaded}
      />
      <NucArticleDashboard
        data={articles ?? []}
        getData={getAllArticles}
        loading={!allLoaded}
      />
      <NucContactDashboard
        data={contacts ?? []}
        getData={getAllContacts}
        loading={!allLoaded}
      />
      <NucMoneyDashboard
        data={money ?? []}
        getData={getAllMoney}
        loading={!allLoaded}
      />
    </div>
  )
}
