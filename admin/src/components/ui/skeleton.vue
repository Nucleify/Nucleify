<template>
  <div class="admin-skeleton" :style="{ height }" aria-hidden="true" />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    height?: string
  }>(),
  {
    height: '1.25rem',
  }
)
</script>

<style lang="scss">
@keyframes admin-skeleton {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

.admin-skeleton {
  display: block;
  width: 100%;
  border-radius: var(--admin-radius);
  background: linear-gradient(
    90deg,
    var(--admin-surface-2) 0%,
    var(--admin-surface) 50%,
    var(--admin-surface-2) 100%
  );
  background-size: 200% 100%;
  animation: admin-skeleton 1.2s ease-in-out infinite;
}
</style>
