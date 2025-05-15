<template>
  <div class="container">
    <template-card-boxes :boxes="data" />
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch(runtime.apiUrl + 'technologies/get-site-technologies/general', {
  method: 'GET',
  immediate: true,
  watch: false,
})
</script>
