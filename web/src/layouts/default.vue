<template>
  <Suspense>
    <CmsFrame>
      <slot />
    </CmsFrame>
  </Suspense>
</template>

<script setup lang="ts">
import { CmsFrame } from '@shared_modules'
</script>
