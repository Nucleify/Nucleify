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
        </div>
        <template #footer>
            <div class="flex gap-2 justify-content-end">
                <Button
                    severity="secondary"
                    label="Close"
                    @click="toggleVisibilityShow"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { defineProps, Ref, toRefs } from 'vue'

const props = defineProps<{
    visible: boolean
    toggle: (selectedUser: Ref<any>) => void
    user: any
}>()

const { user } = toRefs(props)

function toggleVisibilityShow() {
    props.toggle(user)
}
</script>
