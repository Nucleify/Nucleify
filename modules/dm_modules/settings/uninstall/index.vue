<template>
  <ad-button
    ad-type="main"
    text
    rounded
    icon="prime:trash"
    class="uninstall-module-button"
    :loading="loading"
    :disabled="loading"
    @click="submitUninstall"
  />
</template>

<script setup lang="ts">
import type { UseToastInterface } from 'atomic'
import { apiHandle, useToast } from 'atomic'

import type { DmModulesUninstallModuleInterface } from '.'

const props = defineProps<DmModulesUninstallModuleInterface>()

const emit = defineEmits<{
  moduleUninstalled: []
}>()

const loading = ref(false)

const { flashToast }: UseToastInterface = useToast()

async function submitUninstall(): Promise<void> {
  if (!props.name) {
    flashToast('Module name is required', 'error')
    return
  }

  await apiHandle({
    url: apiUrl() + '/modules/uninstall',
    method: 'POST',
    data: { name: props.name },
    setLoading: (state) => {
      loading.value = state
    },
    onSuccess: () => {
      flashToast(`Module "${props.name}" uninstalled successfully`, 'success')
      emit('moduleUninstalled')
    },
  })
}
</script>
