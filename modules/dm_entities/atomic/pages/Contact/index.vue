<template>
  <div class="panel-container">
    <ad-card-chart
      v-if="display.Contact"
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
      :getData="getAllContacts"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { contactRequests, useDialog, useDisplayCharts } from 'atomic'

const { closeDialog } = useDialog()

const { display } = useDisplayCharts()

const { loading, results, getAllContacts } = contactRequests(closeDialog)

onMounted(() => {
  getAllContacts(true)
})
</script>
