import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { AdminRailGroup } from '../components/shell/rail.vue'
import { apiGet } from './use_api'
import { useAuth } from './use_auth'

export interface Breadcrumb {
  label: string
  to?: string
}
export type AdminBreadcrumb = Breadcrumb

const SHORTCUTS: Record<string, string> = {
  p: '/collections/pages',
  m: '/collections/media',
  d: '',
  s: '/settings',
}

const COLLECTION_LABELS: Record<string, string> = {
  pages: 'Pages',
  media: 'Media',
  menus: 'Menus',
  contact: 'Contact',
  redirects: 'Redirects',
  users: 'Users',
}

export function useShell() {
  const route = useRoute()
  const auth = useAuth()

  const lang = computed(() => auth.langFromPath(route.path))
  const email = computed(() => auth.user.value?.email || 'Signed in')
  const railCollapsed = ref(false)
  const railOpen = ref(false)
  const cmdkOpen = ref(false)
  const badges = ref({ drafts: 0, comments: 0, contact: 0 })

  let gPending = false
  let gTimer: ReturnType<typeof setTimeout> | null = null

  function onKeydown(event: KeyboardEvent) {
    const meta = event.metaKey || event.ctrlKey
    if (meta && event.key.toLowerCase() === 'k') {
      event.preventDefault()
      cmdkOpen.value = true
      return
    }
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      return
    }
    if (event.key === 'g' && !meta && !event.altKey) {
      gPending = true
      if (gTimer) clearTimeout(gTimer)
      gTimer = setTimeout(() => {
        gPending = false
      }, 800)
      return
    }
    if (!gPending) return
    gPending = false
    const target = SHORTCUTS[event.key]
    if (target !== undefined) void navigateTo(`/${lang.value}${target}`)
  }

  onMounted(async () => {
    if (import.meta.client) {
      railCollapsed.value = localStorage.getItem('admin-rail-collapsed') === '1'
      window.addEventListener('keydown', onKeydown)
    }

    const [dashRes, commRes] = await Promise.allSettled([
      apiGet<{ drafts?: unknown[]; contactNew?: unknown[] }>(
        '/api/admin/dashboard'
      ),
      apiGet<unknown[]>('/api/admin/comments?status=pending'),
    ])

    if (dashRes.status === 'fulfilled' && dashRes.value) {
      badges.value.drafts = dashRes.value.drafts?.length ?? 0
      badges.value.contact = dashRes.value.contactNew?.length ?? 0
    }
    if (commRes.status === 'fulfilled' && commRes.value) {
      badges.value.comments = commRes.value.length ?? 0
    }
  })

  onBeforeUnmount(() => {
    if (import.meta.client) {
      window.removeEventListener('keydown', onKeydown)
    }
  })

  function toggleCollapse() {
    railCollapsed.value = !railCollapsed.value
    if (import.meta.client) {
      localStorage.setItem(
        'admin-rail-collapsed',
        railCollapsed.value ? '1' : '0'
      )
    }
  }

  const navGroups = computed((): AdminRailGroup[] => {
    const base = `/${lang.value}`
    return [
      {
        label: 'Collections',
        items: [
          {
            label: 'Pages',
            to: `${base}/collections/pages`,
            badge: badges.value.drafts || undefined,
          },
          { label: 'Media', to: `${base}/collections/media` },
          { label: 'Menus', to: `${base}/collections/menus` },
          { label: 'Redirects', to: `${base}/collections/redirects` },
          {
            label: 'Contact',
            to: `${base}/collections/contact`,
            badge: badges.value.contact || undefined,
          },
          { label: 'Activity', to: `${base}/activity` },
          { label: 'Users', to: `${base}/collections/users` },
          { label: 'Roles', to: `${base}/roles` },
        ],
      },
      {
        label: 'Blog',
        items: [
          { label: 'Posts', to: `${base}/collections/posts` },
          {
            label: 'Comments',
            to: `${base}/collections/comments`,
            badge: badges.value.comments || undefined,
          },
        ],
      },
      {
        label: 'Globals',
        items: [
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
    for (const group of navGroups.value ?? []) {
      const item = group.items.find((n) => n.to === path)
      if (item) return item.label
    }
    if (path.includes('/collections/pages/')) return 'Page'
    if (path.includes('/collections/posts/')) return 'Post'
    if (path.includes('/collections/users/') || path.includes('/users/'))
      return 'User'
    if (path.includes('/globals/')) {
      const slug = path.split('/globals/')[1]?.split('/')[0]
      if (slug === 'header') return 'Header'
      if (slug === 'footer') return 'Footer'
    }
    return 'Admin'
  })

  const crumbs = computed((): AdminBreadcrumb[] => {
    const path = route.path.replace(/\/$/, '') || '/'
    const base = `/${lang.value}`
    const parts: AdminBreadcrumb[] = [{ label: 'Admin', to: base }]

    if (
      path.includes('/collections/posts') ||
      path.includes('/collections/comments')
    ) {
      const isPost = path.includes('/posts')
      parts.push(
        { label: 'Blog' },
        {
          label: isPost ? 'Posts' : 'Comments',
          to: `${base}/collections/${isPost ? 'posts' : 'comments'}`,
        }
      )
    } else if (path.includes('/collections/')) {
      parts.push({ label: 'Collections' })
      const col = path.match(/\/collections\/([^/]+)/)?.[1]
      if (col && COLLECTION_LABELS[col]) {
        parts.push({
          label: COLLECTION_LABELS[col],
          to: `${base}/collections/${col}`,
        })
      }
    } else if (path.includes('/globals/')) {
      parts.push({ label: 'Globals' }, { label: title.value })
    } else if (path.includes('/activity')) {
      parts.push({ label: 'Activity', to: `${base}/activity` })
    } else if (path.includes('/roles')) {
      parts.push({ label: 'Roles', to: `${base}/roles` })
    } else if (path.includes('/settings')) {
      parts.push({ label: 'Account', to: `${base}/settings` })
    }
    return parts
  })

  watch(
    () => route.path,
    () => {
      railOpen.value = false
    }
  )

  async function onSignOut() {
    await auth.signOut()
    await navigateTo(auth.loginPath(lang.value))
  }

  return {
    lang,
    email,
    railCollapsed,
    railOpen,
    cmdkOpen,
    navGroups,
    title,
    crumbs,
    toggleCollapse,
    onSignOut,
  }
}

export const useAdminShell = useShell
