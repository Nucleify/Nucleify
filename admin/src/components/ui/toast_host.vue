<template>
  <div class="admin-toast-host" aria-live="polite">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="admin-toast"
      :class="`admin-toast--${toast.tone}`"
      @click="dismiss(toast.id)"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminToast } from '../../composables/use_toast'

const { toasts, dismiss } = useAdminToast()
</script>

<style lang="scss">
.admin-toast-host {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 80;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: min(22rem, calc(100vw - 2rem));
  pointer-events: none;
}
.admin-toast {
  pointer-events: auto;
  padding: 0.75rem 1rem;
  border: 1px solid var(--admin-border);
  background: var(--admin-surface);
  color: var(--admin-text);
  font-size: 0.875rem;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}
.admin-toast--success {
  border-color: color-mix(in srgb, #22c55e 45%, var(--admin-border));
  color: #86efac;
}
.admin-toast--error {
  border-color: color-mix(in srgb, #ef4444 45%, var(--admin-border));
  color: #fca5a5;
}
.admin-toast--info {
  color: var(--admin-text);
}
</style>
