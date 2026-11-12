<template>
  <div v-if="error" class="nuc-shell" style="padding: 2rem">
    <p>{{ error }}</p>
  </div>
  <div v-else-if="pending" class="nuc-shell" style="padding: 2rem">
    <p>Loading preview…</p>
  </div>
  <div v-else>
    <p
      class="admin-muted"
      style="
        position: sticky;
        top: 0;
        z-index: 50;
        margin: 0;
        padding: 0.5rem 1rem;
        background: #111;
        color: #fbbf24;
        font-size: 0.85rem;
      "
    >
      Draft preview — not published
    </p>
    <ShellSections v-if="sections.length" :sections="sections" />
    <PostBody v-else-if="body.length" :blocks="body" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed, ref, watchEffect } from 'vue'

import type { PageSection } from '@shared_modules'
import ShellSections from '../../../components/ShellSections'
import PostBody from '../../../components/PostBody.vue'

definePageMeta({ layout: false })

const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))
const slug = computed(() => String(route.params.slug || ''))
const token = computed(() => String(route.query.token || ''))

const pending = ref(true)
const error = ref('')
const sections = ref<PageSection[]>([])
const body = ref<Record<string, unknown>[]>([])

watchEffect(async () => {
  pending.value = true
  error.value = ''
  if (!slug.value || !token.value) {
    error.value = 'Missing preview token'
    pending.value = false
    return
  }
  try {
    const res = await $fetch<{
      data?: {
        sections?: PageSection[]
        body?: Record<string, unknown>[]
        title?: string
      }
    }>(`/api/public/preview/${encodeURIComponent(slug.value)}`, {
      query: { token: token.value, locale: lang.value },
    })
    sections.value = Array.isArray(res?.data?.sections)
      ? res.data!.sections!
      : []
    body.value = Array.isArray(res?.data?.body) ? res.data!.body! : []
    useHead({
      title: `Preview: ${res?.data?.title || slug.value}`,
      meta: [{ name: 'robots', content: 'noindex,nofollow' }],
    })
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Preview failed'
  } finally {
    pending.value = false
  }
})
</script>
