<template>
  <div 
    class="modules-settings-card-list-item" 
    @click="navigateTo('/settings#module-' + props.name)"
  >
    <dm-modules-cube 
      :class="{ 'shiny': props.enabled }" 
      v-tooltip.right="props.enabled ? 'Enabled' : 'Disabled'" 
    />
    <div class="modules-settings-card-list-item-info">
      <label>{{ props.name }}</label>
      <p>{{ props.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModuleObjectInterface } from 'atomic'

const props = defineProps<ModuleObjectInterface>()
</script>