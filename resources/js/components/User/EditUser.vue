<template>
    <Dialog v-model:visible="visible" modal header="Header" class="w-30rem">
        <template #header>
            <h2 class="m-0">Edit: {{ user.data.name }}</h2>
        </template>

        <!-- Display success messages-->
        <InlineMessage v-if="success_message !== null" severity="success">
            <div class="text-sm">
                {{ success_message }}
            </div>
        </InlineMessage>

        <!-- Display danger messages -->
        <InlineMessage v-if="danger_message !== null" severity="error">
            <div class="text-sm">
                {{ danger_message }}
            </div>
        </InlineMessage>

        <!-- Display errors -->
        <InlineMessage v-if="errors.length > 0" severity="warn">
            <div class="text-sm" v-for="error in errors" :key="error">
                {{ error }}
            </div>
        </InlineMessage>

        <form action="#" class="text-sm">
            <div class="flex flex-column gap-1 mb-3">
                <label for="name">Name</label>
                <InputText id="name" type="text" v-model="data.name" />
            </div>

            <div class="flex flex-column gap-1 mb-3">
                <label for="email">Email</label>
                <InputText id="email" type="text" v-model="data.email" />
            </div>

            <div class="flex flex-column gap-1 mb-3">
                <label for="role">Role</label>
                <Dropdown
                    v-model="data.role"
                    :options="options"
                    placeholder="Select a role"
                    class="p-0"
                />
            </div>
        </form>

        <template #footer>
            <div class="flex gap-2 justify-content-end">
                <Button
                    severity="secondary"
                    label="Cancel"
                    @click="props.close('edit')"
                />
                <Button label="Confirm" @click.prevent="editUser" autofocus />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { Ref, ref, toRefs, watch } from 'vue'
import axios from 'axios'

const props = defineProps<{
    visible: boolean
    user: any
    options: any
    errors: Ref<string[]>
    flashValidationErrors: (errors: Record<string, string[]>) => void
    hideErrors: () => void
    close: (action: string) => void
}>()

const data = ref({
    id: '',
    name: '',
    email: '',
    role: '',
})

const { visible, user, options, errors } = toRefs(props)
const success_message = ref<string | null>(null)
const danger_message = ref<string | null>(null)

/**
 * Check modal open with watch visible variable, then pass props to data
 */
watch(visible, () => {
    Object.assign(data.value, user.value.data)
})

async function editUser() {
    props.hideErrors()
    await axios
        .put('/api/users/' + data.value.id, {
            name: data.value.name,
            email: data.value.email,
            role: data.value.role,
        })
        .then((response) => {
            success_message.value =
                'Successfully updated user: ' + response.data.name + '.'
            setTimeout(() => {
                success_message.value = null
                props.close('edit')
            }, 1500)
        })
        .catch((error) => {
            if (error.response.status === 500) {
                errors.value = ['HTTP 500: Internal Server Error']
            } else if (error.response.status === 403 || (401 && !422)) {
                danger_message.value = 'Unauthorized access.'
                setTimeout(() => {
                    danger_message.value = null
                }, 5000)
            } else {
                props.flashValidationErrors(error.response.data.errors)
            }
        })
}
</script>
