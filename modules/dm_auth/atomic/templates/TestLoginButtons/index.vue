<template>
  <div class="test-login-buttons-container">
    <ad-button
      icon="prime:crown"
      class="primary-button text-sm"
      :rounded="true"
      @click="testLogin({ role: 'admin', path: localePath('settings') + '#modules' })"
    />
    <ad-button
      icon="prime:user"
      severity="secondary"
      class="primary-button text-sm"
      :rounded="true"
      @click="testLogin({ role: 'user', path: localePath('settings') + '#modules' })"
    />
  </div>
</template>

<script setup lang="ts">
import { testLogin } from 'atomic'

const localePath = useLocalePath()
</script>
