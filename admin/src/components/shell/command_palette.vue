<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="admin-cmdk"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div class="admin-cmdk__backdrop" @click="emit('close')" />
      <div class="admin-cmdk__panel">
        <input
          ref="inputEl"
          v-model="query"
          class="admin-cmdk__input"
          placeholder="Search pages, posts, media…"
          @keydown.escape="emit('close')"
          @keydown.down.prevent="move(1)"
          @keydown.up.prevent="move(-1)"
          @keydown.enter.prevent="goActive"
        />
        <div class="admin-cmdk__list">
          <button
            v-for="(hit, i) in hits"
            :key="`${hit.collection_slug}-${hit.id}`"
            type="button"
            class="admin-cmdk__item"
            :class="{ 'is-active': i === active }"
            @click="go(hit)"
          >
            <span>{{ hit.title || hit.slug || hit.filename || hit.id }}</span>
            <span class="admin-muted">{{ hit.collection_slug || hit.kind }}</span>
          </button>
          <p v-if="query && !hits.length && !loading" class="admin-muted" style="padding: 0.75rem 1rem">
            No results.
          </p>
          <p v-if="loading" class="admin-muted" style="padding: 0.75rem 1rem">
            Searching…
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { adminApiGet } from '../../composables/use_admin_api'

const props = defineProps<{
  open: boolean
  lang: string
}>()

const emit = defineEmits<{
  close: []
}>()

const query = ref('')
const hits = ref<Record<string, unknown>[]>([])
const loading = ref(false)
const active = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)
let timer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.open,
  async (open) => {
    if (!open) return
    query.value = ''
    hits.value = []
    active.value = 0
    await nextTick()
    inputEl.value?.focus()
  }
)

watch(query, (value) => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => void runSearch(value), 220)
})

async function runSearch(value: string) {
  const q = value.trim()
  if (!q) {
    hits.value = []
    return
  }
  loading.value = true
  try {
    hits.value =
      (await adminApiGet<Record<string, unknown>[]>(
        `/api/admin/search?q=${encodeURIComponent(q)}`
      )) ?? []
    active.value = 0
  } catch {
    hits.value = []
  } finally {
    loading.value = false
  }
}

function move(delta: number) {
  if (!hits.value.length) return
  active.value = (active.value + delta + hits.value.length) % hits.value.length
}

function goActive() {
  const hit = hits.value[active.value]
  if (hit) go(hit)
}

async function go(hit: Record<string, unknown>) {
  const collection = String(hit.collection_slug || '')
  const id = String(hit.id || '')
  emit('close')
  if (collection === 'media' || hit.kind === 'media') {
    await navigateTo(`/${props.lang}/collections/media`)
    return
  }
  if (collection && id) {
    await navigateTo(`/${props.lang}/collections/${collection}/${id}`)
  }
}
</script>
