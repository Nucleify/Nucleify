<template>
  <div class="panel-container">
    <ad-card-chart
      entity="Contact"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :contact-data="results"
      :chart-class="'h-30rem'"
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

import { contactRequests, useDialog } from 'atomic'

const { closeDialog } = useDialog()

const { loading, results, getAllContacts } = contactRequests(closeDialog)

onMounted(() => {
  getAllContacts(true)
})
</script>
