<template>
    <Toast />
    <Links />
    <div class="p-4">
        <Card class="loginCard">
            <template #header>
                <div class="flex justify-content-center">
                    <h2 class="-mb-2 mt-5 md:mt-6">Log In</h2>
                </div>
            </template>
            <template #content>
                <form @submit.prevent="submitAuthForm(data)">
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
                                autofocus
                                class="authInputText"
                            />
                        </div>
                    </div>

                    <div class="row mb-4 md:mb-3">
                        <label for="password" class="col-md-4 text-md-end">
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

                    <div class="row mb-0">
                        <div
                            class="col-md-6 offset-md-4 text-center md:text-left"
                        >
                            <Button
                                type="submit"
                                class="smallHeightButton text-sm px-3"
                            >
                                Log In
                            </Button>
                        </div>
                    </div>
                </form>
            </template>
        </Card>
        <TestLoginButton class="absolute bottom-0 mb-2" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Links from './Links.vue'

import { TestLoginButton } from '@/components'
import { LoginFormInterface } from '@/types'
import { useSubmitAuthForm } from '@/utils'

const data = ref<LoginFormInterface>({
    email: '',
    password: '',
})

const { submitAuthForm } = useSubmitAuthForm()
</script>
