<template>
  <div class="panel-container">
    <ad-card-chart
      entity="Task"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :task-data="results"
      :chart-class="'h-30rem'"
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
import { taskRequests, useDialog } from 'atomic'

const { closeDialog } = useDialog()
const { results, loading, getAllTasks } = taskRequests(closeDialog)

onMounted(() => {
  getAllTasks(true)
})
</script>
