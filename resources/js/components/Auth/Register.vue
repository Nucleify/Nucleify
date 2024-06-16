<template>
    <Toast />
    <Links />
    <div class="authCardContainer">
        <Card class="registerCard">
            <template #header>
                <div class="authCardHeaderContainer">
                    <h2 class="authCardHeader">Register</h2>
                </div>
            </template>
            <template #content>
                <form @submit.prevent="submitAuthForm(data)">
                    <div class="row mb-3">
                        <label
                            for="name"
                            class="col-md-4 col-form-label text-md-end"
                        >
                            Name
                        </label>

                        <div class="col-md-6">
                            <InputText
                                v-model="data.name"
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
                                v-model="data.email"
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
                                v-model="data.password"
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
                                v-model="data.password_confirmation"
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
                                class="primaryButton p-button-rounded text-sm"
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

import Links from './Links.vue'

import { RegisterFormInterface } from '@/types'
import { useSubmitAuthForm } from '@/utils'

const data = ref<RegisterFormInterface>({
    name: '',
    email: '',
    role: '',
    password: '',
    password_confirmation: '',
})

const { submitAuthForm } = useSubmitAuthForm()
</script>
