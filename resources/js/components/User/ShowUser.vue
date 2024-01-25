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

<script lang="ts">
import { defineComponent, PropType, Ref, toRefs } from 'vue'

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        toggle: {
            type: Function as PropType<(selectedUser: Ref<any>) => void>,
            required: true,
        },
        user: {
            type: Object as PropType<any>,
            required: true,
        },
    },
    setup(props) {
        const { user } = toRefs(props)

        function toggleVisibilityShow() {
            props.toggle(user)
        }

        return {
            user,
            toggleVisibilityShow,
        }
    },
})
</script>
