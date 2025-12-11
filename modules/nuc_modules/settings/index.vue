<template>
  <ad-card class="modules-settings-card">
    <template #header>
      <nuc-modules-settings-install-module @module-installed="refreshModules" />
    </template>
    <template #content>
      <nuc-modules-list :data="modules" @module-uninstalled="refreshModules" />
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import type { ModuleObjectInterface } from 'atomic'
import { apiRequest } from 'atomic'

import { NucModulesList, NucModulesSettingsInstallModule } from '.'

const modules = ref<ModuleObjectInterface[]>([])

async function loadModules(): Promise<void> {
  const response = await apiRequest<{ modules: ModuleObjectInterface[] }>(
    apiUrl() + '/modules/all'
  )

  if (response.modules) {
    modules.value = response.modules
  }
}

async function refreshModules(): Promise<void> {
  await loadModules()
}

onMounted(async () => {
  await loadModules()
})
</script>
