<template>
  <div class="nuc-cms-page">
    <p v-if="pending" class="nuc-cms-page__status">Loading…</p>
    <p v-else-if="error" class="nuc-cms-page__status">{{ error }}</p>
    <template v-else-if="page">
      <header class="nuc-cms-page__header">
        <h1>{{ page.title || page.slug }}</h1>
      </header>
      <PageRenderer :sections="page.sections" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useSeoMeta } from 'nuxt/app'
import { computed, onMounted, ref } from 'vue'

import PageRenderer from '../../../components/PageRenderer.vue'
import { apiRequest } from '../../../../../shared_modules/nuc_api/utils/api_request'

type PublicPage = {
  id: string
  slug: string
  locale: string
  title: string
  version: number
  sections: {
    id: string
    type: string
    order: number
    props?: Record<string, unknown>
  }[]
  seo?: { title?: string; description?: string } | null
}

const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))
const slug = computed(() => String(route.params.slug || ''))

const page = ref<PublicPage | null>(null)
const pending = ref(true)
const error = ref('')

useSeoMeta({
  title: () => page.value?.seo?.title || page.value?.title || 'Page',
  description: () => page.value?.seo?.description || '',
})

onMounted(async () => {
  pending.value = true
  error.value = ''
  try {
    const res = await apiRequest<{ data?: PublicPage }>(
      `/api/public/pages/${encodeURIComponent(slug.value)}?locale=${encodeURIComponent(lang.value)}`,
      'GET'
    )
    const body = res as { data?: PublicPage }
    page.value = body?.data ?? (res as unknown as PublicPage)
    if (!page.value?.slug) throw new Error('Page not found')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load page'
  } finally {
    pending.value = false
  }
})
</script>

<style scoped>
.nuc-cms-page {
  min-height: 100vh;
  background: #050505;
  color: #f0f0f0;
}

.nuc-cms-page__header {
  padding: 2rem 1.5rem 1rem;
  border-bottom: 1px solid #2a2a2a;
}

.nuc-cms-page__header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nuc-cms-page__status {
  padding: 2rem 1.5rem;
  color: #8a8a8a;
}
</style>
