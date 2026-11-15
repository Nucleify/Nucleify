<template>
  <aside class="admin-rail" aria-label="Admin navigation">
    <div class="admin-rail__brand">
      <span class="admin-rail__brand-name">Nucleify</span>
      <span class="admin-rail__brand-meta">Admin</span>
    </div>
    <nav class="admin-rail__nav">
      <NuxtLink
        :to="dashboardTo"
        class="admin-rail__link"
        :class="{ 'is-active': isActive(dashboardTo, true) }"
        :aria-current="isActive(dashboardTo, true) ? 'page' : undefined"
      >
        <span class="admin-rail__link-icon" aria-hidden="true" v-html="iconSvg('Dashboard')" />
        <span class="admin-rail__link-label">Dashboard</span>
      </NuxtLink>

      <div
        v-for="group in groups"
        :key="group.label"
        class="admin-rail__group"
      >
        <button
          type="button"
          class="admin-rail__group-label"
          :aria-expanded="!groupCollapsed[group.label]"
          @click="toggleGroup(group.label)"
        >
          <span class="admin-rail__group-label-text">{{ group.label }}</span>
          <span
            class="admin-rail__group-chevron"
            :class="{ 'is-collapsed': groupCollapsed[group.label] }"
            aria-hidden="true"
          />
        </button>
        <template v-if="!groupCollapsed[group.label]">
          <NuxtLink
            v-for="item in group.items"
            :key="item.to"
            :to="item.to"
            class="admin-rail__link"
            :class="{ 'is-active': isActive(item.to) }"
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            <span
              class="admin-rail__link-icon"
              aria-hidden="true"
              v-html="iconSvg(item.label)"
            />
            <span class="admin-rail__link-label">{{ item.label }}</span>
            <span
              v-if="item.badge"
              class="admin-rail__link-badge"
            >
              {{ item.badge }}
            </span>
          </NuxtLink>
        </template>
      </div>
    </nav>
    <div class="admin-rail__footer">
      <p class="admin-muted admin-rail__footer-email" style="margin: 0 0 0.75rem; font-size: 0.75rem">
        {{ email }}
      </p>
      <nui-button
        variant="outlined"
        label="Sign out"
        @click="emit('sign-out')"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
export type RailItem = {
  label: string
  to: string
  badge?: string | number
}
export type RailGroup = { label: string; items: RailItem[] }

export type AdminRailItem = RailItem
export type AdminRailGroup = RailGroup

const props = defineProps<{
  lang: string
  email: string
  groups: RailGroup[]
}>()

const emit = defineEmits<{
  'sign-out': []
}>()

const dashboardTo = computed(() => `/${props.lang}`)
const groupCollapsed = ref<Record<string, boolean>>({})

/** Compact 16×16 stroke icons (currentColor). */
const ICONS: Record<string, string> = {
  Dashboard:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="5" height="5"/><rect x="9" y="2" width="5" height="5"/><rect x="2" y="9" width="5" height="5"/><rect x="9" y="9" width="5" height="5"/></svg>',
  Pages:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 2.5h5.5L13 6v7.5H4z"/><path d="M9.5 2.5V6H13"/></svg>',
  Posts:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3.5h10M3 8h10M3 12.5h6"/></svg>',
  Media:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="3.5" width="11" height="9"/><circle cx="5.5" cy="6.5" r="1"/><path d="m6.5 10.5 2-2.5 2 1.5 2.5-3"/></svg>',
  Menus:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 4h10M3 8h10M3 12h10"/></svg>',
  Redirects:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8h8.5M8.5 4.5 12 8l-3.5 3.5"/></svg>',
  Comments:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3.5h10v7H7l-3 2v-2H3z"/></svg>',
  Contact:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="4" width="11" height="8"/><path d="m2.5 4.5 5.5 4 5.5-4"/></svg>',
  Users:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="5.5" r="2.2"/><path d="M3.5 13c.8-2.2 2.4-3.3 4.5-3.3s3.7 1.1 4.5 3.3"/></svg>',
  Roles:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="2"/><path d="M8 2.5v1.5M8 12v1.5M2.5 8H4M12 8h1.5M4.2 4.2l1.1 1.1M10.7 10.7l1.1 1.1M11.8 4.2l-1.1 1.1M5.3 10.7l-1.1 1.1"/></svg>',
  Header:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="3" width="11" height="10"/><path d="M2.5 6h11"/></svg>',
  Footer:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="3" width="11" height="10"/><path d="M2.5 10h11"/></svg>',
  Account:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="6" r="2.2"/><path d="M3.2 13.2c.9-2 2.6-3 4.8-3s3.9 1 4.8 3"/><path d="M11.5 4.5 13 6l-1.5 1.5"/></svg>',
}

const FALLBACK_ICON =
  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="5"/></svg>'

function iconSvg(label: string): string {
  return ICONS[label] || FALLBACK_ICON
}

onMounted(() => {
  if (!import.meta.client) return
  try {
    groupCollapsed.value = JSON.parse(
      localStorage.getItem('admin-rail-groups') || '{}'
    ) as Record<string, boolean>
  } catch {
    groupCollapsed.value = {}
  }
})

function toggleGroup(label: string) {
  groupCollapsed.value = {
    ...groupCollapsed.value,
    [label]: !groupCollapsed.value[label],
  }
  if (import.meta.client) {
    localStorage.setItem(
      'admin-rail-groups',
      JSON.stringify(groupCollapsed.value)
    )
  }
}

function isActive(to: string, exact = false): boolean {
  const route = useRoute()
  const path = route.path.replace(/\/$/, '') || '/'
  if (exact) return path === to
  return path === to || path.startsWith(`${to}/`)
}
</script>
