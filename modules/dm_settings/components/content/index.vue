<template>
  <div class="grided-content" v-if="gridedContent">
    <dm-settings-preferences-theme v-if="route.hash === '#preferences-theme'" />
    <dm-color-settings-card v-if="route.hash === '#module-dm_colors'"/>
    <dm-chart-settings-card v-if="route.hash === '#module-dm_charts'"/>
  </div> 
  <dm-settings-staff-modules v-if="route.hash === '#modules'"/>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'

import { DmSettingsPreferencesTheme, DmSettingsStaffModules } from '.'

const route = useRoute()

const gridedHashes = [
  '#module-dm_charts',
  '#module-dm_colors',
  '#preferences-theme',
]

const gridedContent = computed(() => {
  return gridedHashes.includes(route.hash)
})
</script>