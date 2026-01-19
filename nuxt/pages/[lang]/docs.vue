<template>
  <div id="documentation">
    <nuc-documentation-page />
  </div>
</template>

<script setup lang="ts">
import { isValidDocLang } from 'atomic'

definePageMeta({
  layout: 'documentation',
  validate: (route) => {
    const lang = route.params.lang as string
    return isValidDocLang(lang) && lang !== 'en'
  },
})
</script>

