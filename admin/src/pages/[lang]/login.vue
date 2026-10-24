<template>
  <div class="admin-login">
    <div class="admin-login__card">
      <h1 class="admin-login__brand">Nucleify</h1>
      <p class="admin-login__sub">Sign in to the admin panel</p>
      <form class="admin-form" @submit.prevent="onSubmit">
        <div class="admin-form__field">
          <label class="admin-form__label" for="admin-email">Email</label>
          <nui-input-text
            id="admin-email"
            ref="emailInput"
            type="email"
            name="email"
            fluid
            autocomplete="username"
            placeholder="you@example.com"
            @input="onEmailInput"
          />
        </div>
        <div class="admin-form__field">
          <label class="admin-form__label" for="admin-password">Password</label>
          <nui-input-text
            id="admin-password"
            ref="passwordInput"
            type="password"
            name="password"
            fluid
            autocomplete="current-password"
            placeholder="••••••••"
            @input="onPasswordInput"
          />
        </div>
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
import { nuiHostValue, nuiValueFromEvent } from '../../utils/nui_host'

definePageMeta({ layout: 'blank' })

useHead({ title: 'Sign in' })

const route = useRoute()
const auth = useAdminAuth()

const emailInput = ref<{ value?: unknown } | null>(null)
const passwordInput = ref<{ value?: unknown } | null>(null)
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const lang = computed(() => {
  const param = route.params.lang
  return typeof param === 'string' ? param : auth.DEFAULT_LANG
})

function onEmailInput(event: Event): void {
  const value = nuiValueFromEvent(event)
  if (value != null) email.value = value
}

function onPasswordInput(event: Event): void {
  const value = nuiValueFromEvent(event)
  if (value != null) password.value = value
}

async function onSubmit() {
  error.value = ''
  loading.value = true
  const liveEmail = nuiHostValue(emailInput.value) || email.value
  const livePassword = nuiHostValue(passwordInput.value) || password.value
  try {
    await auth.signIn(liveEmail, livePassword)
    await navigateTo(auth.homePath(lang.value))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Sign-in failed'
  } finally {
    loading.value = false
  }
}
</script>
