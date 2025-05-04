<template>
  <section id="footer">
    <div class="footer-content-container">
      <div class="top">
        <molecule-anchor href="#start" class="header">
          <atom-image
            :src="imgUrl + 'logo.svg'"
            alt="DataManager logo"
            class="logo"
          />
          <atom-heading :tag="1" text="DataManager" class="name" />
        </molecule-anchor>
        <div class="content">
          <div
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            :class="`column-${columnIndex + 1}`"
          >
            <molecule-anchor 
              v-for="(item, itemIndex) in column" 
              :key="itemIndex"
              :href="item.url"
            >
              <atom-heading v-if="item?.header" :tag="3" :text="item.name" />
              <span v-else>{{ item.name }}</span>
            </molecule-anchor>
          </div>
        </div>
      </div>
      <div class="bottom">
        <molecule-anchor href="https://github.com/Atomic-IT" class="authors">
          made by Atomic IT
          <img src="/logo.png" width="28" height="28" alt="Atomic IT logo" />
        </molecule-anchor>
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
    { name: 'Open Source', url: '/' },
    { name: 'Data Storage', url: '/' },
    { name: 'Data Migration', url: '/' },
    { name: 'Data Integration', url: '/' },
    { name: 'Data Analysis', url: '/' },
    { name: 'Page Builder', url: '/' },
  ],
  // About
  [
    { name: 'About', url: '/about', header: true },
    { name: 'Purpose', url: '/' },
    { name: 'Collaboration', url: '/' },
    { name: 'Support Us', url: '/' },
    { name: 'License', url: '/' },
    { name: 'Contact', url: '/' },
  ],
  // Blog
  [
    { name: 'Blog', url: '/blog', header: true },
    { name: "The Importance of Open Source in Today's World", url: '/' },
    { name: 'How to Automate Your Data Pipeline', url: '/' },
    { name: 'Maximizing Data Security', url: '/' },
    { name: 'Building a Scalable Website', url: '/' },
    { name: 'The Best Tools for Every Business', url: '/' },
  ],
]
</script>
