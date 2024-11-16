<template>
  <div class="categories-container">
    <ad-header :tag="2" text="Categories" class="categories-container-header" />

    <div class="cards-container container">
      <ad-card-category-single
        v-for="(card, index) in props.cards"
        :key="index"
        :image="props.prefix + card.image"
        :title="card.title"
        :description="card.description"
        :url="card.url"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CardCategorySectionInterface } from 'atomic/bosons/types'

const props = defineProps<CardCategorySectionInterface>()
</script>
