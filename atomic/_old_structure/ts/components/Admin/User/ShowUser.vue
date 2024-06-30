<template>
    <Dialog :visible="visible" modal header="Show contact" class="myDialog">
        <template #header>
            <heading-atom :tag="3" :text="user!.name" />
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
                <button-atom
                    label="Close"
                    severity="secondary"
                    @click="props.close('show')"
                    :rounded="true"
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
