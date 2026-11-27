<template>
  <div class="admin-action-bar" :class="{ 'is-sticky': sticky }">
    <div v-if="meta || $slots.meta" class="admin-action-bar__meta">
      <slot name="meta">{{ meta }}</slot>
    </div>
    <div class="admin-action-bar__actions">
      <button
        v-for="action in secondary"
        :key="action.id"
        type="button"
        class="admin-control-btn"
        :disabled="action.disabled || disabled"
        @click="action.onClick"
      >
        {{ action.label }}
      </button>
      <button
        v-for="action in primary"
        :key="action.id"
        type="button"
        class="admin-control-btn admin-control-btn--filled"
        :disabled="action.disabled || disabled"
        @click="action.onClick"
      >
        {{ action.label }}
      </button>
      <AdminOverflowMenu
        v-if="more.length"
        :actions="more"
        :disabled="disabled"
        label="More actions"
        text="More"
        icon="more"
      />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '../../types/admin_actions'

withDefaults(
  defineProps<{
    primary?: AdminAction[]
    secondary?: AdminAction[]
    more?: AdminAction[]
    meta?: string
    sticky?: boolean
    disabled?: boolean
  }>(),
  {
    primary: () => [],
    secondary: () => [],
    more: () => [],
    meta: '',
    sticky: false,
    disabled: false,
  }
)
</script>

<style lang="scss">
/* —— Action bar / overflow —— */
.admin-action-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: var(--admin-space-2);
}
.admin-action-bar__meta {
  margin-right: auto;
  font-family: var(--admin-mono);
  font-size: 0.75rem;
  color: var(--admin-muted);
}
.admin-action-bar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}
.admin-action-bar.is-sticky {
  position: sticky;
  top: 0;
  z-index: 15;
  min-height: var(--admin-sticky-h);
  padding: var(--admin-space-2) 0;
  margin: 0 0 var(--admin-space-4);
  background: color-mix(in srgb, var(--admin-bg) 92%, transparent);
  border-bottom: 1px solid var(--admin-border);
  backdrop-filter: blur(8px);
}
</style>
