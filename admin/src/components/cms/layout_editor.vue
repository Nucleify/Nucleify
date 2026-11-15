<template>
  <FieldShell :label="label" :description="description" :error="error">
    <div class="admin-layout-editor">
      <div class="admin-layout-editor__toolbar">
        <div class="admin-layout-editor__toolbar-row">
          <nui-button
            type="button"
            fluid
            variant="outlined"
            label="Collapse all"
            @click="collapseAll"
          />
          <nui-button
            type="button"
            fluid
            variant="outlined"
            label="Expand all"
            @click="expandAll"
          />
        </div>
        <nui-button
          type="button"
          fluid
          variant="filled"
          label="Add section"
          @click="pickerOpen = true"
        />
        <nui-button
          v-if="clipboard"
          type="button"
          fluid
          variant="outlined"
          label="Paste props"
          @click="pasteOntoFirst"
        />
      </div>

      <TransitionGroup
        ref="listEl"
        name="admin-layout-editor-shift"
        tag="div"
        class="admin-layout-editor__list"
        :class="{ 'is-dragging': dragIndex !== null }"
      >
          <div
            v-for="item in displayItems"
            :key="item.key"
            :class="
              item.kind === 'placeholder'
                ? 'admin-layout-editor__placeholder'
                : [
                    'admin-layout-editor__row',
                    {
                      'is-collapsed': isCollapsed(item.section.id),
                      'is-draggable': item.kind === 'section',
                    },
                  ]
            "
            :style="
              item.kind === 'placeholder'
                ? { minHeight: `${dragHeight}px` }
                : undefined
            "
            :data-source-index="
              item.kind === 'section' ? item.sourceIndex : undefined
            "
            :title="item.kind === 'section' ? 'Drag to reorder' : undefined"
            @pointerdown="
              item.kind === 'section'
                ? onRowPointerDown(item.sourceIndex, $event)
                : undefined
            "
          >
            <template v-if="item.kind === 'section'">
              <div class="admin-layout-editor__handle">
                <button
                  type="button"
                  class="admin-layout-editor__move"
                  aria-label="Move up"
                  :disabled="item.sourceIndex === 0"
                  @click.stop="move(item.sourceIndex, -1)"
                  @pointerdown.stop
                >
                  ↑
                </button>
                <button
                  type="button"
                  class="admin-layout-editor__move"
                  aria-label="Move down"
                  :disabled="item.sourceIndex >= sections.length - 1"
                  @click.stop="move(item.sourceIndex, 1)"
                  @pointerdown.stop
                >
                  ↓
                </button>
              </div>
              <div class="admin-layout-editor__body">
                <div class="admin-layout-editor__meta">
                  <div class="admin-layout-editor__meta-main">
                    <button
                      type="button"
                      class="admin-filter-chip admin-layout-editor__toggle"
                      :aria-expanded="
                        isCollapsed(item.section.id) ? 'false' : 'true'
                      "
                      @click="toggleCollapsed(item.section.id)"
                    >
                      <span
                        class="admin-layout-editor__toggle-icon"
                        aria-hidden="true"
                      >
                        {{ isCollapsed(item.section.id) ? '›' : '⌄' }}
                      </span>
                      <span class="admin-layout-editor__toggle-label">
                        {{ railLabel(item.section) }}
                      </span>
                      <span class="admin-layout-editor__type">
                        {{ item.section.type }}
                      </span>
                    </button>
                    <span
                      v-if="!resolveWidget(item.section.type)"
                      class="admin-badge admin-badge--warn"
                    >
                      Unknown type
                    </span>
                    <span
                      v-if="item.section.props?.showSection === false"
                      class="admin-badge admin-badge--info"
                    >
                      Hidden
                    </span>
                  </div>
                  <div
                    class="admin-layout-editor__actions"
                    @pointerdown.stop
                  >
                    <AdminRowActions
                      :actions="sectionActions(item.section, item.sourceIndex)"
                    />
                  </div>
                </div>

                <div
                  v-if="!isCollapsed(item.section.id)"
                  class="admin-layout-editor__body-fields"
                  @pointerdown.stop
                >
                  <div class="admin-layout-editor__tabs">
                    <button
                      type="button"
                      class="admin-layout-editor__tab"
                      :class="{
                        'is-active': tabFor(item.section.id) === 'content',
                      }"
                      @click="setTab(item.section.id, 'content')"
                    >
                      Content
                    </button>
                    <button
                      type="button"
                      class="admin-layout-editor__tab"
                      :class="{
                        'is-active': tabFor(item.section.id) === 'advanced',
                      }"
                      @click="setTab(item.section.id, 'advanced')"
                    >
                      Advanced
                    </button>
                  </div>

                  <SchemaFormRenderer
                    v-if="
                      tabFor(item.section.id) === 'content' &&
                      propsFields(item.section.type).length
                    "
                    :fields="propsFields(item.section.type)"
                    :model-value="item.section.props"
                    position="all"
                    @update:model-value="setProps(item.sourceIndex, $event)"
                  />
                  <FieldJson
                    v-else-if="tabFor(item.section.id) === 'advanced'"
                    :model-value="item.section.props"
                    label="Props JSON"
                    :rows="8"
                    @update:model-value="setPropsRaw(item.sourceIndex, $event)"
                  />
                  <FieldJson
                    v-else
                    :model-value="item.section.props"
                    label="Props"
                    :rows="5"
                    @update:model-value="setPropsRaw(item.sourceIndex, $event)"
                  />
                </div>
              </div>
            </template>
          </div>
      </TransitionGroup>

      <AdminConfirmDialog
        :open="removeIndex !== null"
        title="Remove section?"
        message="This section will be removed from the layout."
        confirm-label="Remove"
        @confirm="confirmRemove"
        @cancel="removeIndex = null"
      />

      <nui-dialog
        v-if="pickerOpen"
        visible
        header="Add section"
        width="42rem"
        dismissable-mask
        @hide="pickerOpen = false"
      >
        <WidgetPicker
          :allowed-types="allowedTypes"
          @pick="onPickWidget"
        />
        <div slot="footer" class="admin-actions">
          <nui-button
            type="button"
            variant="outlined"
            label="Cancel"
            @click="pickerOpen = false"
          />
        </div>
      </nui-dialog>
    </div>
  </FieldShell>
