<template>
  <div class="categories-container">
    <atom-heading
      :tag="2"
      text="Categories"
      class="categories-container-header"
    />

    <div class="cards-container container">
      <template-card-category
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
import { SectionCategoryInterface } from 'atomic'

const props = defineProps<SectionCategoryInterface>()
</script>
