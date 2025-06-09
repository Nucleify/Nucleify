<template>
  <div class="test-login-buttons-container">
    <ad-button
      icon="pi pi-crown"
      class="primary-button text-sm"
      :rounded="true"
      @click="testLogin('admin')"
    />
    <ad-button
      icon="pi pi-user"
      severity="secondary"
      class="primary-button text-sm"
      :rounded="true"
      @click="testLogin('user')"
    />
  </div>
</template>

<script setup lang="ts">
import { testLogin } from 'atomic'
</script>
