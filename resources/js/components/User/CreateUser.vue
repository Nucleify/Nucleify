<template>
    <Button label="Create user" @click="visible = true" />

    <Dialog v-model:visible="visible" modal header="Header" class="w-30rem">
        <template #header>
            <h2 class="m-0">Create new user</h2>
        </template>

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
                    @click="visible = false"
                    autofocus
                />
                <Button label="Confirm" @click.prevent="storeUser" autofocus />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const data = ref({
    name: '',
    email: '',
    role: '',
    password: '',
    confirm_password: '',
})

const visible = ref(false)
const errors = ref<string[]>([])
const options = ref(['user', 'admin'])

function storeUser() {
    errors.value = []
    axios
        .post('/api/users', {
            name: data.value.name,
            email: data.value.email,
            role: data.value.role,
            password: data.value.password,
            confirm_password: data.value.confirm_password,
        })
        .then((response) => console.log(response))
        .catch((error) => {
            flashErrors(error.response.data.errors)
        })
}

function flashErrors(errorsData: Record<string, string[]>) {
    for (const value in errorsData) {
        if (Object.prototype.hasOwnProperty.call(errorsData, value)) {
            errors.value.push(...errorsData[value])
        }
    }
    setTimeout(() => {
        errors.value = []
    }, 5000)
}
</script>
