<template>
  <ad-card class="modules-settings-card">
    <template #content>
      <dm-modules-list :data="modules" />
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import type { ModuleObjectInterface } from 'atomic'
import { apiRequest, navigateTo } from 'atomic'

import { DmModulesList } from '.'

const modules = ref<ModuleObjectInterface[]>([])

onMounted(async () => {
  const response = await apiRequest(apiUrl() + '/modules/installed')

  if (response.modules) {
    modules.value = response.modules
  }
})
</script>