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
    { name: 'Entities', header: true, url: '/entities' },
    { name: 'Activities', url: '/activity-log' },
    { name: 'Articles', url: '/entities/articles' },
    { name: 'Contacts', url: '/entities/contacts' },
    { name: 'Money', url: '/entities/money' },
    { name: 'Users', url: '/admin' },
  ],
  // Services
  [
    { name: 'Services', header: true, url: '/services' },
    { name: 'Open Source', url: '/services' },
    { name: 'Data Storage', url: '/services' },
    { name: 'Data Migration', url: '/services' },
    { name: 'Data Integration', url: '/services' },
    { name: 'Data Analysis', url: '/services' },
    { name: 'Page Builder', url: '/services' },
  ],
  // About
  [
    { name: 'About', header: true, url: '/about' },
    { name: 'Purpose', url: '/about' },
    { name: 'Collaboration', url: '/about' },
    { name: 'Support Us', url: '/about' },
    { name: 'License', url: '/about' },
    { name: 'Contact', url: '/about' },
  ],
  // Blog
  [
    { name: 'Blog', header: true, url: '/blog' },
    { name: "The Importance of Open Source in Today's World", url: '/blog' },
    { name: 'How to Automate Your Data Pipeline', url: '/blog' },
    { name: 'Maximizing Data Security', url: '/blog' },
    { name: 'Building a Scalable Website', url: '/blog' },
    { name: 'The Best Tools for Every Business', url: '/blog' },
  ],
]
</script>
