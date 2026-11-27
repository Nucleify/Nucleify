<template>
  <nui-chart
    ref="host"
    :type="type"
    :height="String(height)"
    :width="width ? String(width) : undefined"
    class="admin-chart"
  />
</template>

<script setup lang="ts">
/**
 * Thin Vue host for Lit `nui-chart` — sets Chart.js `data` / `options` as
 * DOM properties (attributes cannot carry objects).
 */
const props = withDefaults(
  defineProps<{
    type?: 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea'
    data?: Record<string, unknown> | null
    options?: Record<string, unknown>
    height?: string | number
    width?: string | number
  }>(),
  {
    type: 'bar',
    data: null,
    options: () => ({}),
    height: 220,
    width: '',
  }
)

const host = ref<HTMLElement | null>(null)

function apply() {
  const el = host.value as
    | (HTMLElement & {
        type?: string
        data?: unknown
        options?: unknown
      })
    | null
  if (!el) return
  el.type = props.type
  el.data = props.data
  el.options = props.options
}

watch(
  () => [props.type, props.data, props.options] as const,
  () => apply(),
  { deep: true }
)

onMounted(() => {
  apply()
})
</script>

<style lang="scss">
.admin-chart {
  display: block;
  width: 100%;
  min-height: 12rem;
}
</style>
