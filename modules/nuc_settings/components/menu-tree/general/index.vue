<template>
  <div class="general-menu-tree">
    <ad-heading :tag="4" text="General" >
      <nuc-navigation-back-button 
        v-if="route.hash.includes('#module-')"
        ad-type="main"
      />
    </ad-heading>
    <ad-tree :value="nodes" :expanded-keys="expandedKeys" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'

const route = useRoute()

const nodes = ref([
  {
    key: '0',
    label: 'My Profile',
    children: [
      {
        key: '0-0',
        label: 'Personal Info',
        data: '#my-profile-personal-info',
        type: 'url',
        class: 'disabled-item',
      },
      {
        key: '0-1',
        label: 'Password & Security',
        data: '#my-profile-password-security',
        type: 'url',
        class: 'disabled-item',
      },
      {
        key: '0-2',
        label: 'Notifications & Alerts',
        data: '#my-profile-notifications-alerts',
        type: 'url',
        class: 'disabled-item',
      },
    ],
  },
  {
    key: '1',
    label: 'Preferences',
    children: [
      {
        key: '1-0',
        label: 'Language & Region',
        data: '#preferences-language-region',
        type: 'url',
        class: 'disabled-item',
      },
      {
        key: '1-1',
        label: 'Entities',
        data: '#preferences-entities',
        type: 'url',
        class: 'disabled-item',
      },
      {
        key: '1-2',
        label: 'Theme',
        data: '#preferences-theme',
        type: 'url',
      },
    ],
  },
  {
    key: '2',
    label: 'Data & Export',
    children: [
      {
        key: '2-0',
        label: 'Data Import',
        data: '#data-import',
        type: 'url',
        class: 'disabled-item',
      },
      {
        key: '2-1',
        label: 'Data Export',
        data: '#data-export',
        type: 'url',
        class: 'disabled-item',
      },
      {
        key: '2-2',
        label: 'Convert Data',
        data: '#convert-data',
        type: 'url',
        class: 'disabled-item',
      },
    ],
  },
])

const expandedKeys = ref({
  0: true,
  1: true,
  2: true,
})
</script>
