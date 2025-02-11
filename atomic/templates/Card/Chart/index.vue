<template>
  <ad-card class="my-card chart-card">
    <template #content>
      <ad-chart
        :chart-method-type="chartMethodType"
        :type="type"
        :direction="direction"
        :activity-log-data="activityLogData"
        :article-data="articleData"
        :contact-data="contactData"
        :money-data="moneyData"
        :question-data="questionData"
        :user-data="userData"
        :chart-class="chartClass"
        :class="loading ? 'chart-loading' : 'chart-loaded'"
      />
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import { CardChartInterface } from 'atomic'

defineProps<CardChartInterface>()
</script>
