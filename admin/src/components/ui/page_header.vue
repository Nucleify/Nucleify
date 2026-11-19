<template>
  <div class="admin-page-header">
    <div>
      <nav v-if="crumbs.length" class="admin-breadcrumbs" aria-label="Breadcrumb">
        <template v-for="(crumb, i) in crumbs" :key="crumb.to || crumb.label">
          <NuxtLink v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</NuxtLink>
          <span v-else>{{ crumb.label }}</span>
          <span v-if="i < crumbs.length - 1" class="admin-muted"> / </span>
        </template>
      </nav>
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
    <AdminActionBar
      :primary="primary"
      :secondary="secondary"
      :more="more"
    >
      <slot />
    </AdminActionBar>
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '../../types/admin_actions'

withDefaults(
  defineProps<{
    title: string
    description?: string
    crumbs?: { label: string; to?: string }[]
    primary?: AdminAction[]
    secondary?: AdminAction[]
    more?: AdminAction[]
  }>(),
  {
    description: '',
    crumbs: () => [],
    primary: () => [],
    secondary: () => [],
    more: () => [],
  }
)
</script>

<style lang="scss">
@media (max-width: 768px) {
  .admin-page-header {
    flex-direction: column;
  }
}

.admin-page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}
.admin-page-header h1 {
  margin: 0 0 0.25rem;
  font-size: 1.35rem;
  font-weight: 600;
}
.admin-page-header p {
  margin: 0;
  color: var(--admin-muted);
  font-size: 0.875rem;
}
.admin-breadcrumbs {
  margin: 0 0 0.35rem;
  font-size: 0.75rem;
  color: var(--admin-muted);
}
.admin-breadcrumbs a:hover {
  color: var(--admin-text);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
</style>
