<template>
  <nuc-home-link />
  <ad-card class="login-card">
    <template #header>
      <div class="auth-card-header-container">
        <div class="auth-card-header">
          <ad-logo :dimensions="64" ad-type="main" />
          <ad-heading :tag="1" text="Welcome Back" />

          <ad-paragraph class="mb-2" text="Don't have an account?">
            <ad-anchor href="/register" label="Create today!" />
          </ad-paragraph>
        </div>
      </div>
    </template>
    <template #content>
      <form @submit.prevent="submitAndGo(loginFields)">
        <ad-float-label v-for="(field, index) in loginInputs" :key="index">
          <ad-input-text
            :id="field.id"
            v-model="loginFields[field.model]"
            ad-type="main"
            :type="field.type"
            class="auth-input-text"
            :autofocus="field.autofocus"
          />
          <ad-label :for="field.id" :label="field.label" />
        </ad-float-label>

        <ad-button label="Log In" type="submit" />
      </form>
    </template>
  </ad-card>

  <nuc-test-login-buttons />
</template>

<script setup lang="ts">
import { useAuthForm } from 'atomic'

const { submitAndGo, loginFields, loginInputs } = useAuthForm()
</script>
