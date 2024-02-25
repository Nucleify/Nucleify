<template>
    <Dialog :visible="visible" modal header="Show contact" class="w-30rem">
        <template #header>
            <h2 class="m-0">
                Show:
                {{ user.data.name }}
            </h2>
        </template>
        <div v-if="user" class="flex flex-column gap-3">
            <div>
                <h5 class="mb-0">Name</h5>
                <div>
                    {{ user.data.name }}
                </div>
            </div>
            <div>
                <h5 class="mb-0">Email</h5>
                <div>{{ user.data.email }}</div>
            </div>
            <div>
                <h5 class="mb-0">Role</h5>
                <div>{{ user.data.role }}</div>
            </div>
            <div class="flex">
                <div class="col-6 p-0">
                    <h5 class="mb-0">Created At</h5>
                    <div>{{ user.data.created_at }}</div>
                </div>
                <div class="col-6 p-0">
                    <h5 class="mb-0">Updated At</h5>
                    <div>{{ user.data.updated_at }}</div>
                </div>
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
    user: any
    close: (action: string) => void
}>()

const { visible, user } = toRefs(props)
</script>
