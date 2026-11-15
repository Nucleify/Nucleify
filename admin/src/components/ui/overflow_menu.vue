<template>
  <div class="admin-overflow" ref="root">
    <button
      v-if="compact || icon"
      type="button"
      class="admin-overflow__trigger"
      :class="{
        'admin-overflow__trigger--toolbar': Boolean(icon),
      }"
      :disabled="disabled"
      :aria-expanded="open ? 'true' : 'false'"
      aria-haspopup="menu"
      :aria-label="label"
      :title="label"
      @click="open = !open"
    >
      <span class="admin-overflow__trigger-icon" aria-hidden="true">
        <svg
          v-if="icon === 'options'"
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
          <circle cx="5.5" cy="4.5" r="1.25" fill="currentColor" stroke="none" />
          <circle cx="10" cy="8" r="1.25" fill="currentColor" stroke="none" />
          <circle cx="7" cy="11.5" r="1.25" fill="currentColor" stroke="none" />
        </svg>
        <svg
          v-else
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="currentColor"
        >
          <circle cx="3" cy="8" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="13" cy="8" r="1.5" />
        </svg>
      </span>
      <span v-if="icon" class="admin-overflow__trigger-text">
        {{ text || defaultText }}
      </span>
    </button>
    <nui-button
      v-else
      type="button"
      variant="outlined"
      size="small"
      :label="label"
      :disabled.prop="disabled"
      :aria-expanded="open ? 'true' : 'false'"
      aria-haspopup="menu"
      @click="open = !open"
    />
    <div
      v-if="open"
      class="admin-overflow__menu"
      role="menu"
      @keydown.escape="open = false"
    >
      <button
        v-for="action in actions"
        :key="action.id"
        type="button"
        class="admin-overflow__item"
        :class="{ 'is-danger': action.danger }"
        role="menuitem"
        :disabled="action.disabled"
        @click="onPick(action)"
      >
        {{ action.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '../../types/admin_actions'

const props = withDefaults(
  defineProps<{
    actions: AdminAction[]
    label?: string
    text?: string
    disabled?: boolean
    compact?: boolean
    icon?: 'options' | 'more' | ''
  }>(),
  {
    label: 'More',
    text: '',
    disabled: false,
    compact: false,
    icon: '',
  }
)

const defaultText = computed(() => {
  if (props.icon === 'options') return 'Options'
  if (props.icon === 'more') return 'More'
  return props.label
})

const open = ref(false)
const root = ref<HTMLElement | null>(null)

function onDocClick(event: MouseEvent) {
  if (!open.value || !root.value) return
  if (!root.value.contains(event.target as Node)) open.value = false
}

onMounted(() => document.addEventListener('click', onDocClick, true))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick, true))

async function onPick(action: AdminAction) {
  if (action.disabled) return
  open.value = false
  await action.onClick()
}
</script>
