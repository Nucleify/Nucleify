<template>
    <back-link />
    <div class="authCardContainer">
        <Card class="loginCard">
            <template #header>
                <div class="authCardHeaderContainer">
                    <div class="authCardHeader">
                        <image-atom src="logo.svg" width="50" />
                        <heading-atom :tag="1" text="Welcome Back" />

                        <paragraph-atom class="mb-2" text="Don't have an account?">
                            <anchor-molecule
                                href="/register"
                                :label="'Create today!'"
                            />
                        </paragraph-atom>
                    </div>
                </div>
            </template>
            <template #content>
                <form @submit.prevent="submitForm(loginFields)">
                    <float-label-molecule v-for="(field, index) in loginInputs" :key="index">
                        <input-text-atom
                            v-model="loginFields[field.model]"
                            :type="field.type"
                            :id="field.id"
                            class="authInputText"
                            :autofocus="field.autofocus"
                        />
                        <label-atom :for="field.id" :label="field.label" />
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

    <test-login-buttons />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useAuthForm, useColors } from 'atomic/bosons/utils'

const { submitForm, loginFields, loginInputs } = useAuthForm()
const { setDefaultColors } = useColors()

onMounted(() => setDefaultColors(true))
</script>
