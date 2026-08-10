<script setup lang="ts">
import Hello from './components/hello.vue'
import NuiCta from './components/nui_cta.vue'
import Counter from './components/counter.vue'
</script>

<template>
  <main style="font-family: system-ui; padding: 2rem; display: grid; gap: 1.5rem">
    <h1>Vue emit demo</h1>
    <Hello title="Hello from vue/" />
    <NuiCta label="Launch with nucleify-ui" />
    <Counter label="Clicks" />
  </main>
</template>
