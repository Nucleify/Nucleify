<template>
  <div
    class="admin-progress-spinner"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="label"
  >
    <span class="admin-progress-spinner__ring" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'Loading',
  }
)
</script>

<style lang="scss">
@keyframes admin-progress-spinner {
  to {
    transform: rotate(360deg);
  }
}

.admin-progress-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
}

.admin-progress-spinner__ring {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 2px solid color-mix(in srgb, var(--admin-muted) 28%, transparent);
  border-top-color: var(--admin-text, #e8e8e8);
  border-radius: 50%;
  animation: admin-progress-spinner 0.7s linear infinite;
}
</style>
