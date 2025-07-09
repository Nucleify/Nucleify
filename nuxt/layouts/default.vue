<template>
  <div id="default-layout">
    <dm-screen-lights :count="8" />
    <front-office v-if="officeType === 'front'">
      <slot />
    </front-office>
    <back-office v-if="officeType === 'back'">
      <slot />
    </back-office>
    <div v-if="officeType === null" id="default-layout-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isAnyCurrentUrl, useColors } from 'atomic'

import FrontOffice from './front-office.vue'
import BackOffice from './back-office.vue'

const route = useRoute()

onMounted(() => {
  const { setDefaultColors } = useColors()

  setDefaultColors(true)
})

const { locale } = useI18n()

const FRONT_EN = ['home', 'about', 'blog-en', 'license', 'services']
const FRONT_PL = ['strona-glowna', 'o-nas', 'blog-pl', 'license', 'uslugi']

const BACK = [
  'activity-log',
  'admin',
  'dashboard',
  'entities',
  'settings',
  'structural',
]

const officeRoutes = computed(() => ({
  front: locale.value === 'pl' ? FRONT_PL : FRONT_EN,
  back: BACK,
}))

const officeType = computed(() => {
  const path = route.path
  return officeRoutes.value.front.some((s) => path.includes(s))
    ? 'front'
    : officeRoutes.value.back.some((s) => path.includes(s))
      ? 'back'
      : null
})
</script>
