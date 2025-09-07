<template>
  <ad-card class="modules-settings-card">
    <template #header>
      <dm-modules-settings-install-module @module-installed="refreshModules" />
    </template>
    <template #content>
      <dm-modules-list :data="modules" />
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import type { ModuleObjectInterface } from 'atomic'
import { apiRequest } from 'atomic'

import { DmModulesList, DmModulesSettingsInstallModule } from '.'

const modules = ref<ModuleObjectInterface[]>([])

async function loadModules(): Promise<void> {
  const response = await apiRequest(apiUrl() + '/modules/installed')

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