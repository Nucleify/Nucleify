<template>
  <div class="categories-container">
    <ad-heading
      :tag="2"
      text="Categories"
      class="categories-container-header"
    />

    <div class="cards-container container">
      <nuc-card-category
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
import type { NucSectionCategoryInterface } from 'atomic'

const props = defineProps<NucSectionCategoryInterface>()
</script>
