<template>
  <div class="modules-settings-card-list">
    <dm-modules-list-item 
      v-for="module in props.data"
      v-bind="module"
      :key="module.id"
      @module-uninstalled="$emit('moduleUninstalled')"
    />
  </div>
</template>

<script setup lang="ts">
import type { DmModulesListInterface } from '.'
import { DmModulesListItem } from '.'

const props = defineProps<DmModulesListInterface>()

const emit = defineEmits<{
  moduleUninstalled: []
}>()
</script>