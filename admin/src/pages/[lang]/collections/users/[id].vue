<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>{{ user?.email || 'User' }}</h1>
        <p class="admin-muted" style="font-family: var(--admin-mono); font-size: 0.75rem">
          {{ id }}
        </p>
      </div>
      <NuxtLink :to="`/${lang}/collections/users`" class="admin-muted">← Users</NuxtLink>
    </div>

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>

    <form v-else-if="user" class="admin-form" style="max-width: 32rem" @submit.prevent="onSave">
      <FieldText
        ref="nameInput"
        label="Display name"
        :value="user.display_name"
      />
      <FieldText
        ref="emailInput"
        label="Email (display)"
        type="email"
        :value="user.email || ''"
      />
      <FieldText
        ref="localeInput"
        label="Locale"
        :value="user.locale || 'en'"
      />
      <FieldSelect
        v-model="status"
        label="Status"
        :options="statusOptions"
      />
      <FieldShell label="Roles">
        <FieldCheckbox
          v-for="role in availableRoles"
          :key="role.id"
          :label="`${role.name} (${role.slug})`"
          :checked="selectedRoles.includes(role.slug)"
          @update:checked="toggleRole(role.slug, $event)"
        />
      </FieldShell>
      <nui-button type="submit" variant="filled" :label="saving ? 'Saving…' : 'Save'" />
    </form>
  </div>
</template>

<script setup lang="ts">
import FieldCheckbox from '../../../../components/fields/FieldCheckbox.vue'
import FieldSelect from '../../../../components/fields/FieldSelect.vue'
import FieldShell from '../../../../components/fields/FieldShell.vue'
import FieldText from '../../../../components/fields/FieldText.vue'
import { adminApiGet, adminApiSend } from '../../../../composables/use_admin_api'

useHead({ title: 'User' })

type RoleOpt = { id: string; slug: string; name: string }
type UserDetail = {
  id: string
  email: string | null
  display_name: string
  locale: string
  status: string
  role_slugs: string[]
  available_roles: RoleOpt[]
}

type FieldHost = { value: string }

const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))
const id = computed(() => String(route.params.id || ''))

const user = ref<UserDetail | null>(null)
const availableRoles = ref<RoleOpt[]>([])
const selectedRoles = ref<string[]>([])
const status = ref('active')
const loading = ref(true)
const saving = ref(false)
const error = ref('')

const nameInput = ref<FieldHost | null>(null)
const emailInput = ref<FieldHost | null>(null)
const localeInput = ref<FieldHost | null>(null)

const statusOptions = [
  { label: 'active', value: 'active' },
  { label: 'disabled', value: 'disabled' },
]

function toggleRole(slug: string, checked: boolean) {
  const set = new Set(selectedRoles.value)
  if (checked) set.add(slug)
  else set.delete(slug)
  selectedRoles.value = [...set]
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const data = await adminApiGet<UserDetail>(`/api/admin/users/${id.value}`)
    user.value = data
    availableRoles.value = data.available_roles ?? []
    selectedRoles.value = [...(data.role_slugs ?? [])]
    status.value = data.status || 'active'
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load user'
  } finally {
    loading.value = false
  }
}

async function onSave() {
  saving.value = true
  error.value = ''
  try {
    await adminApiSend(`/api/admin/users/${id.value}`, 'PATCH', {
      display_name: nameInput.value?.value || user.value?.display_name,
      email: emailInput.value?.value || user.value?.email,
      locale: localeInput.value?.value || user.value?.locale || 'en',
      status: status.value,
      role_slugs: selectedRoles.value,
    })
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Save failed'
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  void load()
})
</script>
