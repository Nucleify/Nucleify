<template>
  <section id="footer">
    <div class="footer-content-container">
      <div class="top">
        <ad-anchor href="#start" class="header">
          <ad-logo :dimensions="isMobile() ? 44 : 72" ad-type="main" />
          <ad-heading :tag="1" text="Nucleify" class="name" />
        </ad-anchor>
        <div class="content">
          <div
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            :class="`column-${columnIndex + 1}`"
          >
            <nuxt-link
              v-for="(item, itemIndex) in column"
              :key="itemIndex"
              :to="item.url"
            >
              <ad-paragraph
                v-if="item?.header"
                class="header"
                :text="item.name"
              />
              <span v-else>{{ item.name }}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="bottom">
        <nuc-authors />
      </div>
    </div>
    <nuc-animation-hexagons />
  </section>
</template>

<script setup lang="ts">
import { columns } from './items'
</script>
