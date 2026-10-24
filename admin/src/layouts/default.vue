<template>
  <div class="admin-shell">
    <aside class="admin-rail">
      <div class="admin-rail__brand">
        <span class="admin-rail__brand-name">Nucleify</span>
        <span class="admin-rail__brand-meta">Admin</span>
      </div>
      <nav class="admin-rail__nav" aria-label="Admin">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="admin-rail__link"
          :class="{ 'is-active': isActive(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div class="admin-rail__footer">
        <p class="admin-muted" style="margin: 0 0 0.75rem; font-size: 0.75rem">
          {{ email }}
        </p>
        <nui-button
          variant="outlined"
          label="Sign out"
          @click="onSignOut"
        />
      </div>
    </aside>
    <div class="admin-main">
      <header class="admin-topbar">
        <h1 class="admin-topbar__title">{{ title }}</h1>
      </header>
      <main class="admin-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const auth = useAdminAuth()

const lang = computed(() => auth.langFromPath(route.path))
const email = computed(() => auth.user.value?.email || 'Signed in')

const nav = computed(() => {
  const base = `/${lang.value}`
  return [
    { label: 'Dashboard', to: base },
    { label: 'Roles', to: `${base}/roles` },
  ]
})

const title = computed(() => {
  const path = route.path.replace(/\/$/, '') || '/'
  const item = nav.value.find((n) => n.to === path)
  if (item) return item.label
  if (path.includes('/users/')) return 'User'
  if (path.includes('/cms/')) return 'CMS entry'
  return 'Admin'
})

function isActive(to: string): boolean {
  const path = route.path.replace(/\/$/, '') || '/'
  if (to === `/${lang.value}`) return path === to
  return path === to || path.startsWith(`${to}/`)
}

async function onSignOut() {
  await auth.signOut()
  await navigateTo(auth.loginPath(lang.value))
}
</script>
