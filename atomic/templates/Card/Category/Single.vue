<template>
  <a :href="props.url" class="category-card">
    <img :src="props.image" :alt="props.altText" class="category-card-image" />
    <div class="cta">
      <ad-header :tag="3" :text="props.title" class="cta-title shiny-text" />
      <ad-paragraph :text="props.description" class="cta-description" />
    </div>
  </a>
</template>

<script setup lang="ts">
import { CardCategorySingleInterface } from 'atomic/bosons/types'

const props = defineProps<CardCategorySingleInterface>()
</script>
