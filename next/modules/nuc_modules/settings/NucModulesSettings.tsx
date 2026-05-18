'use client'

import { useCallback, useEffect, useState } from 'react'

import { AdCard, apiRequest } from 'nucleify'

import type { ModuleObjectInterface } from '../types/interfaces'
import { nucModulesApiUrl } from '../utils/api_url'
import NucModulesSettingsInstallModule from './install/NucModulesSettingsInstallModule'
import NucModulesList from './list/NucModulesList'

import './_index.scss'

function extractModules(
  response: unknown
): ModuleObjectInterface[] | undefined {
  if (typeof response !== 'object' || response === null) return undefined

  if (
    'modules' in response &&
    Array.isArray((response as { modules: unknown }).modules)
  ) {
    return (response as { modules: ModuleObjectInterface[] }).modules
  }

  if (
    'data' in response &&
    typeof (response as { data: unknown }).data === 'object' &&
    (response as { data: unknown }).data !== null
  ) {
    const data = (response as { data: { modules?: ModuleObjectInterface[] } })
      .data
    if (Array.isArray(data.modules)) return data.modules
  }

  return undefined
}

export function NucModulesSettings() {
  const [modules, setModules] = useState<ModuleObjectInterface[]>([])

  const loadModules = useCallback(async () => {
    try {
      const response = await apiRequest<{ modules: ModuleObjectInterface[] }>(
        nucModulesApiUrl('/modules/all')
      )
      const list = extractModules(response)
      if (list) setModules(list)
    } catch (error) {
      console.error('Failed to load modules', error)
      setModules([])
    }
  }, [])

  useEffect(() => {
    void loadModules()
  }, [loadModules])

  const refreshModules = useCallback(async () => {
    await loadModules()
  }, [loadModules])

  return (
    <AdCard
      className="modules-settings-card"
      header={
        <NucModulesSettingsInstallModule onModuleInstalled={refreshModules} />
      }
    >
      <NucModulesList
        data={modules}
        onModuleToggled={refreshModules}
        onModuleUninstalled={refreshModules}
      />
    </AdCard>
  )
}
