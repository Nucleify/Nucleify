<template>
  <ad-anchor-backlink />
  <ad-card class="login-card">
    <template #header>
      <div class="auth-card-header-container">
        <div class="auth-card-header">
          <ad-image
            :src="imgUrl + 'logo.svg'"
            alt="DataManager logo"
            width="50"
          />
          <ad-heading :tag="1" text="Welcome Back" />

          <ad-paragraph class="mb-2" text="Don't have an account?">
            <ad-anchor href="/register" :label="'Create today!'" />
          </ad-paragraph>
        </div>
      </div>
    </template>
    <template #content>
      <form @submit.prevent="submitAndGo(loginFields)">
        <dm-captcha-dialog @validateCaptcha="onValidateCaptcha" />

        <ad-float-label v-for="(field, index) in loginInputs" :key="index">
          <ad-input-text
            :id="field.id"
            v-model="loginFields[field.model]"
            :ad-type="'main'"
            :type="field.type"
            class="auth-input-text"
            :autofocus="field.autofocus"
          />
          <ad-label :for="field.id" :label="field.label" />
        </ad-float-label>

        <client-only>
          <ad-button :disabled="!isCaptchaValid" label="Log In" type="submit" padding="10px" />
        </client-only>
      </form>
    </template>
  </ad-card>

  <dm-test-login-buttons />
</template>

<script setup lang="ts">
import { useAuthForm } from 'atomic'

const { submitAndGo, loginFields, loginInputs } = useAuthForm()

const isCaptchaValid = ref(false)

function onValidateCaptcha(isValid: boolean) {
  isCaptchaValid.value = isValid
}
</script>
