<template>
  <div id="default-layout">
    <dm-screen-lights :count="8" />
    <section-navbar v-if="isFrontOffice" />
    <dm-screen-loader v-if="isFrontOffice" />
    <slot />
    <section-footer v-if="isFrontOffice" />
  </div>
</template>

<script setup lang="ts">
import { isAnyCurrentUrl } from 'atomic'

let isFrontOffice = isAnyCurrentUrl(['/home', '/about', '/blog', '/services'])
</script>
