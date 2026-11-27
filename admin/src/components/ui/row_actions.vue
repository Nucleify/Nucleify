<template>
  <AdminOverflowMenu :actions="actions" label="⋯" compact />
</template>

<script setup lang="ts">
import type { AdminAction } from '../../types/admin_actions'

defineProps<{
  actions: AdminAction[]
}>()
</script>
