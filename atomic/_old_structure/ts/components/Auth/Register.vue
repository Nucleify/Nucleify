<template>
    <Toast />
    <BackLink />
    <div class="authCardContainer">
        <Card class="registerCard">
            <template #header>
                <div class="authCardHeaderContainer">
                    <div class="authCardHeader">
                        <h1>Register</h1>
                        <p class="mb-2">
                            Already have an account?
                            <anchor-tag-molecule href="/login" :label="'Log in!'" />
                        </p>
                    </div>
                </div>
            </template>
            <template #content>
                <form @submit.prevent="submitAuthForm(data)">
                    <float-label-molecule>
                        <input-text-atom
                            v-model="data.name"
                            type="text"
                            id="name"
                            class="authInputText"
                            autofocus
                        />
                        <label-tag-atom for="name" label="Name" />
                    </float-label-molecule>

                    <float-label-molecule>
                        <input-text-atom
                            v-model="data.email"
                            type="text"
                            id="name"
                            class="authInputText"
                        />
                        <label-tag-atom for="name" label="Email" />
                    </float-label-molecule>

                    <float-label-molecule>
                        <input-text-atom
                            v-model="data.password"
                            type="password"
                            id="password"
                            class="authInputText"
                        />
                        <label-tag-atom for="password" label="Password" />
                    </float-label-molecule>

                    <float-label-molecule>
                        <input-text-atom
                            v-model="data.password_confirmation"
                            type="password"
                            id="password-confirm"
                            class="authInputText"
                        />
                        <label-tag-atom for="password-confirm" label="Confirm Password" />
                    </float-label-molecule>

                    <button-atom
                        label="Register"
                        type="submit"
                        class="primaryButton -mb-1 mt-2"
                        padding="10px 10px"
                    />
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { BackLink } from '@/components'
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
