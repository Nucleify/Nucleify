<template>
  <aside class="admin-document-sidebar">
    <h2 class="admin-document-sidebar__title">Meta</h2>
    <slot />
  </aside>
</template>

<style lang="scss">
.admin-document-sidebar {
  position: sticky;
  top: 1rem;
  padding: 1rem;
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
}
.admin-document-sidebar__title {
  margin: 0 0 1rem;
  font-family: var(--admin-mono);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--admin-muted);
}
</style>
