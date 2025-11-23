<template>
  <div class="panel-container">
    <dm-entity-chart-card
      entity="Contact"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ contact: results }"
      :loading="loading"
    />
    <dm-contact-dashboard
      :data="results"
      :get-data="getAllContacts"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { contactRequests, useAtomicDialog } from 'atomic'

const { closeDialog } = useAtomicDialog()

const { loading, results, getAllContacts } = contactRequests(closeDialog)

onMounted(() => {
  getAllContacts(true)
})
</script>
