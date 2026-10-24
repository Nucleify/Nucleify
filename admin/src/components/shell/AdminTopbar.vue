<template>
  <header class="admin-topbar">
    <h1 class="admin-topbar__title">{{ title }}</h1>
    <div v-if="$slots.default" class="admin-actions">
      <slot />
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
