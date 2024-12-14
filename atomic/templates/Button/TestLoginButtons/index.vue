<template>
  <div class="test-login-buttons-container">
    <ad-button
      icon="pi pi-crown"
      @click="testLogin('admin')"
      class="primary-button text-sm"
      :rounded="true"
    />
    <ad-button
      icon="pi pi-user"
      severity="secondary"
      @click="testLogin('user')"
      class="primary-button text-sm"
      :rounded="true"
    />
  </div>
</template>

<script setup lang="ts">
import { testLogin } from 'atomic'
</script>
