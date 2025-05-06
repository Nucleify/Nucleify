<template>
  <template-anchor-backlink />
  <organism-card class="login-card">
    <template #header>
      <div class="auth-card-header-container">
        <div class="auth-card-header">
          <atom-image
            :src="imgUrl + 'logo.svg'"
            alt="DataManager logo"
            width="50"
          />
          <atom-heading :tag="1" text="Welcome Back" />

          <atom-paragraph class="mb-2" text="Don't have an account?">
            <molecule-anchor href="/register" :label="'Create today!'" />
          </atom-paragraph>
        </div>
      </div>
    </template>
    <template #content>
      <form @submit.prevent="submitForm(loginFields)">
        <molecule-floatlabel v-for="(field, index) in loginInputs" :key="index">
          <atom-inputtext
            v-model="loginFields[field.model]"
            :ad-type="'main'"
            :type="field.type"
            :id="field.id"
            class="auth-input-text"
            :autofocus="field.autofocus"
          />
          <atom-label :for="field.id" :label="field.label" />
        </molecule-floatlabel>

        <atom-button
          label="Log In"
          type="submit"
          padding="10px 10px"
        />
      </form>
    </template>
  </organism-card>

  <dm-test-login-buttons />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useAuthForm, useColors } from 'atomic'

const { submitForm, loginFields, loginInputs } = useAuthForm()
const { setDefaultColors } = useColors()

onMounted(() => setDefaultColors(true))
</script>
