<template>
  <div class="modules-settings-card-list">
    <nuc-modules-list-item 
      v-for="module in props.data"
      v-bind="module"
      :key="module.id"
      @module-uninstalled="$emit('moduleUninstalled')"
    />
  </div>
</template>

<script setup lang="ts">
import type { NucModulesListInterface } from '.'
import { NucModulesListItem } from '.'

const props = defineProps<NucModulesListInterface>()

const emit = defineEmits<{
  moduleUninstalled: []
}>()
</script>