</template>

<script setup lang="ts">
import {
  defaultPropsForType,
  getPostBlock,
  getWidget,
} from '@shared_modules'

import { fieldsFromPropsSchema } from '../../utils/widget_props_fields'
import type { AdminAction } from '../../types/actions'

type Section = {
  id: string
  type: string
  order: number
  props: Record<string, unknown>
}

const props = withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    modelValue?: Section[]
    allowedTypes?: string[]
  }>(),
  {
    label: '',
    description: '',
    error: '',
    modelValue: () => [],
    allowedTypes: () => [],
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: Section[]]
}>()

const listEl = ref<{ $el?: HTMLElement } | HTMLElement | null>(null)
const dragIndex = ref<number | null>(null)
const dropSlot = ref<number | null>(null)
const dragHeight = ref(48)
const collapsed = ref<Record<string, boolean>>({})
const tabs = ref<Record<string, 'content' | 'advanced'>>({})
const pickerOpen = ref(false)
const clipboard = ref<Record<string, unknown> | null>(null)
const removeIndex = ref<number | null>(null)

let dragGhostEl: HTMLElement | null = null
let dragPointerId: number | null = null
let dragOffsetX = 0
let dragOffsetY = 0
let dragMoved = false
let dragArmed = false
let pendingIndex: number | null = null
let pendingRow: HTMLElement | null = null
let startX = 0
let startY = 0
const DRAG_THRESHOLD_PX = 4

const sections = computed(() =>
  [...(props.modelValue ?? [])].sort((a, b) => a.order - b.order)
)

type DisplayItem =
  | { kind: 'section'; key: string; section: Section; sourceIndex: number }
  | { kind: 'placeholder'; key: string }

const displayItems = computed((): DisplayItem[] => {
  const list = sections.value
  if (dragIndex.value === null || dropSlot.value === null) {
    return list.map((section, sourceIndex) => ({
      kind: 'section',
      key: section.id,
      section,
      sourceIndex,
    }))
  }
  const from = dragIndex.value
  const remaining = list
    .map((section, sourceIndex) => ({ section, sourceIndex }))
    .filter((_, i) => i !== from)
  const slot = Math.max(0, Math.min(dropSlot.value, remaining.length))
  const items: DisplayItem[] = []
  for (let i = 0; i < remaining.length; i++) {
    if (i === slot) {
      items.push({ kind: 'placeholder', key: '__drag_placeholder__' })
    }
    const row = remaining[i]
    if (!row) continue
    items.push({
      kind: 'section',
      key: row.section.id,
      section: row.section,
      sourceIndex: row.sourceIndex,
    })
  }
  if (slot >= remaining.length) {
    items.push({ kind: 'placeholder', key: '__drag_placeholder__' })
  }
  return items
})

function listRoot(): HTMLElement | null {
  const el = listEl.value
  if (!el) return null
  if (el instanceof HTMLElement) return el
  return el.$el ?? null
}

onBeforeUnmount(() => {
  teardownDrag()
})

/** Default collapsed — avoid expanded→collapsed jump on first paint / refresh. */
function isCollapsed(id: string) {
  return collapsed.value[id] !== false
}

