<template>
  <div id="default-layout">
    <dm-screen-lights :count="8" />
    <front-office v-if="officeType === 'front'">
      <slot />
    </front-office>
    <back-office v-if="officeType === 'back'">
      <slot />
    </back-office>
  </div>
</template>

<script setup lang="ts">
import { isAnyCurrentUrl, useColors } from 'atomic'

import FrontOffice from './front-office.vue'
import BackOffice from './back-office.vue'

onMounted(() => {
  const { setDefaultColors } = useColors()

  setDefaultColors(true)
})

const officeRoutes = {
  front: ['home', 'about', 'blog', 'license', 'services'],
  back: [
    'activity-log',
    'admin',
    'dashboard',
    'entities',
    'settings',
    'structural',
  ],
}

const officeType = isAnyCurrentUrl(officeRoutes.front)
  ? 'front'
  : isAnyCurrentUrl(officeRoutes.back)
    ? 'back'
    : null
</script>
