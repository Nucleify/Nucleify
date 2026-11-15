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
