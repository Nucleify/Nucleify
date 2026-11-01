<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import { usePublicShellPage } from '@web'
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

await usePublicShellPage(slug)
</script>

<template>
  <div />
</template>
