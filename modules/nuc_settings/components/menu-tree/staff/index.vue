<template>
  <div class="staff-menu-tree">
    <ad-heading :tag="4" text="Staff" />
    <ad-tree :value="nodes" :expanded-keys="expandedKeys" />
  </div>
</template>

<script setup>
const nodes = ref([
  {
    key: '0',
    label: 'Security',
    children: [
      {
        key: '0-0',
        label: 'Users & Access',
        data: '#users',
        type: 'url',
        class: 'disabled-item',
      },
      {
        key: '0-1',
        label: 'Roles & Permissions',
        data: '#roles-permissions',
        type: 'url',
        class: 'disabled-item',
      },
    ],
  },
  {
    key: '1',
    label: 'Modules',
    type: 'url',
    data: '#modules',
  },
])

const expandedKeys = ref({
  0: true,
  1: true,
})
</script>
