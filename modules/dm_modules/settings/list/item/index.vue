<template>
  <div 
    class="modules-settings-card-list-item"
    @click="navigateTo(localePath('settings') + '#module-' + props.name)"
    :class="{ 'module-enabled': props.enabled }"
  >
    <dm-modules-cube 
      :class="{ 'shiny': props.enabled }" 
      v-tooltip.right="props.enabled ? 'Enabled' : 'Disabled'" 
    />
    <div class="modules-settings-card-list-item-container">
      <div class="modules-settings-card-list-item-info">
        <label>{{ props.name }}</label>
        <p>{{ props.description }}</p>
      </div>
      <dm-modules-settings-uninstall-module 
        :name="props.name"
        @module-uninstalled="$emit('moduleUninstalled')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModuleObjectInterface } from 'atomic'

import { DmModulesSettingsUninstallModule } from '../..'

const props = defineProps<ModuleObjectInterface>()

const localePath = useLocalePath()
</script>