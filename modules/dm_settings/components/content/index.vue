<template>
  <template v-if="route.hash === '#theme'">
    <dm-settings-preferences-theme />
  </template>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'

import { DmSettingsPreferencesTheme } from '.'

const route = useRoute()
</script>