<template>
    <Dialog :visible="visible" modal header="Show contact" class="myDialog">
        <template #header>
            <h2 class="myDialogHeader">
                {{ user.name }}
            </h2>
        </template>
        <div v-if="user" class="showDataContainer">
            <div>
                <h5 class="showDataHeader">Email</h5>
                <div>{{ user.email }}</div>
            </div>
            <div>
                <h5 class="showDataHeader">Role</h5>
                <div>{{ user.role }}</div>
            </div>
            <div class="showDataDatesContainer">
                <div class="showDataDate col-6">
                    <h5 class="showDataHeader">Created At</h5>
                    <div>{{ user.created_at }}</div>
                </div>
                <div class="showDataDate col-6">
                    <h5 class="showDataHeader">Updated At</h5>
                    <div>{{ user.updated_at }}</div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="dialogButtonsContainer">
                <Button
                    severity="secondary"
                    label="Close"
                    @click="props.close('show')"
                    class="p-button-rounded"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { UserInterface } from '@/types'

const props = defineProps<{
    visible: boolean
    user: UserInterface | undefined
    close: (action: string) => void
}>()
</script>
