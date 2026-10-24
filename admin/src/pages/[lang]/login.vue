<template>
  <div class="admin-login">
    <div class="admin-login__card">
      <h1 class="admin-login__brand">Nucleify</h1>
      <p class="admin-login__sub">Sign in to the admin panel</p>
      <form
        class="admin-form"
        @submit.prevent="onSubmit"
        @keydown.enter.prevent="onSubmit"
      >
        <FieldText
          v-model="email"
          label="Email"
          type="email"
          autocomplete="username"
          placeholder="you@example.com"
        />
        <FieldText
          v-model="password"
          label="Password"
          type="password"
          autocomplete="current-password"
          placeholder="••••••••"
        />
        <FieldCheckbox
          label="Remember user"
          :checked="remember"
          @update:checked="remember = $event"
        />
        <p v-if="error" class="admin-form__error">{{ error }}</p>
        <nui-button
          type="submit"
          variant="filled"
          fluid
          :label="loading ? 'Signing in…' : 'Sign in'"
          :disabled.prop="loading"
          @click.prevent="onSubmit"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import FieldCheckbox from '../../components/fields/FieldCheckbox.vue'
import FieldText from '../../components/fields/FieldText.vue'

definePageMeta({ layout: 'blank' })

useHead({ title: 'Sign in' })

const REMEMBER_EMAIL_KEY = 'nucleify-admin-remember-email'

const route = useRoute()
const auth = useAdminAuth()

const email = ref('')
const password = ref('')
const remember = ref(false)
const error = ref('')
const loading = ref(false)

const lang = computed(() => {
  const param = route.params.lang
  return typeof param === 'string' ? param : auth.DEFAULT_LANG
})

onMounted(() => {
  if (typeof localStorage === 'undefined') return
  const saved = localStorage.getItem(REMEMBER_EMAIL_KEY)
  if (!saved) return
  email.value = saved
  remember.value = true
})

async function onSubmit() {
  if (loading.value) return
  error.value = ''
  loading.value = true
  try {
    await auth.signIn(email.value, password.value)
    if (typeof localStorage !== 'undefined') {
      if (remember.value) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, email.value.trim())
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY)
      }
    }
    await navigateTo(auth.homePath(lang.value))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Sign-in failed'
  } finally {
    loading.value = false
  }
}
</script>
