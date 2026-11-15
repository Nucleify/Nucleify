<template>
  <div class="admin-widget-picker">
    <FieldText
      :model-value="query"
      label="Search widgets"
      placeholder="Name or type"
      @update:model-value="query = $event"
    />
    <p v-if="recent.length" class="admin-form__label" style="margin-top: 0.75rem">
      Recently used
    </p>
    <div v-if="recent.length" class="admin-widget-picker__grid">
      <button
        v-for="widget in recent"
        :key="`r-${widget.type}`"
        type="button"
        class="admin-widget-picker__item"
        @click="pick(widget.type)"
      >
        <strong>{{ widget.label }}</strong>
        <span class="admin-muted">{{ widget.type }}</span>
      </button>
    </div>
    <template v-for="group in groups" :key="group.label">
      <p class="admin-form__label" style="margin-top: 0.75rem">{{ group.label }}</p>
      <div class="admin-widget-picker__grid">
        <button
          v-for="widget in group.items"
          :key="widget.type"
          type="button"
          class="admin-widget-picker__item"
          @click="pick(widget.type)"
        >
          <strong>{{ widget.label }}</strong>
          <span class="admin-muted">{{ widget.type }}</span>
        </button>
      </div>
    </template>
    <p v-if="!filtered.length" class="admin-muted">No widgets match.</p>
  </div>
</template>

<script setup lang="ts">
import { postBlockWidgets, listWidgets } from '@shared_modules'


const props = defineProps<{
  allowedTypes?: string[]
}>()

const emit = defineEmits<{
  pick: [type: string]
}>()

const query = ref('')
const recentTypes = ref<string[]>([])

onMounted(() => {
  if (!import.meta.client) return
  try {
    recentTypes.value = JSON.parse(
      localStorage.getItem('admin-widget-recent') || '[]'
    ) as string[]
  } catch {
    recentTypes.value = []
  }
})

const all = computed(() => {
  const widgets = [...listWidgets(), ...postBlockWidgets]
  if (!props.allowedTypes?.length) return listWidgets()
  const allow = new Set(props.allowedTypes)
  return widgets.filter((w) => allow.has(w.type))
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return all.value
  return all.value.filter(
    (w) =>
      w.label.toLowerCase().includes(q) || w.type.toLowerCase().includes(q)
  )
})

const recent = computed(() =>
  recentTypes.value
    .map((type) => all.value.find((w) => w.type === type))
    .filter(Boolean)
    .slice(0, 6) as typeof all.value
)

const groups = computed(() => {
  const home: typeof all.value = []
  const investor: typeof all.value = []
  const blocks: typeof all.value = []
  const other: typeof all.value = []
  for (const w of filtered.value) {
    if (w.type.startsWith('block.')) blocks.push(w)
    else if (w.type.includes('investor') || w.type.includes('Investor')) {
      investor.push(w)
    } else if (w.type.includes('home') || w.type.includes('Home')) home.push(w)
    else other.push(w)
  }
  return [
    { label: 'Home', items: home },
    { label: 'Investor', items: investor },
    { label: 'Post blocks', items: blocks },
    { label: 'Other', items: other },
  ].filter((g) => g.items.length)
})

function pick(type: string) {
  const next = [type, ...recentTypes.value.filter((t) => t !== type)].slice(
    0,
    8
  )
  recentTypes.value = next
  if (import.meta.client) {
    localStorage.setItem('admin-widget-recent', JSON.stringify(next))
  }
  emit('pick', type)
}
</script>
