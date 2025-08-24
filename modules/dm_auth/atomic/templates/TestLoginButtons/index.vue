<template>
  <div class="test-login-buttons-container">
    <ad-button
      icon="prime:crown"
      @click="testLogin({ role: 'admin', path: localePath('dashboard') })"
      class="primary-button text-sm"
      :rounded="true"
      @click="testLogin({ role: 'admin', path: localePath('/dashboard') })"
    />
    <ad-button
      icon="prime:user"
      severity="secondary"
      @click="testLogin({ role: 'user', path: localePath('login') })"
      class="primary-button text-sm"
      :rounded="true"
      @click="testLogin({ role: 'user', path: localePath('/dashboard') })"
    />
  </div>
</template>

<script setup lang="ts">
import { testLogin } from 'atomic'

const localePath = useLocalePath()
</script>
