<template>
  <ad-back-link />
  <div class="auth-card-container">
    <ad-card class="register-card">
      <template #header>
        <div class="auth-card-header-container">
          <div class="auth-card-header">
            <ad-header :tag="1" text="Register" />

            <ad-paragraph class="mb-2" text="Already have an account?">
              <ad-anchor href="/login" :label="'Log in!'" />
            </ad-paragraph>
          </div>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="submitForm(registerFields)">
          <ad-float-label v-for="(field, index) in registerInputs" :key="index">
            <ad-input-text
              v-if="field.type !== 'password'"
              v-model="registerFields[field.model]"
              :type="field.type"
              :id="field.id"
              class="auth-input-text"
              :autofocus="field.autofocus"
            />

            <ad-password
              v-else
              v-model="registerFields[field.model]"
              :id="field.id"
              class="auth-input-text"
              :autofocus="field.autofocus"
              :passwords-match="
                checkPasswordsMatch(
                  registerFields['password'],
                  registerFields['password_confirmation']
                ) && field.model === 'password_confirmation'
              "
              :empty-password="
                checkIsEmpty(registerFields['password']) &&
                field.model === 'password_confirmation'
              "
              :empty-confirm-password="
                checkIsEmpty(registerFields['password_confirmation']) &&
                field.model === 'password_confirmation'
              "
            />

            <ad-label :for="field.id" :label="field.label" />
          </ad-float-label>

          <ad-button
            label="Register"
            type="submit"
            class="primary-button -mb-1 mt-2"
            padding="10px 10px"
          />
        </form>
      </template>
    </ad-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import {
  checkIsEmpty,
  checkPasswordsMatch,
  useAuthForm,
  useColors,
} from 'atomic/bosons/utils'

const { submitForm, registerFields, registerInputs } = useAuthForm()
const { setDefaultColors } = useColors()

onMounted(() => {
  setDefaultColors(true)
  checkPasswordsMatch(
    registerFields.value.password,
    registerFields.value.password_confirmation
  )
})
</script>
