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
