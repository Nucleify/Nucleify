<template>
  <section class="admin-panel" :class="{ 'admin-panel--flush': flush }">
    <header v-if="title || $slots.actions" class="admin-panel__head">
      <h2 v-if="title" class="admin-panel__title">{{ title }}</h2>
      <div v-if="$slots.actions" class="admin-actions">
        <slot name="actions" />
      </div>
    </header>
    <slot />
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    flush?: boolean
  }>(),
  {
    title: '',
    flush: false,
  }
)
</script>
