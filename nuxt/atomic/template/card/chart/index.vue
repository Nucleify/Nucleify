<template>
  <ad-card class="my-card chart-card">
    <template #content>
      <ad-chart
        :chart-method-type="chartMethodType"
        :type="type"
        :direction="direction"
        :activity-log-data="activityLogData"
        :article-data="articleData"
        :card-data="cardData"
        :contact-data="contactData"
        :link-data="linkData"
        :money-data="moneyData"
        :question-data="questionData"
        :feature-data="featureData"
        :technology-data="technologyData"
        :user-data="userData"
        :chart-class="chartClass"
        :class="loading ? 'chart-loading' : 'chart-loaded'"
      />
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import type { CardChartInterface } from 'atomic'

defineProps<CardChartInterface>()
</script>
