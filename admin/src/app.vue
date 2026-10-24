<template>
  <div>
    <nui-toast position="top-right" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { class: 'nuc-nuxt p-dark' },
  bodyAttrs: { class: 'nuc-nuxt p-dark' },
  titleTemplate: (title) => (title ? `${title} · Nucleify Admin` : 'Nucleify Admin'),
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600&family=JetBrains+Mono:wght@600;700&display=swap',
    },
  ],
  style: [
    {
      key: 'admin-critical-shell',
      textContent: 'html,body{margin:0;background:#0a0a0a;color:#f0f0f0}',
    },
  ],
})
</script>
