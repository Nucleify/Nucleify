<template>
  <div class="admin-shell">
    <AdminRail
      :lang="lang"
      :email="email"
      :groups="navGroups"
      @sign-out="onSignOut"
    />
    <div class="admin-main">
      <AdminTopbar :title="title" />
      <main class="admin-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminRail from '../components/shell/AdminRail.vue'
import AdminTopbar from '../components/shell/AdminTopbar.vue'
import type { AdminRailGroup } from '../components/shell/AdminRail.vue'

const route = useRoute()
const auth = useAdminAuth()

const lang = computed(() => auth.langFromPath(route.path))
const email = computed(() => auth.user.value?.email || 'Signed in')

const navGroups = computed((): AdminRailGroup[] => {
  const base = `/${lang.value}`
  return [
    {
      label: 'Collections',
      items: [
        { label: 'Users', to: `${base}/users` },
        { label: 'Roles', to: `${base}/roles` },
        { label: 'CMS', to: `${base}/cms` },
      ],
    },
    {
      label: 'Globals',
      items: [{ label: 'Settings', to: `${base}/settings` }],
    },
  ]
})

const title = computed(() => {
  const path = route.path.replace(/\/$/, '') || '/'
  const base = `/${lang.value}`
  if (path === base) return 'Dashboard'
  for (const group of navGroups.value) {
    const item = group.items.find((n) => n.to === path)
    if (item) return item.label
  }
  if (path.includes('/users/')) return 'User'
  if (path.includes('/cms/')) return 'CMS entry'
  return 'Admin'
})

async function onSignOut() {
  await auth.signOut()
  await navigateTo(auth.loginPath(lang.value))
}
</script>
