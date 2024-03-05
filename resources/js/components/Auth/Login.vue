<template>
    <Toast />
    <Links />
    <div class="p-2">
        <Card class="loginCard">
            <template #header>
                <div class="flex justify-content-center">
                    <h2 class="mt-5">Log In</h2>
                </div>
            </template>
            <template #content>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <label
                            for="email"
                            class="col-md-4 col-form-label text-md-end"
                        >
                            Email Address
                        </label>

                        <div class="col-md-6">
                            <input
                                v-model="formData.email"
                                type="email"
                                class="form-control"
                                id="email"
                                required
                            />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="password" class="col-md-4 text-md-end">
                            Password
                        </label>

                        <div class="col-md-6">
                            <input
                                v-model="formData.password"
                                type="password"
                                class="form-control"
                                id="password"
                                required
                            />
                        </div>
                    </div>

                    <div class="row mb-0">
                        <div
                            class="col-md-6 offset-md-4 flex justify-content-between"
                        >
                            <Button type="submit" class="smallHeightButton">
                                Log In
                            </Button>
                        </div>
                    </div>
                </form>
            </template>
            <template #footer>
                <TestLoginButton />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useApiErrors, useFlashToast } from '../../utils'
import { TestLoginButton } from '../'
import Links from './Links.vue'
const { flashToast } = useFlashToast()
const { apiErrors } = useApiErrors()

interface FormData {
    name: string
    email: string
    password: string
    password_confirmation: string
}

const formData = ref<FormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

async function submitForm() {
    await axios
        .post('/login', {
            name: formData.value.name,
            email: formData.value.email,
            password: formData.value.password,
        })
        .then((response) => {
            console.log(response)
            window.location.href = '/home'
            flashToast('Successfully created: ' + response.data.name, 'success')
        })
        .catch((error) => {
            apiErrors(error)
        })
}
</script>
