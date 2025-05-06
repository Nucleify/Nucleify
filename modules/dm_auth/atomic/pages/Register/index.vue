<template>
  <template-anchor-backlink />
  <div class="auth-card-container">
    <organism-card class="register-card">
      <template #header>
        <div class="auth-card-header-container">
          <div class="auth-card-header">
            <atom-heading :tag="1" text="Register" />

            <atom-paragraph text="Already have an account?">
              <molecule-anchor href="/login" :label="'Log in!'" />
            </atom-paragraph>
          </div>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="submitForm(registerFields)">
          <molecule-floatlabel
            v-for="(field, index) in registerInputs"
            :key="index"
          >
            <atom-inputtext
              v-if="field.type !== 'password'"
              v-model="registerFields[field.model]"
              ad-type="main"
              :type="field.type"
              :id="field.id"
              class="auth-input-text"
              :autofocus="field.autofocus"
            />

            <organism-password
              v-else
              v-model="registerFields[field.model]"
              ad-type="main"
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

            <atom-label :for="field.id" :label="field.label" />
          </molecule-floatlabel>

          <atom-button
            label="Register"
            type="submit"
            class="primary-button"
            padding="10px 10px"
          />
        </form>
      </template>
    </organism-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import {
  checkIsEmpty,
  checkPasswordsMatch,
  useAuthForm,
  useColors,
} from 'atomic'

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