function ensureCollapsedDefaults(list: Section[]) {
  let changed = false
  const next = { ...collapsed.value }
  for (const section of list) {
    if (next[section.id] === undefined) {
      next[section.id] = true
      changed = true
    }
  }
  if (changed) collapsed.value = next
}

watch(
  sections,
  (list) => {
    ensureCollapsedDefaults(list)
  },
  { deep: true, immediate: true }
)

function resolveWidget(type: string) {
  return getWidget(type) || getPostBlock(type)
}

function labelFor(type: string): string {
  return resolveWidget(type)?.label || type
}

function railLabel(section: Section): string {
  const rail = section.props?.railLabel
  if (typeof rail === 'string' && rail.trim()) return rail
  return labelFor(section.type)
}

function propsFields(type: string) {
  const widget = resolveWidget(type)
  if (!widget) return []
  if (widget.adminFields?.length) return widget.adminFields
  return fieldsFromPropsSchema(widget.propsSchema)
}

function tabFor(id: string) {
  return tabs.value[id] || 'content'
}

function setTab(id: string, tab: 'content' | 'advanced') {
  tabs.value = { ...tabs.value, [id]: tab }
}

function toggleCollapsed(id: string) {
  collapsed.value = { ...collapsed.value, [id]: !isCollapsed(id) }
}

function collapseAll() {
  const next: Record<string, boolean> = {}
  for (const s of sections.value) next[s.id] = true
  collapsed.value = next
}

function expandAll() {
  const next: Record<string, boolean> = {}
  for (const s of sections.value) next[s.id] = false
  collapsed.value = next
}

function emitOrdered(next: Section[]) {
  emit(
    'update:modelValue',
    next.map((s, i) => ({ ...s, order: i }))
  )
}

function removeAt(index: number) {
  removeIndex.value = index
}

function confirmRemove() {
  if (removeIndex.value === null) return
  const list = [...sections.value]
  list.splice(removeIndex.value, 1)
  removeIndex.value = null
  emitOrdered(list)
}

function setProps(index: number, value: Record<string, unknown>) {
  const list = [...sections.value]
  const row = list[index]
  if (!row) return
  list[index] = { ...row, props: value }
  emitOrdered(list)
}

function setPropsRaw(index: number, value: unknown) {
  const next =
    value && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {}
  setProps(index, next)
}

function duplicateAt(index: number) {
  const list = [...sections.value]
  const row = list[index]
  if (!row) return
  const copy: Section = {
    ...row,
    id: `sec_${Date.now().toString(36)}`,
    props: structuredClone(row.props || {}),
  }
  list.splice(index + 1, 0, copy)
  emitOrdered(list)
}

function move(index: number, delta: number) {
  const target = index + delta
  if (target < 0 || target >= sections.value.length) return
  const list = [...sections.value]
  const [row] = list.splice(index, 1)
  if (!row) return
  list.splice(target, 0, row)
  emitOrdered(list)
}

function toggleVisibility(index: number) {
  const row = sections.value[index]
  if (!row) return
  const show = row.props?.showSection !== false
  setProps(index, { ...row.props, showSection: !show })
}

function copyProps(index: number) {
  const row = sections.value[index]
  if (!row) return
  clipboard.value = structuredClone(row.props || {})
  void navigator.clipboard?.writeText(JSON.stringify(row.props || {}, null, 2))
}

function pasteOnto(index: number) {
  if (!clipboard.value) return
  setProps(index, structuredClone(clipboard.value))
}

function pasteOntoFirst() {
  if (!sections.value.length) return
  pasteOnto(0)
}

function sectionActions(section: Section, index: number): AdminAction[] {
  return [
    {
      id: 'dup',
      label: 'Duplicate',
      onClick: () => duplicateAt(index),
    },
    {
      id: 'up',
      label: 'Move up',
      disabled: index === 0,
      onClick: () => move(index, -1),
    },
    {
      id: 'down',
      label: 'Move down',
      disabled: index >= sections.value.length - 1,
      onClick: () => move(index, 1),
    },
    {
      id: 'vis',
      label:
        section.props?.showSection === false ? 'Show section' : 'Hide section',
      onClick: () => toggleVisibility(index),
    },
    {
      id: 'copy',
      label: 'Copy props JSON',
      onClick: () => copyProps(index),
    },
    {
      id: 'paste',
      label: 'Paste props',
      disabled: !clipboard.value,
      onClick: () => pasteOnto(index),
    },
    {
      id: 'remove',
      label: 'Remove',
      danger: true,
      onClick: () => removeAt(index),
    },
  ]
}

function addSection(type: string) {
  const id = `sec_${Date.now().toString(36)}`
  collapsed.value = { ...collapsed.value, [id]: false }
  emitOrdered([
    ...sections.value,
    {
      id,
      type,
      order: sections.value.length,
      props:
        defaultPropsForType(type) ||
        getPostBlock(type)?.defaultProps?.() ||
        {},
    },
  ])
}

