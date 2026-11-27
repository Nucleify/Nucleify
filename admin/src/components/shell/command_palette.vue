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
import { adminApiGet } from '../../composables/use_api'

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

<style lang="scss">
.admin-cmdk {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: start center;
  padding: 12vh 1rem 1rem;
}
.admin-cmdk__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
}
.admin-cmdk__panel {
  position: relative;
  z-index: 1;
  width: min(100%, 32rem);
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
}
.admin-cmdk__input {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 0;
  border-bottom: 1px solid var(--admin-border);
  background: transparent;
  color: var(--admin-text);
  font: inherit;
  font-size: 1rem;
  outline: none;
}
.admin-cmdk__list {
  max-height: 20rem;
  overflow: auto;
  padding: 0.35rem 0;
}
.admin-cmdk__item {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0.65rem 1rem;
  border: 0;
  background: transparent;
  color: var(--admin-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.admin-cmdk__item:hover,
.admin-cmdk__item.is-active {
  background: var(--admin-surface-2);
}
</style>
