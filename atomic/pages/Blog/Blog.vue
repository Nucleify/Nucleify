<template>
  <ad-home-navbar />
  <div class="blog-container">
    <ad-section-start
      header="Blog"
      description="Stay informed with insights, guides, and the latest trends in data management, security, and technology. Our blog covers essential topics to help you leverage tools, improve processes, and grow your expertise."
    >
      <BlogStartAnimation />
    </ad-section-start>
    <ad-section-category
      :cards="blogCategoriesCards"
      :prefix="storysetBlogImgUrl"
    />
  </div>
  <ad-home-footer />
</template>
<script setup lang="ts">
import { BlogStartAnimation } from 'atomic/pages'
import { blogCategoriesCards } from 'atomic/bosons/constants'
</script>
