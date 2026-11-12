<template>
  <div>
    <article style="max-width: 42rem; margin: 0 auto; padding: 2rem 1.25rem">
      <p v-if="pending">Loading…</p>
      <template v-else-if="post">
        <h1>{{ post.title }}</h1>
        <p v-if="post.excerpt" style="opacity: 0.8">{{ post.excerpt }}</p>
        <PostBody :blocks="post.body" />
      </template>
      <p v-else>Post not found.</p>
    </article>

    <section
      v-if="post && commentsEnabled"
      style="max-width: 42rem; margin: 0 auto; padding: 0 1.25rem 3rem"
    >
      <h2>Comments</h2>
      <ul style="list-style: none; padding: 0">
        <li v-for="c in comments" :key="c.id" style="margin: 0.75rem 0">
          <strong>{{ c.author_name }}</strong>
          <p style="margin: 0.25rem 0 0; white-space: pre-wrap">{{ c.body }}</p>
        </li>
      </ul>
      <form
        style="display: grid; gap: 0.75rem; margin-top: 1rem"
        @submit.prevent="submitComment"
      >
        <input v-model="form.authorName" required placeholder="Name" />
        <input v-model="form.authorEmail" type="email" placeholder="Email" />
        <textarea v-model="form.body" required rows="4" placeholder="Comment" />
        <button type="submit">Submit comment</button>
        <p v-if="commentOk" style="color: #86efac">{{ commentOk }}</p>
        <p v-if="commentError" style="color: #f87171">{{ commentError }}</p>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed, reactive, ref, watchEffect } from 'vue'

import PostBody from '../../../components/PostBody.vue'

const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))
const slug = computed(() => String(route.params.slug || ''))

type PostPayload = {
  id: string
  title: string
  excerpt?: string
  body: Record<string, unknown>[]
  seo?: { title?: string; description?: string; robots?: string } | null
}

const post = ref<PostPayload | null>(null)
const pending = ref(true)
const comments = ref<{ id: string; author_name: string; body: string }[]>([])
const commentsEnabled = ref(true)
const commentOk = ref('')
const commentError = ref('')
const form = reactive({ authorName: '', authorEmail: '', body: '' })

watchEffect(async () => {
  pending.value = true
  try {
    const body = await $fetch<{ data?: PostPayload }>(
      `/api/public/posts/${encodeURIComponent(slug.value)}`,
      { query: { locale: lang.value } }
    )
    post.value = body?.data
      ? {
          ...body.data,
          body: Array.isArray(body.data.body) ? body.data.body : [],
        }
      : null
    if (post.value) {
      useHead({
        title: post.value.seo?.title || post.value.title,
        meta: [
          {
            name: 'description',
            content: post.value.seo?.description || post.value.excerpt || '',
          },
          {
            name: 'robots',
            content: post.value.seo?.robots || 'index,follow',
          },
        ],
      })
      const list = await $fetch<{ data?: typeof comments.value }>(
        `/api/public/comments/${post.value.id}`
      )
      comments.value = list?.data ?? []
    }
  } catch {
    post.value = null
  } finally {
    pending.value = false
  }
})

async function submitComment() {
  if (!post.value) return
  commentOk.value = ''
  commentError.value = ''
  try {
    await $fetch('/api/public/comments', {
      method: 'POST',
      body: {
        documentId: post.value.id,
        authorName: form.authorName,
        authorEmail: form.authorEmail,
        body: form.body,
      },
    })
    commentOk.value = 'Thanks — your comment awaits moderation.'
    form.body = ''
  } catch (e) {
    commentError.value = e instanceof Error ? e.message : 'Failed to submit'
  }
}
</script>
