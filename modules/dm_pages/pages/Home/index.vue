<template>
  <div class="home-container">
    <start />
    <features />
    <innovations />
    <ad-section-why-us site="home" />
    <ad-section-faq site="home" />
    <ad-section-contact />
  </div>
</template>

<script setup lang="ts">
import { useSplitText } from 'atomic'

import { Features, Innovations, Start } from './sections'

onBeforeMount(() => window.scrollTo(0, 0))

useSplitText().animate()
</script>
