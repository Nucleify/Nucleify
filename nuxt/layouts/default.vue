<template>
  <div id="default-layout">
    <dm-screen-lights :count="8" />
    <section-navbar v-if="isFrontOffice" />
    <dm-screen-loader v-if="isFrontOffice" />
    <slot />
    <section-footer v-if="isFrontOffice" />
    <organism-dock v-if="isBackOffice" />
  </div>
</template>

<script setup lang="ts">
import { isAnyCurrentUrl, useColors } from 'atomic'
import { onMounted } from 'vue'

onMounted(() => {
  const { setDefaultColors } = useColors()

  setDefaultColors(false)
})
const isFrontOffice = isAnyCurrentUrl(['home', 'about', 'blog', 'license', 'services'])
const isBackOffice = isAnyCurrentUrl(['activity-log', 'admin', 'dashboard', 'entities', 'settings', 'structural'])
</script>
