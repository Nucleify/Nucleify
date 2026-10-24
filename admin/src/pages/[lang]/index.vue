<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>Dashboard</h1>
        <p>Admin backoffice — Collections and Globals.</p>
      </div>
    </div>
    <div class="admin-panel" style="padding: 1.25rem 1.5rem">
      <p style="margin: 0 0 0.5rem">
        Signed in as
        <strong>{{ auth.user.value?.email || '—' }}</strong>
      </p>
      <p class="admin-muted" style="margin: 0">
        Use the left rail: Collections (Pages, Media, Redirects, Users, Roles) and Globals.

      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Dashboard' })
const auth = useAdminAuth()
</script>
