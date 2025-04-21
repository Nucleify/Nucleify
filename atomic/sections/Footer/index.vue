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
            <template v-for="(item, itemIndex) in column" :key="itemIndex">
              <ad-anchor :href="item.url" v-if="item?.header">
                <ad-heading :tag="3" :text="item.name" />
              </ad-anchor>
              <ad-anchor v-else :href="item.url" :text="item.name" />
            </template>
          </div>
        </div>
      </div>
      <div class="bottom">
        <ad-anchor href="https://github.com/Atomic-IT" class="authors">
          made by Atomic IT
          <img src="/logo.png" width="28" height="28" alt="Atomic IT logo" />
        </ad-anchor>
      </div>
    </div>
    <dm-animation-hexagons />
  </section>
</template>

<script setup lang="ts">
const columns = [
  // Entities
  [
    { name: 'Entities', url: '/entities', header: true },
    { name: 'Activities', url: '/activity-log' },
    { name: 'Articles', url: '/entities/articles' },
    { name: 'Contacts', url: '/entities/contacts' },
    { name: 'Money', url: '/entities/money' },
    { name: 'Users', url: '/admin' },
  ],
  // Services
  [
    { name: 'Services', url: '/services', header: true },
    { name: 'Open Source' },
    { name: 'Data Storage' },
    { name: 'Data Migration' },
    { name: 'Data Integration' },
    { name: 'Data Analysis' },
    { name: 'Page Builder' },
  ],
  // About
  [
    { name: 'About', url: '/about', header: true },
    { name: 'Purpose' },
    { name: 'Collaboration' },
    { name: 'Support Us' },
    { name: 'License' },
    { name: 'Contact' },
  ],
  // Blog
  [
    { name: 'Blog', url: '/blog', header: true },
    { name: "The Importance of Open Source in Today's World" },
    { name: 'How to Automate Your Data Pipeline' },
    { name: 'Maximizing Data Security' },
    { name: 'Building a Scalable Website' },
    { name: 'The Best Tools for Every Business' },
  ],
]
</script>
