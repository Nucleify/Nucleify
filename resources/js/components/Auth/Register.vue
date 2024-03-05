<template>
    <Toast />
    <Links />
    <div class="p-2">
        <Card class="registerCard">
            <template #header>
                <div class="flex justify-content-center">
                    <h2 class="-mb-2 mt-5 md:mt-6">Register</h2>
                </div>
            </template>
            <template #content>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <label
                            for="name"
                            class="col-md-4 col-form-label text-md-end"
                        >
                            Name
                        </label>

                        <div class="col-md-6">
                            <InputText
                                v-model="formData.name"
                                type="text"
                                id="name"
                                required
                                autofocus
                                class="authInputText"
                            />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label
                            for="email"
                            class="col-md-4 col-form-label text-md-end"
                        >
                            Email Address
                        </label>

                        <div class="col-md-6">
                            <InputText
                                v-model="formData.email"
                                type="email"
                                id="email"
                                required
                                class="authInputText"
                            />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label
                            for="password"
                            class="col-md-4 col-form-label text-md-end"
                        >
                            Password
                        </label>

                        <div class="col-md-6">
                            <InputText
                                v-model="formData.password"
                                type="password"
                                id="password"
                                required
                                class="authInputText"
                            />
                        </div>
                    </div>

                    <div class="row mb-4 md:mb-3">
                        <label
                            for="password-confirm"
                            class="col-md-4 col-form-label text-md-end"
                        >
                            Confirm Password
                        </label>

                        <div class="col-md-6">
                            <InputText
                                v-model="formData.password_confirmation"
                                type="password"
                                id="password-confirm"
                                required
                                class="authInputText"
                            />
                        </div>
                    </div>

                    <div class="row mb-0">
                        <div
                            class="col-md-6 offset-md-4 text-center md:text-left"
                        >
                            <Button
                                type="submit"
                                class="smallHeightButton text-sm"
                            >
                                Register
                            </Button>
                        </div>
                    </div>
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

import Links from './Links.vue'
import { useApiErrors, useFlashToast } from '../../utils'

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
        .post('/register', {
            name: formData.value.name,
            email: formData.value.email,
            password: formData.value.password,
            password_confirmation: formData.value.password_confirmation,
            role: 'user',
        })
        .then((response) => {
            window.location.href = '/home'
            flashToast('Successfully created: ' + response.data.name, 'success')
        })
        .catch((error) => {
            apiErrors(error)
        })
}
</script>
