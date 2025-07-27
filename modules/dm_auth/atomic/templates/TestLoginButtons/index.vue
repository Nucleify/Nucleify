<template>
  <div class="test-login-buttons-container">
    <ad-button
      icon="prime:crown"
      class="primary-button text-sm"
      :rounded="true"
      @click="loginAndGo('admin')"
    />
    <ad-button
      icon="prime:user"
      severity="secondary"
      class="primary-button text-sm"
      :rounded="true"
      @click="loginAndGo('user')"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#app'

import { testLogin } from 'atomic'

const router = useRouter()

async function loginAndGo(role: string) {
  await testLogin(role)
  router.push('/dashboard')
}
</script>
