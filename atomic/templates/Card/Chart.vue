<template>
    <Card class="my-card chart-card">
        <template #content>
            <chart-organism
                :chart-method-type="chartMethodType"
                :type="type"
                :direction="direction"
                :activity-log-data="activityLogData"
                :article-data="articleData"
                :contact-data="contactData"
                :user-data="userData"
                :chart-class="chartClass"
                :class="loading ? 'chart-loading' : 'chart-loaded'"
            />
            <progress-spinner-atom v-if="loading" />
        </template>
    </Card>
</template>

<script setup lang="ts">
import { CardChartInterface } from 'atomic/bosons/types'

defineProps<CardChartInterface>()
</script>
