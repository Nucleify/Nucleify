'use client'

import type { JSX } from 'react'

import { AdIcon, t } from 'nucleify'
import './_index.scss'

export function NucDevStack(): JSX.Element {
  const stackCategories = [
    {
      title: t('dev-stack-frontend'),
      items: [
        { icon: 'mdi:nuxt', name: 'Nuxt 3', desc: t('dev-stack-nuxt') },
        { icon: 'mdi:vuejs', name: 'Vue 3', desc: t('dev-stack-vue') },
        {
          icon: 'mdi:language-typescript',
          name: 'TypeScript',
          desc: t('dev-stack-ts'),
        },
        { icon: 'mdi:sass', name: 'SCSS Modules', desc: t('dev-stack-scss') },
      ],
    },
    {
      title: t('dev-stack-backend'),
      items: [
        {
          icon: 'mdi:laravel',
          name: 'Laravel 12',
          desc: t('dev-stack-laravel'),
        },
        { icon: 'mdi:language-php', name: 'PHP 8.4', desc: t('dev-stack-php') },
        { icon: 'mdi:database', name: 'MySQL', desc: t('dev-stack-mysql') },
        { icon: 'mdi:api', name: 'REST API', desc: t('dev-stack-api') },
      ],
    },
    {
      title: t('dev-stack-tooling'),
      items: [
        { icon: 'mdi:docker', name: 'Docker', desc: t('dev-stack-docker') },
        { icon: 'mdi:github', name: 'GitHub CI/CD', desc: t('dev-stack-ci') },
        {
          icon: 'mdi:test-tube',
          name: 'Pest + Vitest',
          desc: t('dev-stack-tests'),
        },
        {
          icon: 'mdi:format-paint',
          name: 'Biome + Stylelint',
          desc: t('dev-stack-lint'),
        },
      ],
    },
  ]

  return (
    <section id="dev-stack" className="dev-stack">
      <div className="container">
        <h2 className="dev-section-heading">
          {t('dev-stack-heading')}
          <span className="highlight"> {t('dev-stack-highlight')}</span>
        </h2>

        <div className="dev-stack-grid">
          {stackCategories.map((category) => (
            <div key={category.title} className="dev-stack-category">
              <h3>{category.title}</h3>
              <div className="dev-stack-items">
                {category.items.map((tech, index) => (
                  <div
                    className="dev-stack-item"
                    key={`${category.title}-${tech.name}`}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="dev-stack-item-icon">
                      <AdIcon icon={tech.icon} />
                    </div>
                    <div className="dev-stack-item-info">
                      <span>{tech.name}</span>
                      <small>{tech.desc}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
