<template>
  <div id="default-layout">
    <section-navbar v-if="isFrontOffice" />
    <dm-screen-lights :count="8" />
    <dm-screen-loader v-if="isFrontOffice" />
    <slot />
    <section-footer v-if="isFrontOffice" />
  </div>
</template>

<script setup lang="ts">
import { isAnyCurrentUrl } from 'atomic'

const isFrontOffice = isAnyCurrentUrl([
  '/',
  '/about',
  '/blog',
  '/register',
  '/services',
])
</script>
