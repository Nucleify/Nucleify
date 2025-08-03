<template>
  <div id="default-layout">
    <dm-screen-loader />
    <client-only>
      <dm-screen-lights :count="8" />
    </client-only>
    <back-office v-if="officeType === 'back'">
      <slot />
    </back-office>
    <front-office v-if="officeType === 'front'">
      <slot />
    </front-office>
    <div v-if="officeType === null" id="default-layout-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isAnyCurrentUrl, resetColorsIfEmpty } from 'atomic'

import FrontOffice from './front-office.vue'
import BackOffice from './back-office.vue'

const officeRoutes = {
  front: ['home', 'about', 'blog', 'license', 'services'],
  back: [
    'activity-log',
    'admin',
    'dashboard',
    'entities',
    'files',
    'settings',
    'structural',
  ],
}

const officeType = isAnyCurrentUrl(officeRoutes.front)
  ? 'front'
  : isAnyCurrentUrl(officeRoutes.back)
    ? 'back'
    : null

onMounted(() => {
  resetColorsIfEmpty()
})
</script>
