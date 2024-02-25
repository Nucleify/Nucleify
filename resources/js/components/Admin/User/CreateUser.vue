<template>
    <Dialog :visible="visible" modal header="Header" class="w-30rem">
        <template #header>
            <h2 class="m-0">Create new user</h2>
        </template>

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

            <div class="flex flex-column gap-1 mb-3">
                <label for="password">Password</label>
                <InputText
                    id="password"
                    type="password"
                    v-model="data.password"
                />
            </div>

            <div class="flex flex-column gap-1">
                <label for="confirmPassword">Confirm Password</label>
                <InputText
                    id="confirmPassword"
                    type="password"
                    v-model="data.confirm_password"
                />
            </div>
        </form>

        <template #footer>
            <div class="flex gap-2 justify-content-end">
                <Button
                    severity="secondary"
                    label="Cancel"
                    @click="props.close('create')"
                />
                <Button label="Confirm" @click="storeUser" />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import axios from 'axios'

const props = defineProps<{
    visible: boolean
    options: string[]
    flashSuccessMessage: (message: string) => void
    flashDangerMessage: (message: string) => void
    flashValidationErrors: (errors: Record<string, string[]>) => void
    close: (action: string) => void
}>()

const data = ref({
    name: '',
    email: '',
    role: '',
    password: '',
    confirm_password: '',
})

const { visible, options } = toRefs(props)

async function storeUser() {
    await axios
        .post('/api/users', {
            name: data.value.name,
            email: data.value.email,
            role: data.value.role,
            password: data.value.password,
            confirm_password: data.value.confirm_password,
        })
        .then((response) => {
            let success_message = 'Successfully created: ' + response.data.name

            props.flashSuccessMessage(success_message)
            props.close('create')
        })
        .catch((error) => {
            switch (error.response.status) {
                case 500:
                    props.flashDangerMessage(
                        error.response.data.error ||
                            'HTTP 500: Internal Server Error'
                    )
                    break
                case 403:
                case 401:
                    props.flashDangerMessage('Unauthorized access')
                    break
                default:
                    props.flashValidationErrors(error.response.data.errors)
            }
        })
}
</script>
