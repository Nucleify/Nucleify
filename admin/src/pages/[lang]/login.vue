<template>
  <div class="admin-login">
    <div class="admin-login__card">
      <h1 class="admin-login__brand">Nucleify</h1>
      <p class="admin-login__sub">Sign in to the admin panel</p>
      <form class="admin-form" @submit.prevent="onSubmit">
        <FieldText
          ref="emailInput"
          label="Email"
          type="email"
          autocomplete="username"
          placeholder="you@example.com"
        />
        <FieldText
          ref="passwordInput"
          label="Password"
          type="password"
          autocomplete="current-password"
          placeholder="••••••••"
        />
        <p v-if="error" class="admin-form__error">{{ error }}</p>
        <nui-button
          type="submit"
          variant="filled"
          :label="loading ? 'Signing in…' : 'Sign in'"
          :disabled="loading"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import FieldText from '../../components/fields/FieldText.vue'

definePageMeta({ layout: 'blank' })

useHead({ title: 'Sign in' })

type FieldHost = { value: string }

const route = useRoute()
const auth = useAdminAuth()

const emailInput = ref<FieldHost | null>(null)
const passwordInput = ref<FieldHost | null>(null)
const error = ref('')
const loading = ref(false)

const lang = computed(() => {
  const param = route.params.lang
  return typeof param === 'string' ? param : auth.DEFAULT_LANG
})

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await auth.signIn(emailInput.value?.value ?? '', passwordInput.value?.value ?? '')
    await navigateTo(auth.homePath(lang.value))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Sign-in failed'
  } finally {
    loading.value = false
  }
}
</script>
