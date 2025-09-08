<template>
  <section id="footer">
    <div class="footer-content-container">
      <div class="top">
        <ad-anchor href="#start" class="header">
          <ad-image
            :src="imgUrl + 'logo.svg'"
            alt="DataManager logo"
            class="logo"
          />
          <ad-heading :tag="1" text="DataManager" class="name" />
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
        <ad-anchor-authors />
      </div>
    </div>
    <a 
      href="https://github.com/Atomic-IT/DataManager/milestone/8" 
      target="_blank"
    >
      <dm-time-countdown 
        class="v1-release-countdown"
        :date="new Date('2026-01-01')" 
      />
    </a>
    <dm-animation-hexagons />
  </section>
</template>

<script setup lang="ts">
import { columns } from './items'
</script>
