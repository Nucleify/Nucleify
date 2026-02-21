<template>
  <div id="front-office">
    <nuc-section-navbar v-if="!route.path.includes('/home')" />
    <main>
      <slot />
    </main>
    <nuc-section-footer v-if="!route.path.includes('/home')" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

definePageMeta({
  layout: 'front-office',
})
</script>
