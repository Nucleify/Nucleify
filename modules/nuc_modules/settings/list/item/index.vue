<template>
  <div 
  class="modules-settings-card-list-item"
  :class="{ 'active': props.enabled }" 
  @click="navigateToUrl('/settings#module-' + props.name)"
  >
    <nuc-cube
      :shiny="props.enabled"
      v-tooltip.right="props.enabled ? 'Enabled' : 'Disabled'" 
    />
    <div class="modules-settings-card-list-item-container">
      <div class="modules-settings-card-list-item-info">
        <label>{{ props.name }}</label>
        <p>{{ props.description }}</p>
      </div>
      <nuc-modules-settings-uninstall-module 
        :name="props.name"
        @module-uninstalled="$emit('moduleUninstalled')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModuleObjectInterface } from 'atomic'
import { navigateToUrl } from 'atomic'

import { NucModulesSettingsUninstallModule } from '../..'

const props = defineProps<ModuleObjectInterface>()
</script>