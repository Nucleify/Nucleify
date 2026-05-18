'use client'

import type { JSX } from 'react'

import { AdIcon, t } from 'nucleify'
import './_index.scss'

export function NucDevModules(): JSX.Element {
  const modules = [
    {
      icon: 'mdi:account-lock',
      name: 'nuc_auth',
      desc: t('dev-mod-auth'),
      version: '0.1.5',
    },
    {
      icon: 'mdi:database-outline',
      name: 'nuc_entities',
      desc: t('dev-mod-entities'),
      version: '0.3.3',
    },
    {
      icon: 'mdi:palette-outline',
      name: 'nuc_colors',
      desc: t('dev-mod-colors'),
      version: '0.9.5',
    },
    {
      icon: 'mdi:chart-bar',
      name: 'nuc_charts',
      desc: t('dev-mod-charts'),
      version: '0.2.0',
    },
    {
      icon: 'mdi:file-upload-outline',
      name: 'nuc_files',
      desc: t('dev-mod-files'),
      version: '0.0.2',
    },
    {
      icon: 'mdi:book-open-variant',
      name: 'nuc_documentation',
      desc: t('dev-mod-docs'),
      version: '0.9.1',
    },
    {
      icon: 'mdi:view-dashboard-edit-outline',
      name: 'nuc_pagebuilder',
      desc: t('dev-mod-pagebuilder'),
      version: '0.1.0',
    },
  ]

  return (
    <section id="dev-modules" className="dev-modules">
      <div className="container">
        <h2 className="dev-section-heading">
          {t('dev-modules-heading')}
          <span className="highlight"> {t('dev-modules-highlight')}</span>
        </h2>
        <p className="dev-section-desc">{t('dev-modules-desc')}</p>

        <div className="dev-modules-grid">
          {modules.map((mod, index) => (
            <div
              key={mod.name}
              className="dev-module-card"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="dev-module-card-header">
                <div className="dev-module-card-icon">
                  <AdIcon icon={mod.icon} />
                </div>
                <span className="dev-module-version">{mod.version}</span>
              </div>
              <div className="dev-module-card-content">
                <h3>{mod.name}</h3>
                <p>{mod.desc}</p>
              </div>
              <div className="dev-module-card-glow" />
            </div>
          ))}

          <a
            className="dev-module-card dev-module-card--more"
            href="https://github.com/Nucleify/Nucleify/tree/prod/modules"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="dev-module-card-header">
              <div className="dev-module-card-icon">
                <AdIcon icon="mdi:dots-horizontal" />
              </div>
            </div>
            <div className="dev-module-card-content">
              <h3>{t('dev-mod-more')}</h3>
              <p>{t('dev-mod-more-desc')}</p>
            </div>
            <div className="dev-module-card-arrow">
              <AdIcon icon="mdi:arrow-right" />
            </div>
            <div className="dev-module-card-glow" />
          </a>
        </div>
      </div>
    </section>
  )
}
