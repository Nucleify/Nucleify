<template>
  <template v-if="route.hash === '#theme'">
    <div class="grided-content">
      <dm-settings-preferences-theme />
    </div>
  </template>
  <template v-if="route.hash === '#modules'">
    <dm-settings-staff-modules />
  </template>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'

import { DmSettingsPreferencesTheme, DmSettingsStaffModules } from '.'

const route = useRoute()
</script>