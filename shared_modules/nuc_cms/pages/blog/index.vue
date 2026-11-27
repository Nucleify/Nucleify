<template>
  <div style="max-width: 42rem; margin: 0 auto; padding: 2rem 1.25rem">
    <h1>Blog</h1>
    <p v-if="pending" class="admin-muted">Loading…</p>
    <p v-else-if="!posts.length" class="admin-muted">No posts yet.</p>
    <ul v-else style="list-style: none; padding: 0">
      <li v-for="post in posts" :key="post.id" style="margin: 1rem 0">
        <NuxtLink :to="`/${lang}/blog/${post.slug}`">
          <strong>{{ post.title }}</strong>
        </NuxtLink>
        <p v-if="post.excerpt" style="margin: 0.35rem 0 0">
          {{ post.excerpt }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed, ref, watchEffect } from 'vue'

const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))

type PostRow = {
  id: string
  slug: string
  title: string
  excerpt?: string
}

const posts = ref<PostRow[]>([])
const pending = ref(true)

watchEffect(async () => {
  pending.value = true
  try {
    const body = await $fetch<{ data?: { posts?: PostRow[] } }>(
      '/api/public/posts',
      { query: { locale: lang.value } }
    )
    posts.value = body?.data?.posts ?? []
  } catch {
    posts.value = []
  } finally {
    pending.value = false
  }
})

useHead({ title: 'Blog' })
</script>
