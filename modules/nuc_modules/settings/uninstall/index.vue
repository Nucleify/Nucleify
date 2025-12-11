<template>
  <ad-button
    ad-type="main"
    text
    rounded
    icon="prime:trash"
    class="uninstall-module-button"
    @click="uninstallModule(props.name, () => emit('moduleUninstalled'))"
  />
</template>

<script setup lang="ts">
import type { NucModulesUninstallModuleInterface } from '.'
import { uninstallModule } from '.'

const props = defineProps<NucModulesUninstallModuleInterface>()

const emit = defineEmits<{
  moduleUninstalled: []
}>()
</script>
