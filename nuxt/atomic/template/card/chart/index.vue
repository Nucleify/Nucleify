<template>
  <client-only>
    <ad-card v-if="displayCharts[props.entity]" class="my-card chart-card">
      <template #content>
        <ad-chart
          :chart-method-type="props.chartMethodType"
          :type="props.type"
          :direction="props.direction"
          :activity-log-data="props.activityLogData"
          :article-data="props.articleData"
          :card-data="props.cardData"
          :contact-data="props.contactData"
          :link-data="props.linkData"
          :money-data="props.moneyData"
          :question-data="props.questionData"
          :feature-data="props.featureData"
          :task-data="props.taskData"
          :technology-data="props.technologyData"
          :user-data="props.userData"
          :chart-class="props.chartClass"
          :class="props.loading ? 'chart-loading' : 'chart-loaded'"
        />
      </template>
    </ad-card>
  </client-only>
</template>

<script setup lang="ts">
import type { CardChartInterface } from 'atomic'

import { useDisplayChartsStore } from '~/stores/display_charts'

const props = defineProps<CardChartInterface>()

const displayCharts = useDisplayChartsStore()
</script>
