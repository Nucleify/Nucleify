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
            <ad-anchor
              v-for="(item, itemIndex) in column"
              :key="itemIndex"
              :href="item.url"
            >
              <ad-heading v-if="item?.header" :tag="3" :text="item.name" />
              <span v-else>{{ item.name }}</span>
            </ad-anchor>
          </div>
        </div>
      </div>
      <div class="bottom">
        <ad-anchor-authors />
      </div>
    </div>
    <dm-animation-hexagons />
  </section>
</template>

<script setup lang="ts">
const columns = [
  // Entities
  [
    { name: 'Entities', header: true },
    { name: 'Activities' },
    { name: 'Articles' },
    { name: 'Contacts' },
    { name: 'Money' },
    { name: 'Users' },
  ],
  // Services
  [
    { name: 'Services', header: true },
    { name: 'Open Source' },
    { name: 'Data Storage' },
    { name: 'Data Migration' },
    { name: 'Data Integration' },
    { name: 'Data Analysis' },
    { name: 'Page Builder' },
  ],
  // About
  [
    { name: 'About', header: true },
    { name: 'Purpose' },
    { name: 'Collaboration' },
    { name: 'Support Us' },
    { name: 'License' },
    { name: 'Contact' },
  ],
  // Blog
  [
    { name: 'Blog', header: true },
    { name: "The Importance of Open Source in Today's World" },
    { name: 'How to Automate Your Data Pipeline' },
    { name: 'Maximizing Data Security' },
    { name: 'Building a Scalable Website' },
    { name: 'The Best Tools for Every Business' },
  ],
]
</script>
