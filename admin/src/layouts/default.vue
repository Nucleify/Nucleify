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
    <button
      type="button"
      class="admin-rail-edge"
      :aria-label="railCollapsed ? 'Show sidebar' : 'Hide sidebar'"
      :title="railCollapsed ? 'Show sidebar' : 'Hide sidebar'"
      :aria-expanded="!railCollapsed"
      @click="toggleCollapse"
    >
      <span class="admin-rail-edge__icon" aria-hidden="true">
        <svg
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            v-if="railCollapsed"
            d="M6 3.5 10.5 8 6 12.5"
          />
          <path v-else d="M10 3.5 5.5 8 10 12.5" />
        </svg>
      </span>
    </button>
    <div class="admin-main">
      <AdminTopbar
        :title="title"
        :crumbs="crumbs"
        :account-to="`/${lang}/settings`"
        :email="email"
        @toggle-rail="railOpen = !railOpen"
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

<style lang="scss">
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: var(--admin-bg);
}
.admin-shell,
.admin-shell *,
.admin-login,
.admin-login * {
  border-radius: var(--admin-radius) !important;
}
.admin-shell nui-input-text,
.admin-shell nui-select {
  min-height: var(--admin-control-h);
  height: var(--admin-control-h);
}
/* Form fields: host must grow with shadow control (36px shell height
   was clipping nui inputs onto the next label). Beat .admin-shell host height. */
.admin-shell .admin-form__field nui-input-text,
.admin-shell .admin-form__field nui-select,
.admin-shell .admin-form__field nui-textarea,
.admin-form__field nui-input-text,
.admin-form__field nui-select,
.admin-form__field nui-textarea {
  height: auto;
  min-height: var(--admin-control-h);
  overflow: visible;
}
@media (min-width: 961px) {
  .admin-shell.is-rail-collapsed {
    --admin-rail-width: 0px;
  }

  .admin-shell.is-rail-collapsed .admin-rail {
    width: 0;
    padding: 0;
    border-right-color: transparent;
    overflow: hidden;
    pointer-events: none;
  }

  .admin-shell.is-rail-collapsed .admin-rail-edge {
    left: 0;
    transform: translate(0, -50%);
    border-left: 0;
  }
}
@media (max-width: 960px) {
  .admin-rail-edge {
    display: none;
  }

  .admin-rail {
    transform: translateX(-105%);
    transition: transform 0.18s ease;
  }

  .admin-shell.is-rail-open .admin-rail {
    transform: translateX(0);
  }

  .admin-rail-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 19;
    background: rgba(0, 0, 0, 0.45);
  }

  .admin-main {
    margin-left: 0;
  }

  .admin-content {
    padding: 1.25rem 1.25rem 2rem;
  }
}
.admin-main {
  flex: 1;
  min-width: 0;
  margin-left: var(--admin-rail-width);
  display: flex;
  flex-direction: column;
  transition: margin-left 0.18s ease;
}
.admin-content {
  flex: 1;
  padding: 1.75rem 2rem 2.25rem;
}
.admin-rail-edge {
  position: fixed;
  top: 50%;
  left: var(--admin-rail-width);
  z-index: 21;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 2.5rem;
  padding: 0;
  border: 1px solid var(--admin-border);
  background: var(--admin-surface);
  color: var(--admin-muted);
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.admin-rail-edge:hover {
  color: var(--admin-text);
  border-color: var(--admin-text);
  background: var(--admin-surface-2);
}
.admin-rail-edge__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}
.admin-rail-edge__icon svg {
  display: block;
}
.admin-rail-backdrop {
  display: none;
}
</style>
