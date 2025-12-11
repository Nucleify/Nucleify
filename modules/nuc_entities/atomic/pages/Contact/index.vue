<template>
  <div class="panel-container">
    <nuc-entity-chart-card
      entity="Contact"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ contact: results }"
      :loading="loading"
    />
    <nuc-contact-dashboard
      :data="results"
      :get-data="getAllContacts"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { contactRequests, useNucDialog } from 'atomic'

const { closeDialog } = useNucDialog()

const { loading, results, getAllContacts } = contactRequests(closeDialog)

onMounted(() => {
  getAllContacts(true)
})
</script>
