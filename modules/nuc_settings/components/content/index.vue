<template>
  <div class="grided-content" v-if="gridedContent">
    <nuc-settings-preferences-theme v-if="route.hash === '#preferences-theme'" />
    <nuc-color-settings-card v-if="route.hash === '#module-nuc_colors'"/>
    <nuc-chart-settings-card v-if="route.hash === '#module-nuc_charts'"/>
  </div> 
  <nuc-settings-staff-modules v-if="route.hash === '#modules'"/>
  <nuc-settings-no-content v-if="route.hash.includes('#module-') && !gridedContent" />
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'

import {
  NucSettingsNoContent,
  NucSettingsPreferencesTheme,
  NucSettingsStaffModules,
} from '.'

const route = useRoute()

const gridedHashes = [
  '#module-nuc_charts',
  '#module-nuc_colors',
  '#preferences-theme',
]

const gridedContent = computed(() => {
  return gridedHashes.includes(route.hash)
})
</script>