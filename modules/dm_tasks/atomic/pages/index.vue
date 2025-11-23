<template>
  <div class="panel-container">
    <dm-entity-chart-card
      entity="Task"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ task: results }"
      :loading="loading"
    />
    <dm-task-dashboard
      :data="results"
      :get-data="getAllTasks"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { taskRequests, useAtomicDialog } from 'atomic'

const { closeDialog } = useAtomicDialog()
const { results, loading, getAllTasks } = taskRequests(closeDialog)

onMounted(() => {
  getAllTasks(true)
})
</script>
