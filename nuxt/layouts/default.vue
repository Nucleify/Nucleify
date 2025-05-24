<template>
  <div id="default-layout">
    <dm-screen-lights :count="8" />
    <ad-section-navbar v-if="isFrontOffice" />
    <dm-screen-loader v-if="isFrontOffice" />
    <slot />
    <ad-section-footer v-if="isFrontOffice" />
    <ad-dock v-if="isBackOffice" />
  </div>
</template>

<script setup lang="ts">
import { isAnyCurrentUrl, useColors } from 'atomic'
import { onMounted } from 'vue'

onMounted(() => {
  const { setDefaultColors } = useColors()

  setDefaultColors(true)
})
const isFrontOffice = isAnyCurrentUrl([
  'home',
  'about',
  'blog',
  'license',
  'services',
])
const isBackOffice = isAnyCurrentUrl([
  'activity-log',
  'admin',
  'dashboard',
  'entities',
  'settings',
  'structural',
])
</script>