function onPickWidget(type: string) {
  addSection(type)
  pickerOpen.value = false
}

function clearDragGhost() {
  dragGhostEl?.remove()
  dragGhostEl = null
}

function positionGhost(clientX: number, clientY: number) {
  if (!dragGhostEl) return
  dragGhostEl.style.left = `${clientX - dragOffsetX}px`
  dragGhostEl.style.top = `${clientY - dragOffsetY}px`
}

function updateDropSlotFromPoint(clientY: number) {
  const root = listRoot()
  if (!root || dragIndex.value === null) return
  const rows = [
    ...root.querySelectorAll<HTMLElement>('.admin-layout-editor__row'),
  ]
  if (!rows.length) {
    dropSlot.value = 0
    return
  }
  for (const row of rows) {
    const rect = row.getBoundingClientRect()
    if (clientY < rect.top + rect.height / 2) {
      const sourceIndex = Number(row.dataset.sourceIndex)
      let slot = sourceIndex
      if (dragIndex.value < sourceIndex) slot -= 1
      dropSlot.value = Math.max(0, slot)
      return
    }
  }
  const last = rows[rows.length - 1]
  const lastIndex = Number(last?.dataset.sourceIndex ?? sections.value.length - 1)
  let slot = lastIndex + 1
  if (dragIndex.value < slot) slot -= 1
  dropSlot.value = slot
}

function suppressNextClick() {
  const suppress = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    window.removeEventListener('click', suppress, true)
  }
  window.addEventListener('click', suppress, true)
}

function beginDrag(index: number, row: HTMLElement, clientX: number, clientY: number) {
  dragArmed = true
  dragMoved = true
  dragHeight.value = Math.max(row.offsetHeight, 40)

  const rect = row.getBoundingClientRect()
  const clone = row.cloneNode(true) as HTMLElement
  clone.classList.add('admin-layout-editor__row--ghost')
  clone.style.width = `${rect.width}px`
  clone.style.position = 'fixed'
  clone.style.margin = '0'
  clone.style.zIndex = '9999'
  clone.style.pointerEvents = 'none'
  document.body.appendChild(clone)
  dragGhostEl = clone
  positionGhost(clientX, clientY)

  dragIndex.value = index
  dropSlot.value = index
  pendingIndex = null
  pendingRow = null
}

function onRowPointerDown(index: number, event: PointerEvent) {
  if (event.button !== 0) return
  const row = event.currentTarget as HTMLElement
  if (!row.classList.contains('admin-layout-editor__row')) return

  dragMoved = false
  dragArmed = false
  dragPointerId = event.pointerId
  pendingIndex = index
  pendingRow = row
  startX = event.clientX
  startY = event.clientY
  const rect = row.getBoundingClientRect()
  dragOffsetX = event.clientX - rect.left
  dragOffsetY = event.clientY - rect.top

  window.addEventListener('pointermove', onRowPointerMove)
  window.addEventListener('pointerup', onRowPointerUp)
  window.addEventListener('pointercancel', onRowPointerUp)
}

function onRowPointerMove(event: PointerEvent) {
  if (dragPointerId !== event.pointerId) return

  if (!dragArmed) {
    if (pendingIndex === null || !pendingRow) return
    const dx = event.clientX - startX
    const dy = event.clientY - startY
    if (dx * dx + dy * dy < DRAG_THRESHOLD_PX * DRAG_THRESHOLD_PX) return
    event.preventDefault()
    beginDrag(pendingIndex, pendingRow, event.clientX, event.clientY)
    return
  }

  if (dragIndex.value === null) return
  event.preventDefault()
  positionGhost(event.clientX, event.clientY)
  updateDropSlotFromPoint(event.clientY)
}

function onRowPointerUp(event: PointerEvent) {
  if (dragPointerId !== null && event.pointerId !== dragPointerId) return

  const from = dragIndex.value
  const to = dropSlot.value
  const shouldCommit =
    dragArmed && dragMoved && from !== null && to !== null && from !== to

  if (dragArmed) suppressNextClick()
  teardownDrag()

  if (!shouldCommit || from === null || to === null) return
  const list = [...sections.value]
  const [row] = list.splice(from, 1)
  if (!row) return
  list.splice(to, 0, row)
  emitOrdered(list)
}

function teardownDrag() {
  window.removeEventListener('pointermove', onRowPointerMove)
  window.removeEventListener('pointerup', onRowPointerUp)
  window.removeEventListener('pointercancel', onRowPointerUp)
  clearDragGhost()
  dragPointerId = null
  dragMoved = false
  dragArmed = false
  pendingIndex = null
  pendingRow = null
  dragIndex.value = null
  dropSlot.value = null
}
</script>
