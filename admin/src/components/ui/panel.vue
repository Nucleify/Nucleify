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

<style lang="scss">
.admin-panel {
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: var(--admin-radius);
}
.admin-panel {
  display: flex;
  flex-direction: column;
  gap: var(--admin-space-4);
  padding: var(--admin-space-5);
}
.admin-panel--flush {
  padding: 0;
}
.admin-panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--admin-space-3);
  margin-bottom: 0;
}
.admin-panel__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}
</style>
