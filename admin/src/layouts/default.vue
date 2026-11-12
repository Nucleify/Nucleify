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
import { AdminRail } from '@admin'
import { AdminTopbar } from '@admin'
import type { AdminRailGroup } from '@admin'

const route = useRoute()
const auth = useAdminAuth()

const lang = computed(() => auth.langFromPath(route.path))
const email = computed(() => auth.user.value?.email || 'Signed in')

const features = ref({
  featureBlog: true,
  featureComments: true,
  featureContactInbox: true,
  featureRedirects: true,
})

onMounted(async () => {
  try {
    const { adminApiGet } = await import('@admin')
    const row = await adminApiGet<{ data?: Record<string, unknown> }>(
      '/api/admin/globals/settings'
    )
    const data = row?.data && typeof row.data === 'object' ? row.data : {}
    features.value = {
      featureBlog: data.featureBlog !== false,
      featureComments: data.featureComments !== false,
      featureContactInbox: data.featureContactInbox !== false,
      featureRedirects: data.featureRedirects !== false,
    }
  } catch {
    // Keep defaults when settings are missing.
  }
})

const navGroups = computed((): AdminRailGroup[] => {
  const base = `/${lang.value}`
  const collectionItems = [
    { label: 'Pages', to: `${base}/collections/pages` },
  ]
  if (features.value.featureBlog) {
    collectionItems.push({ label: 'Posts', to: `${base}/collections/posts` })
  }
  collectionItems.push({ label: 'Media', to: `${base}/collections/media` })
  collectionItems.push({ label: 'Menus', to: `${base}/collections/menus` })
  if (features.value.featureRedirects) {
    collectionItems.push({
      label: 'Redirects',
      to: `${base}/collections/redirects`,
    })
  }
  if (features.value.featureComments) {
    collectionItems.push({
      label: 'Comments',
      to: `${base}/collections/comments`,
    })
  }
  if (features.value.featureContactInbox) {
    collectionItems.push({
      label: 'Contact',
      to: `${base}/collections/contact`,
    })
  }
  collectionItems.push(
    { label: 'Users', to: `${base}/collections/users` },
    { label: 'Roles', to: `${base}/roles` }
  )
  return [
    { label: 'Collections', items: collectionItems },
    {
      label: 'Globals',
      items: [
        { label: 'Site settings', to: `${base}/globals/settings` },
        { label: 'Header', to: `${base}/globals/header` },
        { label: 'Footer', to: `${base}/globals/footer` },
        { label: 'Account', to: `${base}/settings` },
      ],
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
  if (path.includes('/collections/pages/')) return 'Page'
  if (path.includes('/collections/users/')) return 'User'
  if (path.includes('/globals/')) {
    const slug = path.split('/globals/')[1]?.split('/')[0]
    if (slug === 'settings') return 'Site settings'
    if (slug === 'header') return 'Header'
    if (slug === 'footer') return 'Footer'
  }
  if (path.includes('/users/')) return 'User'
  return 'Admin'
})

async function onSignOut() {
  await auth.signOut()
  await navigateTo(auth.loginPath(lang.value))
}
</script>
