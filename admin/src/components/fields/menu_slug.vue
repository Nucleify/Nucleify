<template>
  <FieldSelect
    :label="label"
    :description="description"
    :error="error"
    :model-value="modelValue"
    :options="options"
    :placeholder="placeholder"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import { adminApiGet } from '../../composables/use_api'
import type { FieldSelectOption } from './field_select.vue'

const props = withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    modelValue: string
    locale?: string
    placeholder?: string
  }>(),
  {
    label: 'Menu',
    description: '',
    error: '',
    locale: 'en',
    placeholder: 'Select a menu…',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const loaded = ref<FieldSelectOption[]>([])

const options = computed((): FieldSelectOption[] => {
  const rows = [...loaded.value]
  const current = String(props.modelValue || '').trim()
  if (current && !rows.some((row) => row.value === current)) {
    rows.unshift({ label: `${current} (missing)`, value: current })
  }
  if (!rows.some((row) => row.value === '')) {
    rows.unshift({ label: '— None —', value: '' })
  }
  return rows
})

async function loadMenus() {
  try {
    const rows =
      (await adminApiGet<
        { slug?: string; label?: string; locale?: string }[]
      >('/api/admin/menus')) ?? []
    const loc = String(props.locale || 'en').trim() || 'en'
    const preferred = rows.filter((row) => String(row.locale || 'en') === loc)
    const source = preferred.length ? preferred : rows
    const seen = new Set<string>()
    const next: FieldSelectOption[] = []
    for (const row of source) {
      const slug = String(row.slug || '').trim()
      if (!slug || seen.has(slug)) continue
      seen.add(slug)
      const label = String(row.label || slug).trim() || slug
      next.push({
        label: label === slug ? slug : `${label} (${slug})`,
        value: slug,
      })
    }
    loaded.value = next
  } catch {
    loaded.value = []
  }
}

onMounted(() => {
  void loadMenus()
})

watch(
  () => props.locale,
  () => {
    void loadMenus()
  }
)
</script>
