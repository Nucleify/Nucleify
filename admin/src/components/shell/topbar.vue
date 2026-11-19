<template>
  <header class="admin-topbar">
    <div class="admin-topbar__left">
      <button
        type="button"
        class="admin-control-btn admin-topbar__menu"
        aria-label="Menu"
        title="Menu"
        @click="emit('toggle-rail')"
      >
        <span class="admin-topbar__menu-icon" aria-hidden="true">
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
          >
            <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
          </svg>
        </span>
      </button>
      <div class="admin-topbar__identity">
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
        aria-label="Search"
        @click="emit('open-search')"
      >
        <span class="admin-topbar__search-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6">
            <circle cx="7" cy="7" r="4.25" />
            <path d="M10.5 10.5 13.5 13.5" stroke-linecap="round" />
          </svg>
        </span>
        <kbd class="admin-topbar__kbd">⌘K</kbd>
        <span class="admin-topbar__search-label">Search</span>
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
    accountTo?: string
    email?: string
  }>(),
  {
    crumbs: () => [],
    accountTo: '',
    email: '',
  }
)

const emit = defineEmits<{
  'toggle-rail': []
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

<style lang="scss">
.admin-topbar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1.5rem;
  border-bottom: 1px solid var(--admin-border);
  background: var(--admin-surface);
}
.admin-topbar__title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}
.admin-topbar__left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  flex: 1 1 auto;
}
.admin-topbar__identity {
  min-width: 0;
  flex: 1 1 auto;
}
.admin-topbar__menu {
  display: none;
  flex-shrink: 0;
  width: var(--admin-control-h);
  min-width: var(--admin-control-h);
  padding: 0;
  justify-content: center;
}
.admin-topbar__menu-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}
.admin-topbar__menu-icon svg {
  display: block;
}
.admin-topbar__actions {
  flex: 0 0 auto;
  flex-wrap: nowrap;
  gap: 0.5rem;
  align-items: center;
}
.admin-topbar__search-hint {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: var(--admin-control-h);
  min-height: var(--admin-control-h);
  padding: 0 1rem;
  border: 1px solid color-mix(in srgb, var(--admin-text) 35%, var(--admin-border));
  background: var(--admin-surface-2);
  color: var(--admin-text);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
}
.admin-topbar__search-icon {
  display: none;
  align-items: center;
  justify-content: center;
  line-height: 0;
}
.admin-topbar__search-icon svg {
  display: block;
}
.admin-topbar__search-hint:hover {
  border-color: var(--admin-text);
  background: color-mix(in srgb, var(--admin-surface-2) 70%, var(--admin-text) 8%);
}
.admin-topbar__kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1.35rem;
  padding: 0 0.35rem;
  border: 1px solid var(--admin-border);
  background: var(--admin-bg);
  color: var(--admin-muted);
  font-family: var(--admin-mono);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1;
}

@media (max-width: 960px) {
  .admin-topbar {
    gap: 0.5rem;
    padding: 0.65rem 0.85rem;
  }

  .admin-topbar__left {
    gap: 0.5rem;
  }

  .admin-topbar__menu {
    display: inline-flex;
  }

  .admin-topbar .admin-breadcrumbs {
    display: none;
  }

  .admin-topbar__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .admin-topbar__actions {
    gap: 0.35rem;
  }

  .admin-topbar__search-hint {
    width: var(--admin-control-h);
    min-width: var(--admin-control-h);
    padding: 0;
    justify-content: center;
    gap: 0;
  }

  .admin-topbar__search-icon {
    display: inline-flex;
  }

  .admin-topbar__search-hint .admin-topbar__kbd,
  .admin-topbar__search-label {
    display: none;
  }

  .admin-topbar__actions .admin-overflow__trigger--toolbar {
    width: var(--admin-control-h);
    min-width: var(--admin-control-h);
    padding: 0;
    gap: 0;
  }

  .admin-topbar__actions .admin-overflow__trigger-text {
    display: none;
  }
}
</style>
