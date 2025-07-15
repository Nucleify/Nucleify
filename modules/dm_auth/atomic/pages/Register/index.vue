<template>
  <ad-anchor-backlink />
  <div class="auth-card-container">
    <ad-card class="register-card">
      <template #header>
        <div class="auth-card-header-container">
          <div class="auth-card-header">
            <ad-heading :tag="1" :text="t('auth.register.title')" />

            <ad-paragraph :text="t('auth.register.subtitle')">
              <ad-anchor
                :href="localePath('/login')"
                :label="t('auth.register.highlight')"
              />
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
              ad-type="main"
              :type="field.type"
              :id="field.id"
              class="auth-input-text"
              :autofocus="field.autofocus"
            />

            <ad-password
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

            <ad-label
              :for="field.id"
              :label="t('auth.labels.' + toCamelCase(field.label))"
            />
          </ad-float-label>

          <ad-button
            :label="t('auth.labels.registerButton')"
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

import {
  checkIsEmpty,
  checkPasswordsMatch,
  toCamelCase,
  useAuthForm,
  useColors,
} from 'atomic'

const { submitForm, registerFields, registerInputs } = useAuthForm()
const { setDefaultColors } = useColors()

const localePath = useLocalePath()

const { t } = useI18n()

onMounted(() => {
  setDefaultColors(true)
  checkPasswordsMatch(
    registerFields.value.password,
    registerFields.value.password_confirmation
  )
})
</script>
