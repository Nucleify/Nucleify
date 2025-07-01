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
              <ad-paragraph class="header" v-if="item?.header" :text="item.name" />
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
const { t } = useI18n()
const localePath = useLocalePath()

const columns = computed(() => [
  [
    { name: t('footer.columns.entities.title'), header: true, url: '/entities' },
    { name: t('footer.columns.entities.activities'), url: '/activity-log' },
    { name: t('footer.columns.entities.articles'), url: '/entities/articles' },
    { name: t('footer.columns.entities.contacts'), url: '/entities/contacts' },
    { name: t('footer.columns.entities.money'), url: '/entities/money' },
    { name: t('footer.columns.entities.users'), url: '/admin' },
  ],
  [
    { name: t('footer.columns.services.title'), header: true, url: t('links.services.href') },
    { name: t('footer.columns.services.openSource'), url: t('links.services.href')},
    { name: t('footer.columns.services.storage'), url: t('links.services.href') },
    { name: t('footer.columns.services.migration'), url: t('links.services.href') },
    { name: t('footer.columns.services.integration'), url: t('links.services.href') },
    { name: t('footer.columns.services.analysis'), url: t('links.services.href')},
    { name: t('footer.columns.services.pageBuilder'), url: t('links.services.href') },
  ],
  [
    { name: t('footer.columns.about.title'), header: true, url: t('links.about.href') },
    { name: t('footer.columns.about.purpose'), url: t('links.about.href') },
    { name: t('footer.columns.about.collaboration'), url: t('links.about.href') },
    { name: t('footer.columns.about.support'), url: t('links.about.href') },
    { name: t('footer.columns.about.license'), url: t('links.about.href') },
    { name: t('footer.columns.about.contact'), url: t('links.about.href') },
  ],
  [
    { name: t('footer.columns.blog.title'), header: true, url: localePath('blog') },
    { name: t('footer.columns.blog.openSourceImpact'), url: localePath('blog') },
    { name: t('footer.columns.blog.automation'), url: localePath('blog') },
    { name: t('footer.columns.blog.security'), url: localePath('blog') },
    { name: t('footer.columns.blog.scalability'), url: localePath('blog') },
    { name: t('footer.columns.blog.tools'), url: localePath('blog') },
  ]
])
</script>
