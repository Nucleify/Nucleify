<template>
    <Dialog :visible="visible" modal header="Header" class="w-30rem">
        <template #header>
            <h2 class="m-0">Create new user</h2>
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
import { Ref, ref, toRefs } from 'vue'
import axios from 'axios'

const props = defineProps<{
    visible: boolean
    options: any
    errors: Ref<string[]>
    flashValidationErrors: (errors: Record<string, string[]>) => void
    hideErrors: () => void
    close: (action: string) => void
}>()

const data = ref({
    name: '',
    email: '',
    role: '',
    password: '',
    confirm_password: '',
})

const { visible, options, errors } = toRefs(props)
const success_message = ref<string | null>(null)
const danger_message = ref<string | null>(null)

async function storeUser() {
    props.hideErrors()
    await axios
        .post('/api/users', {
            name: data.value.name,
            email: data.value.email,
            role: data.value.role,
            password: data.value.password,
            confirm_password: data.value.confirm_password,
        })
        .then((response) => {
            success_message.value =
                'Successfully created user: ' + response.data.name + '.'
            setTimeout(() => {
                success_message.value = null
                props.close('create')
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
