<template>
  <div v-if="error.statusCode === 404" id="error-404">
    <nuc-error-404-page />
  </div>
  <div v-else class="error-default">
    <div class="error-default-content">
      <h1>{{ error.statusCode || 'Error' }}</h1>
      <p>{{ error.statusMessage || error.message || 'An error occurred' }}</p>
      <button @click="handleError" class="error-default-button">
        Go Back
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'nuxt/app'

const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const router = useRouter()

function handleError(): void {
  if (import.meta.client && window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style lang="scss">
#error-404 {
  min-height: 100vh;
  width: 100%;
}

.error-default {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  &-content {
    text-align: center;
    color: white;

    h1 {
      font-size: 4rem;
      font-weight: 900;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.8;
    }
  }

  &-button {
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>

