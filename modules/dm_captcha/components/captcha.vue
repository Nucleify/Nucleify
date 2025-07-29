<template>
  <NuxtTurnstile v-model="token" />
</template>

<script setup lang="ts">
import { validateCaptcha } from 'atomic'

const emit = defineEmits(['validateCaptcha'])

const token = ref('')

watch(token, async (newToken: string) => {
  if (newToken) {
    const response = await validateCaptcha(newToken)
    emit('validateCaptcha', response.success)
  } else {
    emit('validateCaptcha', false)
  }
})
</script>