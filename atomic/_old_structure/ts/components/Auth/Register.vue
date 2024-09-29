<template>
    <back-link />
    <div class="auth-card-container">
        <Card class="register-card">
            <template #header>
                <div class="auth-card-header-container">
                    <div class="auth-card-header">
                        <heading-atom :tag="1" text="Register" />

                        <paragraph-atom class="mb-2" text="Already have an account?">
                            <anchor-molecule href="/login" :label="'Log in!'" />
                        </paragraph-atom>
                    </div>
                </div>
            </template>
            <template #content>
                <form @submit.prevent="submitForm(registerFields)">
                    <float-label-molecule
                        v-for="(field, index) in registerInputs"
                        :key="index"
                    >
                        <input-text-atom
                            v-if="field.type !== 'password'"
                            v-model="registerFields[field.model]"
                            :type="field.type"
                            :id="field.id"
                            class="auth-input-text"
                            :autofocus="field.autofocus"
                        />

                        <password-organism
                            v-else
                            v-model="registerFields[field.model]"
                            :id="field.id"
                            class="auth-input-text"
                            :autofocus="field.autofocus"
                            :passwords-match="checkPasswordsMatch(registerFields['password'], registerFields['password_confirmation']) && field.model === 'password_confirmation'"
                            :empty-password="checkIsEmpty(registerFields['password']) && field.model === 'password_confirmation'"
                            :empty-confirm-password="checkIsEmpty(registerFields['password_confirmation']) && field.model === 'password_confirmation'"
                        />

                        <label-atom :for="field.id" :label="field.label" />
                    </float-label-molecule>

                    <button-atom
                        label="Register"
                        type="submit"
                        class="primary-button -mb-1 mt-2"
                        padding="10px 10px"
                    />
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { checkIsEmpty, checkPasswordsMatch, useAuthForm, useColors } from 'atomic/bosons/utils'

const { submitForm, registerFields, registerInputs } = useAuthForm()
const { setDefaultColors } = useColors()

onMounted(() => {
    setDefaultColors(true)
    checkPasswordsMatch(registerFields.value.password, registerFields.value.password_confirmation)
})
</script>
