<template>
    <user-dashboard
        :errors="errors"
        :flashValidationErrors="flashValidationErrors"
        :hideErrors="hideErrors"
    />
    <contact-dashboard
        :errors="errors"
        :flashValidationErrors="flashValidationErrors"
        :hideErrors="hideErrors"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ContactDashboard from './Contact/ContactDashboard.vue'
import UserDashboard from './User/UserDashboard.vue'

const errors = ref<string[]>([])

/**
 * Flash validation errors function
 *
 * @param errorsData
 */
function flashValidationErrors(errorsData: Record<string, string[]>): void {
    for (const value in errorsData) {
        if (Object.prototype.hasOwnProperty.call(errorsData, value)) {
            errors.value.push(...errorsData[value])
        }
    }
    setTimeout(() => {
        hideErrors()
    }, 5000)
}

function hideErrors() {
    errors.value = []
}
</script>
