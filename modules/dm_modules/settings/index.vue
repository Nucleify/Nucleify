<template>
  <ad-card class="modules-settings-card">
    <template #header>
      <dm-modules-settings-install-module @module-installed="loadModules" />
    </template>
    <template #content>
      <dm-modules-list :data="modules" @module-uninstalled="loadModules" />
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import type { ModuleObjectInterface } from 'atomic'
import { apiRequest } from 'atomic'

import {
  DmModulesList,
  DmModulesSettingsInstallModule,
  DmModulesSettingsUninstallModule,
} from '.'

const modules = ref<ModuleObjectInterface[]>([])

async function loadModules(): Promise<void> {
  const response = await apiRequest<{ modules: ModuleObjectInterface[] }>(
    apiUrl() + '/modules/installed'
  )

  if (response.modules) {
    modules.value = response.modules
  }
}

onMounted(async () => {
  await loadModules()
})
</script>
