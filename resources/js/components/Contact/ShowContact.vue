<template>
    <Dialog :visible="visible" modal header="Show contact" class="w-30rem">
        <template #header>
            <h2 class="m-0">
                Show:
                {{ contact.data.first_name }} {{ contact.data.last_name }}
            </h2>
        </template>
        <div v-if="contact" class="flex flex-column gap-3">
            <div>
                <h5 class="mb-0">Full Name</h5>
                <div>
                    {{ contact.data.first_name }} {{ contact.data.last_name }}
                </div>
            </div>
            <div>
                <h5 class="mb-0">Email</h5>
                <div>{{ contact.data.email }}</div>
            </div>
            <div class="flex gap-5">
                <div>
                    <h5 class="mb-0">Personal Phone</h5>
                    <div>{{ contact.data.personal_phone }}</div>
                </div>
                <div>
                    <h5 class="mb-0">Work Phone</h5>
                    <div>{{ contact.data.work_phone }}</div>
                </div>
            </div>
            <div>
                <h5 class="mb-0">Address</h5>
                <div>{{ contact.data.address }}</div>
            </div>
            <div>
                <h5 class="mb-0">Birthday</h5>
                <div>{{ contact.data.birthday }}</div>
            </div>
            <div>
                <h5 class="mb-0">Contact Groups</h5>
                <div>
                    {{ contact.data.contact_groups }}
                    <p v-if="!contact.data.contact_groups">
                        This contact have no contact groups.
                    </p>
                </div>
            </div>
            <div class="-mt-3">
                <h5 class="mb-0">Role</h5>
                <div>{{ contact.data.role }}</div>
            </div>
        </div>
        <template #footer>
            <div class="flex gap-2 justify-content-end">
                <Button
                    severity="secondary"
                    label="Close"
                    @click="props.close('show')"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{
    visible: boolean
    contact: any
    close: (action: string) => void
}>()

const { visible, contact } = toRefs(props)
</script>
