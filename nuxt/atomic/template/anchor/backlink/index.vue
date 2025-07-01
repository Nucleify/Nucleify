<template>
  <ad-anchor
    :href="localePath('/home')" 
    class="back-link"
    icon="pi pi-chevron-left"
    title="Back to home"
  />
</template>

<script setup>  
  const localePath = useLocalePath()
</script>