<template>
  <div class="categories-container">
    <ad-header :tag="2" text="Categories" class="categories-container-header" />

    <div class="cards-container container">
      <CategoryCard
        v-for="(card, index) in aboutCategoriesCards"
        :key="index"
        :image="storysetAboutImgUrl + card.image"
        :title="card.title"
        :description="card.description"
        :url="card.url"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { aboutCategoriesCards } from 'atomic/bosons/constants'

import { CategoryCard } from './Components'
</script>
