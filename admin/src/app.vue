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
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600&family=JetBrains+Mono:wght@600;700&display=swap',
    },
  ],
  style: [
    {
      key: 'admin-critical-shell',
      // Hide until nucleify-ui CE + theme + sheets are ready (avoids empty/jumping nui-* hosts).
      textContent:
        'html,body{margin:0;background:#0a0a0a;color:#f0f0f0}' +
        'html:not([data-nui-ready]) body{visibility:hidden}' +
        'nui-input-text,nui-textarea,nui-select{display:block;width:100%;min-height:2.5625rem;box-sizing:border-box}' +
        'nui-button{box-sizing:border-box;min-height:2.25rem}' +
        'nui-button[fluid]{display:block;width:100%}' +
        'nui-button:not(:defined)::before{content:attr(label)}',
    },
  ],
})
</script>
