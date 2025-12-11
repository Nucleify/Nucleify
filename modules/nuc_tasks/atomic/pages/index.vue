<template>
  <div class="panel-container">
    <nuc-entity-chart-card
      entity="Task"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ task: results }"
      :loading="loading"
    />
    <nuc-task-dashboard
      :data="results"
      :get-data="getAllTasks"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { taskRequests, useNucDialog } from 'atomic'

const { closeDialog } = useNucDialog()
const { results, loading, getAllTasks } = taskRequests(closeDialog)

onMounted(() => {
  getAllTasks(true)
})
</script>
