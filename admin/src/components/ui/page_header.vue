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
