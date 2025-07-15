<template>
  <div class="test-login-buttons-container">
    <ad-button
      icon="pi pi-crown"
      @click="testLogin({ role: 'admin', path: localePath('/dashboard') })"
      class="primary-button text-sm"
      :rounded="true"
    />
    <ad-button
      icon="pi pi-user"
      severity="secondary"
      @click="testLogin({ role: 'user', path: localePath('/login') })"
      class="primary-button text-sm"
      :rounded="true"
    />
  </div>
</template>

<script setup lang="ts">
import { testLogin } from 'atomic'

const localePath = useLocalePath()
</script>
