<template>
    <Toast />
    <BackLink />
    <div class="authCardContainer">
        <Card class="loginCard">
            <template #header>
                <div class="authCardHeaderContainer">
                    <div class="authCardHeader">
                        <image-atom src="logo.png" width="50" />
                        <heading-atom :tag="1" text="Welcome Back" />

                        <p class="mb-2">
                            Don't have an account?
                            <anchor-tag-molecule
                                href="/register"
                                :label="'Create today!'"
                            />
                        </p>
                    </div>
                </div>
            </template>
            <template #content>
                <form @submit.prevent="submitAuthForm(data)">
                    <float-label-molecule>
                        <input-text-atom
                            v-model="data.email"
                            type="email"
                            id="email"
                            class="authInputText"
                            autofocus
                        />
                        <label-tag-atom for="email" label="Email Address" />
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

                    <button-atom
                        label="Log In"
                        type="submit"
                        class="-mb-1 mt-2"
                        padding="10px 10px"
                    />
                </form>
            </template>
        </Card>
    </div>

    <TestLoginButton />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { BackLink, TestLoginButton } from '@/components'
import { LoginFormInterface } from '@/types'
import { useSubmitAuthForm } from '@/utils'

const data = ref<LoginFormInterface>({
    email: '',
    password: '',
})

const { submitAuthForm } = useSubmitAuthForm()
</script>
