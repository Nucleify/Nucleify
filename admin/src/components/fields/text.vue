<template>
  <FieldShell :label="label" :description="description" :error="error">
    <nui-input-text
      ref="host"
      :type="type"
      fluid
      :size="size || (dense ? 'small' : '')"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value.prop="displayValue"
      :disabled.prop="disabled"
      :class="{ 'is-dense': dense }"
      @input="onInput"
    />
  </FieldShell>
</template>

<script setup lang="ts">
import { nuiHostValue, nuiValueFromEvent } from '@admin'

const props = withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    type?: string
    placeholder?: string
    autocomplete?: string
    autoComplete?: string
    modelValue?: string
    /** @deprecated use modelValue */
    value?: string
    disabled?: boolean
    size?: 'small' | 'large' | ''
    /** Match admin control height token inside nui shadow input. */
    dense?: boolean
  }>(),
  {
    label: '',
    description: '',
    error: '',
    type: 'text',
    placeholder: '',
    autocomplete: undefined,
    autoComplete: undefined,
    modelValue: undefined,
    value: undefined,
    disabled: false,
    size: '',
    dense: false,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const host = ref<{ value?: unknown } | null>(null)

const displayValue = computed(
  () => props.modelValue ?? props.value ?? ''
)

watch(displayValue, (next) => {
  if (host.value && typeof host.value === 'object' && host.value.value !== next) {
    ;(host.value as { value: string }).value = next
  }
})

function onInput(event: Event) {
  const next = nuiValueFromEvent(event)
  if (next !== null) emit('update:modelValue', next)
}

async function syncDenseHeight() {
  if (!props.dense || !import.meta.client) return
  const el = host.value as unknown as HTMLElement | null
  if (!el) return
  try {
    await customElements.whenDefined('nui-input-text')
  } catch {
    return
  }
  await nextTick()
  const input = el.shadowRoot?.querySelector(
    '.nui-input-text-input'
  ) as HTMLElement | null
  if (!input) return
  input.style.boxSizing = 'border-box'
  input.style.minHeight = 'var(--admin-control-h)'
  input.style.height = 'var(--admin-control-h)'
  input.style.paddingTop = '0'
  input.style.paddingBottom = '0'
  input.style.lineHeight = 'var(--admin-control-h)'
}

onMounted(() => {
  void syncDenseHeight()
})

watch(
  () => props.dense,
  () => {
    void syncDenseHeight()
  }
)

defineExpose({
  get value() {
    return nuiHostValue(host.value) || displayValue.value
  },
  set value(next: string) {
    if (host.value && typeof host.value === 'object') {
      ;(host.value as { value: string }).value = next
    }
    emit('update:modelValue', next)
  },
})
</script>
