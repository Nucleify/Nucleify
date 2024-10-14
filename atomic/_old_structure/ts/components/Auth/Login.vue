<template>
  <ad-back-link />
  <div class="auth-card-container">
    <ad-card class="login-card">
      <template #header>
        <div class="auth-card-header-container">
          <div class="auth-card-header">
            <ad-image src="logo.svg" width="50" />
            <ad-header :tag="1" text="Welcome Back" />

            <ad-paragraph class="mb-2" text="Don't have an account?">
              <ad-anchor href="/register" :label="'Create today!'" />
            </ad-paragraph>
          </div>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="submitForm(loginFields)">
          <ad-float-label v-for="(field, index) in loginInputs" :key="index">
            <ad-input-text
              v-model="loginFields[field.model]"
              :type="field.type"
              :id="field.id"
              class="auth-input-text"
              :autofocus="field.autofocus"
            />
            <ad-label :for="field.id" :label="field.label" />
          </ad-float-label>

          <ad-button
            label="Log In"
            type="submit"
            class="-mb-1 mt-2"
            padding="10px 10px"
          />
        </form>
      </template>
    </ad-card>
  </div>

  <ad-test-login-buttons />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useAuthForm, useColors } from 'atomic/bosons/utils'

const { submitForm, loginFields, loginInputs } = useAuthForm()
const { setDefaultColors } = useColors()

onMounted(() => setDefaultColors(true))
</script>
