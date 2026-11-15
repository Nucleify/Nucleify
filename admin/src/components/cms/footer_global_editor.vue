<template>
  <div class="admin-footer-editor">
    <p class="admin-footer-editor__lead">
      This is the thin bar at the bottom of the closing section
      (<strong>© brand + links</strong>). Home, investor, and
      migrations-company each have their own set — pick a page below and edit
      that set.
    </p>

    <div class="admin-footer-editor__pages" role="tablist">
      <button
        v-for="opt in FOOTER_TEMPLATE_OPTIONS"
        :key="opt.value"
        type="button"
        role="tab"
        class="admin-footer-editor__page"
        :class="{ 'is-active': activeId === opt.value }"
        :aria-selected="activeId === opt.value"
        @click="activeId = opt.value"
      >
        <span class="admin-footer-editor__page-label">{{ opt.label }}</span>
        <span class="admin-footer-editor__page-path">{{ opt.page }}</span>
      </button>
    </div>

    <p class="admin-form__hint">{{ activeOption?.description }}</p>

    <div class="admin-footer-editor__preview-head">
      <p class="admin-form__label">How it looks on the site</p>
      <AdminViewportToggle v-model="viewport" label="" />
    </div>

    <div
      class="admin-footer-preview-shell"
      :class="`is-${viewport}`"
      aria-live="polite"
    >
      <div
        class="admin-footer-preview"
        :class="{ 'is-stacked': viewport === 'mobile' }"
        :data-sep="activeSeparator"
      >
        <span class="admin-footer-preview__brand"
          >© {{ year }} {{ activeBrand || 'Brand' }}</span
        >
        <nav class="admin-footer-preview__links" aria-label="Footer preview">
          <span
            v-for="(link, i) in activeLinks"
            :key="`${link.label}-${i}`"
            class="admin-footer-preview__link"
            >{{ link.label || 'Link' }}</span
          >
          <span v-if="!activeLinks.length" class="admin-footer-preview__empty"
            >No links</span
          >
        </nav>
      </div>
    </div>

    <FieldText
      :model-value="activeBrand"
      label="Brand name"
      description="Text after © year"
      @update:model-value="setBrand"
    />

    <FieldSelect
      :model-value="activeSeparator"
      label="Link separator"
      description="Glyph between links (or none)"
      :options="separatorSelectOptions"
      @update:model-value="setSeparator"
    />

    <div class="admin-footer-links">
      <div class="admin-footer-links__head">
        <div>
          <p class="admin-form__label">Links for this page</p>
          <p class="admin-form__hint">
            Visitors see these in the bar above. Add, edit, or remove rows.
          </p>
        </div>
        <button
          type="button"
          class="admin-control-btn admin-control-btn--filled"
          @click="addLink"
        >
          Add link
        </button>
      </div>

      <div v-if="activeLinks.length" class="admin-footer-links__table">
        <div class="admin-footer-links__cols" aria-hidden="true">
          <span>Label</span>
          <span>URL</span>
          <span></span>
        </div>
        <div
          v-for="(link, index) in activeLinks"
          :key="index"
          class="admin-footer-links__row"
        >
          <input
            class="admin-footer-links__input"
            type="text"
            :value="link.label"
            placeholder="Docs"
            :aria-label="`Link ${index + 1} label`"
            @input="onLinkInput(index, 'label', $event)"
          />
          <input
            class="admin-footer-links__input"
            type="url"
            :value="link.href"
            placeholder="https://"
            :aria-label="`Link ${index + 1} URL`"
            @input="onLinkInput(index, 'href', $event)"
          />
          <button
            type="button"
            class="admin-control-btn admin-footer-links__remove"
            :aria-label="`Remove link ${index + 1}`"
            @click="removeLink(index)"
          >
            ×
          </button>
        </div>
      </div>
      <p v-else class="admin-muted">
        No links yet — add one, or use More → Reset to defaults.
      </p>
    </div>

    <details class="admin-footer-editor__advanced">
      <summary>Optional: override with a Menus entry</summary>
      <p class="admin-form__hint" style="margin-top: 0.65rem">
        Leave empty to use the links above. Only set this if you manage footer
        links in <strong>Collections → Menus</strong> instead. Pages can also
        pick their own Footer menu in the page sidebar.
      </p>
      <FieldMenuSlug
        :model-value="menuSlug"
        label="Shared menu (optional)"
        description="If set and the menu has items, those links replace the template links site-wide for pages that inherit this default."
        :locale="locale"
        placeholder="— Use template links —"
        @update:model-value="setMenuSlug"
      />
    </details>
  </div>
