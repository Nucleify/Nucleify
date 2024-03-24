<template>
    <Dialog :visible="visible" modal header="Show contact" class="w-30rem">
        <template #header>
            <h2 class="m-0">
                {{ contact.full_name }}
            </h2>
        </template>
        <div v-if="contact" class="flex flex-column gap-3">
            <div>
                <h5 class="mb-0">Email</h5>
                <div>
                    {{ contact.email }}
                </div>
            </div>
            <div class="flex">
                <div class="col-6 p-0">
                    <h5 class="mb-0">Personal Phone</h5>
                    <div>{{ contact.personal_phone }}</div>
                </div>
                <div class="col-6 p-0">
                    <h5 class="mb-0">Work Phone</h5>
                    <div>{{ contact.work_phone }}</div>
                </div>
            </div>
            <div>
                <h5 class="mb-0">Address</h5>
                <div>{{ contact.address }}</div>
            </div>
            <div>
                <h5 class="mb-0">Birthday</h5>
                <div>{{ contact.birthday }}</div>
            </div>
            <div>
                <h5 class="mb-0">Contact Groups</h5>
                <div>
                    {{ contact.contact_groups }}
                    <p v-if="!contact.contact_groups">
                        This contact have no contact groups.
                    </p>
                </div>
            </div>
            <div class="-mt-3">
                <h5 class="mb-0">Role</h5>
                <div>{{ contact.role }}</div>
            </div>
            <div class="flex">
                <div class="col-6 p-0">
                    <h5 class="mb-0">Created At</h5>
                    <div>{{ contact.created_at }}</div>
                </div>
                <div class="col-6 p-0">
                    <h5 class="mb-0">Updated At</h5>
                    <div>{{ contact.updated_at }}</div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex gap-2 justify-content-end">
                <Button
                    severity="secondary"
                    label="Close"
                    @click="props.close('show')"
                    class="smallHeightButton"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ContactInterface } from '../../interfaces'

const props = defineProps<{
    visible: boolean
    contact: ContactInterface
    close: (action: string) => void
}>()
</script>
