<template>
  <header class="admin-topbar">
    <div class="admin-topbar__left">
      <button
        type="button"
        class="admin-control-btn admin-topbar__menu"
        @click="emit('toggle-rail')"
      >
        Menu
      </button>
      <button
        type="button"
        class="admin-control-btn admin-topbar__collapse"
        @click="emit('collapse-rail')"
      >
        {{ collapsed ? 'Expand' : 'Collapse' }}
      </button>
      <div>
        <nav v-if="crumbs.length" class="admin-breadcrumbs" aria-label="Breadcrumb">
          <template v-for="(crumb, i) in crumbs" :key="crumb.to || crumb.label">
            <NuxtLink v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</NuxtLink>
            <span v-else>{{ crumb.label }}</span>
            <span v-if="i < crumbs.length - 1" class="admin-muted"> / </span>
          </template>
        </nav>
        <h1 class="admin-topbar__title">{{ title }}</h1>
      </div>
    </div>
    <div class="admin-actions admin-topbar__actions">
      <button
        type="button"
        class="admin-topbar__search-hint"
        @click="emit('open-search')"
      >
        <kbd class="admin-topbar__kbd">⌘K</kbd>
        <span>Search</span>
      </button>
      <AdminOverflowMenu
        :actions="userActions"
        label="Account menu"
        text="Account"
        icon="more"
      />
      <slot />
    </div>
  </header>
</template>

<script setup lang="ts">
import type { AdminAction } from '../../types/actions'

const props = withDefaults(
  defineProps<{
    title: string
    crumbs?: { label: string; to?: string }[]
    collapsed?: boolean
    accountTo?: string
    email?: string
  }>(),
  {
    crumbs: () => [],
    collapsed: false,
    accountTo: '',
    email: '',
  }
)

const emit = defineEmits<{
  'toggle-rail': []
  'collapse-rail': []
  'open-search': []
  'sign-out': []
}>()

const userActions = computed((): AdminAction[] => {
  const actions: AdminAction[] = []
  if (props.accountTo) {
    actions.push({
      id: 'account',
      label: 'Account settings',
      onClick: () => navigateTo(props.accountTo),
    })
  }
  actions.push({
    id: 'sign-out',
    label: 'Sign out',
    danger: true,
    onClick: () => emit('sign-out'),
  })
  return actions
})
</script>
