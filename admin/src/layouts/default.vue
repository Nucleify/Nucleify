<template>
  <div
    class="admin-shell"
    :class="{
      'is-rail-collapsed': railCollapsed,
      'is-rail-open': railOpen,
    }"
  >
    <div
      v-if="railOpen"
      class="admin-rail-backdrop"
      @click="railOpen = false"
    />
    <AdminRail
      :lang="lang"
      :email="email"
      :groups="navGroups"
      @sign-out="onSignOut"
    />
    <div class="admin-main">
      <AdminTopbar
        :title="title"
        :crumbs="crumbs"
        :collapsed="railCollapsed"
        :account-to="`/${lang}/settings`"
        :email="email"
        @toggle-rail="railOpen = !railOpen"
        @collapse-rail="toggleCollapse"
        @open-search="cmdkOpen = true"
        @sign-out="onSignOut"
      />
      <main class="admin-content">
        <slot />
      </main>
    </div>
    <AdminCommandPalette
      :open="cmdkOpen"
      :lang="lang"
      @close="cmdkOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useShell } from '../composables/use_shell'

const {
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
} = useShell()
</script>
