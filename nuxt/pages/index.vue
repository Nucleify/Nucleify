<template>
  <div />
</template>

<script setup lang="ts">
const locale = useCookie('nuc_locale')

navigateTo(`/${locale.value || 'en'}/home`, { redirectCode: 302 })
</script>
