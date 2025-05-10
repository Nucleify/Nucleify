<template>
  <div class="container">
    <template-card-boxes :boxes="resultsBySite" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { technologyRequests } from 'atomic'

const { getSiteTechnologies, resultsBySite } = technologyRequests()

onMounted(() => {
  getSiteTechnologies('general', true)
})
</script>
