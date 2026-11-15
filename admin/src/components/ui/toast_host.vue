<template>
  <div class="admin-toast-host" aria-live="polite">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="admin-toast"
      :class="`admin-toast--${toast.tone}`"
      @click="dismiss(toast.id)"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminToast } from '../../composables/use_admin_toast'

const { toasts, dismiss } = useAdminToast()
</script>
