<template>
    <Toast position="top-right" />
    <div class="adminPanel flex flex-column gap-1 lg:pb-1">
        <user-dashboard
            v-bind:roleOptions="roleOptions"
            v-bind:flashSuccessMessage="flashSuccessMessage"
            v-bind:flashValidationErrors="flashValidationErrors"
            v-bind:flashDangerMessage="flashDangerMessage"
        />
        <contact-dashboard
            v-bind:roleOptions="roleOptions"
            v-bind:flashSuccessMessage="flashSuccessMessage"
            v-bind:flashValidationErrors="flashValidationErrors"
            v-bind:flashDangerMessage="flashDangerMessage"
        />
    </div>
</template>

<script setup lang="ts">
import ContactDashboard from './Contact/ContactDashboard.vue'
import UserDashboard from './User/UserDashboard.vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const roleOptions = ['user', 'tech', 'test_admin', 'admin', 'super_admin']

/**
 * Flash toast functions
 */
function flashValidationErrors(errorsData: Record<string, string[]>): void {
    closeToast()

    let errorMessage = 'Validation errors:'
    for (const value in errorsData) {
        if (Object.prototype.hasOwnProperty.call(errorsData, value)) {
            errorMessage += `\n- ${errorsData[value].join(', ')}`
        }
    }

    toast.add({
        severity: 'warn',
        summary: errorMessage,
        life: 5000,
    })
}

function flashDangerMessage(errorMessage: string): void {
    closeToast()

    toast.add({
        severity: 'error',
        summary: errorMessage,
        life: 5000,
    })
}

function flashSuccessMessage(successMessage: string): void {
    closeToast()

    toast.add({
        severity: 'success',
        summary: successMessage,
        life: 5000,
    })
}

/**
 * Close toast function
 */
function closeToast(): void {
    document.querySelectorAll('.p-toast-message').forEach((element) => {
        element.remove()
    })
}
</script>
