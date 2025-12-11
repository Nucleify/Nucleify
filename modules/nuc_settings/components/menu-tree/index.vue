<template>
  <div class="menu-tree-container">
    <nuc-general-menu-tree />
    <nuc-staff-menu-tree v-if="isStaff" />
  </div>
</template>

<script setup lang="ts">
import { checkIsStaff, sessionStorageGetItem } from 'atomic'

const isStaff = checkIsStaff(sessionStorageGetItem('user_role') ?? '')
</script>