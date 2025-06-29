<template>
  <ad-anchor-backlink />
  <div class="auth-card-container">
    <ad-card class="register-card">
      <template #header>
        <div class="auth-card-header-container">
          <div class="auth-card-header">
            <ad-heading :tag="1" text="Register" />

            <ad-paragraph text="Already have an account?">
              <ad-anchor href="/login" :label="'Log in!'" />
            </ad-paragraph>
          </div>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="submitAndGo(registerFields)">
          <ad-float-label v-for="(field, index) in registerInputs" :key="index">
            <ad-input-text
              v-if="field.type !== 'password'"
              :id="field.id"
              v-model="registerFields[field.model]"
              ad-type="main"
              :type="field.type"
              class="auth-input-text"
              :autofocus="field.autofocus"
            />

            <ad-password
              v-else
              :id="field.id"
              v-model="registerFields[field.model]"
              ad-type="main"
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
            class="primary-button"
            padding="10px 10px"
          />
        </form>
      </template>
    </ad-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { checkIsEmpty, checkPasswordsMatch, useAuthForm } from 'atomic'

const { submitAndGo, registerFields, registerInputs } = useAuthForm()

onMounted(() => {
  checkPasswordsMatch(
    registerFields.value.password,
    registerFields.value.password_confirmation
  )
})
</script>