</template>

<script setup lang="ts">
import {
  FOOTER_SEPARATOR_DOT,
  FOOTER_SEPARATOR_OPTIONS,
  FOOTER_TEMPLATE_HOME,
  FOOTER_TEMPLATE_OPTIONS,
  isFooterSeparatorId,
  type FooterLink,
  type FooterSeparatorId,
  type FooterTemplateId,
  type FooterTemplatesMap,
  normalizeFooterGlobalData,
} from '@shared_modules'

import type { AdminViewport } from '../ui/admin_viewport'

const props = defineProps<{
  modelValue: Record<string, unknown>
  locale?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, unknown>]
}>()

const year = new Date().getFullYear()
const activeId = ref<FooterTemplateId>(FOOTER_TEMPLATE_HOME)
const viewport = ref<AdminViewport>('desktop')
const locale = computed(() => props.locale || 'en')

const separatorSelectOptions = FOOTER_SEPARATOR_OPTIONS.map((row) => ({
  label: row.label,
  value: row.value,
}))

const normalized = computed(() =>
  normalizeFooterGlobalData(props.modelValue, locale.value)
)

const templates = computed(
  () => normalized.value.templates as FooterTemplatesMap
)

const menuSlug = computed(() => String(normalized.value.menuSlug || ''))

const activeOption = computed(() =>
  FOOTER_TEMPLATE_OPTIONS.find((opt) => opt.value === activeId.value)
)

const activeBrand = computed(
  () => templates.value[activeId.value]?.brand || ''
)

const activeLinks = computed(
  (): FooterLink[] => templates.value[activeId.value]?.links || []
)

const activeSeparator = computed(
  (): FooterSeparatorId =>
    templates.value[activeId.value]?.separator || FOOTER_SEPARATOR_DOT
)

function emitNormalized(patch: Record<string, unknown>) {
  emit('update:modelValue', {
    ...normalized.value,
    ...patch,
  })
}

function setMenuSlug(value: string) {
  emitNormalized({ menuSlug: value })
}

function patchActive(next: {
  brand?: string
  links?: FooterLink[]
  separator?: FooterSeparatorId
}) {
  const current = templates.value[activeId.value]
  emitNormalized({
    templates: {
      ...templates.value,
      [activeId.value]: {
        brand: next.brand ?? current.brand,
        links: next.links ?? current.links,
        separator: next.separator ?? current.separator,
      },
    },
  })
}

function setBrand(value: string) {
  patchActive({ brand: value })
}

function setSeparator(value: string) {
  if (!isFooterSeparatorId(value)) return
  patchActive({ separator: value })
}

function setLinkField(
  index: number,
  key: 'label' | 'href',
  value: string
) {
  const links = activeLinks.value.map((row) => ({ ...row }))
  const row = links[index]
  if (!row) return
  row[key] = value
  patchActive({ links })
}

function onLinkInput(
  index: number,
  key: 'label' | 'href',
  event: Event
) {
  const target = event.target as HTMLInputElement | null
  setLinkField(index, key, target?.value ?? '')
}

function addLink() {
  patchActive({
    links: [...activeLinks.value, { label: '', href: '' }],
  })
}

function removeLink(index: number) {
  const links = [...activeLinks.value]
  links.splice(index, 1)
  patchActive({ links })
}

onMounted(() => {
  const next = normalizeFooterGlobalData(props.modelValue, locale.value)
  if (next.menuSlug === 'footer') {
    next.menuSlug = ''
  }
  if (JSON.stringify(next) !== JSON.stringify(props.modelValue)) {
    emit('update:modelValue', next)
  }
})
</script>
