'use client'

import { useRouter } from 'next/navigation'
import { type ReactNode, useCallback, useEffect, useState } from 'react'

import { AdBadge, AdButton, AdCard, apiRequest, useAtomicToast } from 'nucleify'

import { NucCube } from '../../../nuc_templates/components/cube'
import type { ModuleObjectInterface } from '../../types/interfaces'
import { nucModulesApiUrl } from '../../utils/api_url'
import { toggleModule } from '../toggle/toggle_module'
import { uninstallModule } from '../uninstall/uninstall_module'
import { NucModulesSettingsDetailReadmeDialog } from './dialog'
import { ModuleItemOptionsDialog } from './ModuleItemOptionsDialog'

import './_index.scss'

function useModuleSlugFromHash(): string | null {
  const [slug, setSlug] = useState<string | null>(null)

  useEffect(() => {
    function read(): void {
      const h = window.location.hash.replace('#module-', '')
      setSlug(h || null)
    }
    read()
    window.addEventListener('hashchange', read)
    return () => window.removeEventListener('hashchange', read)
  }, [])

  return slug
}

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString()
  } catch {
    return dateString
  }
}

export default function NucModulesSettingsDetail({
  children,
}: {
  children?: ReactNode
}) {
  const router = useRouter()
  const moduleSlug = useModuleSlugFromHash()
  const { flashToast } = useAtomicToast()

  const [moduleData, setModuleData] = useState<ModuleObjectInterface | null>(
    null
  )
  const [readmeDialogVisible, setReadmeDialogVisible] = useState(false)
  const [toggleDialogVisible, setToggleDialogVisible] = useState(false)
  const [uninstallDialogVisible, setUninstallDialogVisible] = useState(false)

  const loadModule = useCallback(async () => {
    if (!moduleSlug) {
      setModuleData(null)
      return
    }

    try {
      const response = await apiRequest<ModuleObjectInterface>(
        nucModulesApiUrl(`/modules/${moduleSlug}`)
      )
      const data =
        typeof response === 'object' && response !== null && 'data' in response
          ? (response as { data: ModuleObjectInterface }).data
          : (response as ModuleObjectInterface)
      setModuleData(data)
    } catch (error) {
      console.error('Failed to load module:', error)
      setModuleData(null)
    }
  }, [moduleSlug])

  useEffect(() => {
    void loadModule()
  }, [loadModule])

  const module = moduleData

  async function handleToggleConfirm(): Promise<void> {
    if (!module) return

    const currentEnabled = module.enabled
    const nextEnabled = !currentEnabled
    setModuleData({ ...module, enabled: nextEnabled })

    if (!module.name) {
      flashToast('Module name is required', 'error')
      setModuleData(module)
      return
    }

    await toggleModule(module.name, currentEnabled, flashToast, () => {
      void loadModule()
    })
  }

  async function handleUninstallConfirm(): Promise<void> {
    if (!module?.name) {
      flashToast('Module name is required', 'error')
      return
    }

    await uninstallModule(module.name, flashToast, () => {
      void router.push('/settings#modules')
    })
  }

  const header = (
    <div className="modules-settings-detail-header">
      <div className="modules-settings-detail-header-info">
        <span
          title={module?.enabled ? 'Enabled' : 'Disabled'}
          style={{ display: 'inline-flex' }}
        >
          <NucCube shiny={module?.enabled} />
        </span>
        <div>
          <h2>{module?.name || 'Loading...'}</h2>
          {module?.description ? <p>{module.description}</p> : null}
        </div>
      </div>
      <div className="modules-settings-detail-header-actions">
        {module ? (
          <AdButton
            label="Documentation"
            icon="prime:file"
            severity="secondary"
            type="button"
            onClick={() => setReadmeDialogVisible(true)}
          />
        ) : null}
        <AdButton
          label={module?.enabled ? 'Disable' : 'Enable'}
          icon={module?.enabled ? 'prime:times-circle' : 'prime:check-circle'}
          severity="secondary"
          type="button"
          onClick={() => setToggleDialogVisible(true)}
        />
        <AdButton
          label="Uninstall"
          icon="prime:trash"
          severity="danger"
          type="button"
          onClick={() => setUninstallDialogVisible(true)}
        />
      </div>
    </div>
  )

  const body = (
    <>
      {module ? (
        <div className="modules-settings-detail-content">
          <div className="modules-settings-detail-info">
            <div className="modules-settings-detail-info-item">
              <label>Version</label>
              <p>{module.version || 'N/A'}</p>
            </div>
            <div className="modules-settings-detail-info-item">
              <label>Category</label>
              <p>{module.category || 'N/A'}</p>
            </div>
            <div className="modules-settings-detail-info-item">
              <label>Status</label>
              <p>
                <AdBadge
                  value={module.enabled ? 'Enabled' : 'Disabled'}
                  severity={module.enabled ? 'success' : 'secondary'}
                />
              </p>
            </div>
            {module.installed !== undefined ? (
              <div className="modules-settings-detail-info-item">
                <label>Installed</label>
                <p>
                  <AdBadge
                    value={module.installed ? 'Yes' : 'No'}
                    severity={module.installed ? 'success' : 'secondary'}
                  />
                </p>
              </div>
            ) : null}
            {module.created_at ? (
              <div className="modules-settings-detail-info-item">
                <label>Created</label>
                <p>{formatDate(module.created_at)}</p>
              </div>
            ) : null}
            {module.updated_at ? (
              <div className="modules-settings-detail-info-item">
                <label>Updated</label>
                <p>{formatDate(module.updated_at)}</p>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="modules-settings-detail-error">
          <p>Module not found</p>
        </div>
      )}
      <div className="modules-settings-detail-settings">{children}</div>
    </>
  )

  return (
    <>
      <AdCard className="modules-settings-detail-card" header={header}>
        {body}
      </AdCard>

      <ModuleItemOptionsDialog
        visible={toggleDialogVisible}
        onHide={() => setToggleDialogVisible(false)}
        name={module?.name || ''}
        enabled={module?.enabled || false}
        action="toggle"
        onConfirm={handleToggleConfirm}
      />

      <ModuleItemOptionsDialog
        visible={uninstallDialogVisible}
        onHide={() => setUninstallDialogVisible(false)}
        name={module?.name || ''}
        enabled={module?.enabled || false}
        action="uninstall"
        onConfirm={handleUninstallConfirm}
      />

      <NucModulesSettingsDetailReadmeDialog
        visible={readmeDialogVisible}
        onHide={() => setReadmeDialogVisible(false)}
        modulePath={moduleSlug || undefined}
      />
    </>
  )
}
