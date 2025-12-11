<template>
  <div class="blog-container">
    <nuc-section-category
      :cards="blogCategoriesCards"
      :prefix="storysetBlogImgUrl"
    />
  </div>
</template>

<script setup lang="ts">
import { blogCategoriesCards } from 'atomic'
</script>
