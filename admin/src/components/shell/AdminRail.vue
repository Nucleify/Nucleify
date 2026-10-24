<template>
  <aside class="admin-rail">
    <div class="admin-rail__brand">
      <span class="admin-rail__brand-name">Nucleify</span>
      <span class="admin-rail__brand-meta">Admin</span>
    </div>
    <nav class="admin-rail__nav" aria-label="Admin">
      <NuxtLink
        :to="dashboardTo"
        class="admin-rail__link"
        :class="{ 'is-active': isActive(dashboardTo, true) }"
      >
        Dashboard
      </NuxtLink>

      <div
        v-for="group in groups"
        :key="group.label"
        class="admin-rail__group"
      >
        <p class="admin-rail__group-label">{{ group.label }}</p>
        <NuxtLink
          v-for="item in group.items"
          :key="item.to"
          :to="item.to"
          class="admin-rail__link"
          :class="{ 'is-active': isActive(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </nav>
    <div class="admin-rail__footer">
      <p class="admin-muted" style="margin: 0 0 0.75rem; font-size: 0.75rem">
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
export type AdminRailItem = { label: string; to: string }
export type AdminRailGroup = { label: string; items: AdminRailItem[] }

const props = defineProps<{
  lang: string
  email: string
  groups: AdminRailGroup[]
}>()

const emit = defineEmits<{
  'sign-out': []
}>()

const dashboardTo = computed(() => `/${props.lang}`)

function isActive(to: string, exact = false): boolean {
  const route = useRoute()
  const path = route.path.replace(/\/$/, '') || '/'
  if (exact) return path === to
  return path === to || path.startsWith(`${to}/`)
}
</script>
