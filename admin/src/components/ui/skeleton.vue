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
