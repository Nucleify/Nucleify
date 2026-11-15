<template>
  <div>
    <AdminPageHeader
      title="Menus"
      description="Primary navigation menus for header / footer."
      :primary="primary"
      :more="more"
    />

    <p v-if="error" class="admin-form__error">{{ error }}</p>

    <AdminSkeleton v-if="loading" height="10rem" />
    <CollectionList
      v-else
      :columns="columns"
      :rows="rows"
      :row-actions-for="rowActions"
      searchable
      storage-key="menus"
      empty-label="No menus yet."
    />

    <nui-dialog
      v-if="dialogOpen"
      visible
      :header="dialogTitle"
      width="42rem"
      dismissable-mask
      @hide="closeDialog"
    >
      <div class="admin-menu-editor">
        <div class="admin-menu-meta">
          <FieldText
            :model-value="slug"
            label="Menu slug"
            placeholder="primary"
            :disabled="Boolean(editingSlug)"
            @update:model-value="slug = $event"
          />
          <FieldText
            :model-value="label"
            label="Label"
            placeholder="Primary"
            @update:model-value="label = $event"
          />
          <FieldText
            :model-value="locale"
            label="Locale"
            placeholder="en"
            @update:model-value="locale = $event"
          />
        </div>

        <div class="admin-menu-editor__items-head">
          <h3 class="admin-menu-editor__items-title">Items</h3>
          <nui-button
            type="button"
            size="small"
            variant="outlined"
            label="Add item"
            @click="addItem"
          />
        </div>

        <AdminEmpty
          v-if="!menuItems.length"
          title="No items yet"
          description="Add a top-level link, then nest children if needed."
        />

        <div v-else class="admin-menu-tree">
          <div
            v-for="(item, index) in menuItems"
            :key="`item-${index}`"
            class="admin-menu-tree__item"
          >
            <div class="admin-menu-tree__toolbar">
              <span class="admin-menu-tree__index">{{ index + 1 }}</span>
              <div class="admin-menu-tree__move">
                <button
                  type="button"
                  class="admin-overflow__trigger"
                  aria-label="Move up"
                  :disabled="index === 0"
                  @click="moveItem(index, -1)"
                >
                  <nui-icon icon="mdi:chevron-up" width="1em" height="1em" />
                </button>
                <button
                  type="button"
                  class="admin-overflow__trigger"
                  aria-label="Move down"
                  :disabled="index === menuItems.length - 1"
                  @click="moveItem(index, 1)"
                >
                  <nui-icon icon="mdi:chevron-down" width="1em" height="1em" />
                </button>
              </div>
              <AdminRowActions :actions="itemActions(index)" />
            </div>
            <div class="admin-menu-tree__row">
              <FieldText
                :model-value="item.label"
                label="Label"
                dense
                @update:model-value="item.label = $event"
              />
              <FieldText
                :model-value="item.href"
                label="Href"
                dense
                @update:model-value="item.href = $event"
              />
            </div>

            <div
              v-if="item.children?.length"
              class="admin-menu-tree__children"
            >
              <div
                v-for="(child, cIndex) in item.children"
                :key="`child-${index}-${cIndex}`"
                class="admin-menu-tree__item admin-menu-tree__item--child"
              >
                <div class="admin-menu-tree__toolbar">
                  <span class="admin-menu-tree__index">
                    {{ index + 1 }}.{{ cIndex + 1 }}
                  </span>
                  <div class="admin-menu-tree__move">
                    <button
                      type="button"
                      class="admin-overflow__trigger"
                      aria-label="Move child up"
                      :disabled="cIndex === 0"
                      @click="moveChild(index, cIndex, -1)"
                    >
                      <nui-icon icon="mdi:chevron-up" width="1em" height="1em" />
                    </button>
                    <button
                      type="button"
                      class="admin-overflow__trigger"
                      aria-label="Move child down"
                      :disabled="cIndex === (item.children?.length || 0) - 1"
                      @click="moveChild(index, cIndex, 1)"
                    >
                      <nui-icon
                        icon="mdi:chevron-down"
                        width="1em"
                        height="1em"
                      />
                    </button>
                  </div>
                  <AdminRowActions :actions="childActions(index, cIndex)" />
                </div>
                <div class="admin-menu-tree__row">
                  <FieldText
                    :model-value="child.label"
                    label="Label"
                    dense
                    @update:model-value="child.label = $event"
                  />
                  <FieldText
                    :model-value="child.href"
                    label="Href"
                    dense
                    @update:model-value="child.href = $event"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <details class="admin-menu-advanced">
          <summary class="admin-muted">Advanced JSON</summary>
          <FieldJson
            :model-value="menuItems"
            label="Items JSON"
            :rows="8"
            @update:model-value="onItems"
          />
        </details>
      </div>

      <div slot="footer" class="admin-actions">
        <nui-button
          v-if="editingSlug"
          type="button"
          variant="outlined"
          label="Duplicate"
          @click="duplicateDraft"
        />
        <nui-button
          type="button"
          variant="outlined"
          label="Cancel"
          @click="closeDialog"
        />
        <nui-button
          type="button"
          variant="filled"
          :label="saving ? 'Saving…' : 'Save menu'"
          :disabled="saving"
          @click="save"
        />
      </div>
    </nui-dialog>
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'
import { useAdminToast } from '@admin'

useHead({ title: 'Menus' })

type MenuItem = {
  label: string
  href: string
  children?: MenuItem[]
}

const toast = useAdminToast()
const dialogOpen = ref(false)
const slug = ref('')
const label = ref('')
const locale = ref('en')
const editingSlug = ref<string | null>(null)
const menuItems = ref<MenuItem[]>([])
const rows = ref<Record<string, unknown>[]>([])
const error = ref('')
const loading = ref(true)
const saving = ref(false)

const columns = [
  { key: 'slug', label: 'Slug' },
  { key: 'label', label: 'Label', muted: true },
  { key: 'locale', label: 'Locale', muted: true },
  { key: 'items_count', label: 'Items', muted: true },
  { key: 'updated_at', label: 'Updated', muted: true },
]

const dialogTitle = computed(() =>
  editingSlug.value ? `Edit menu · ${editingSlug.value}` : 'New menu'
)

const primary = computed((): AdminAction[] => [
  {
    id: 'new',
    label: 'Create menu',
    onClick: () => openCreate(),
  },
])

const more = computed((): AdminAction[] => [
  { id: 'refresh', label: 'Refresh', onClick: () => load() },
])

function resetDraft() {
  slug.value = ''
  label.value = ''
  locale.value = 'en'
  menuItems.value = []
  editingSlug.value = null
  error.value = ''
}

function openCreate() {
  resetDraft()
  dialogOpen.value = true
}

function openEdit(row: Record<string, unknown>) {
  slug.value = String(row.slug || '')
  label.value = String(row.label || '')
  locale.value = String(row.locale || 'en')
  editingSlug.value = slug.value
  menuItems.value = Array.isArray(row.items)
    ? (structuredClone(row.items) as MenuItem[])
    : []
  error.value = ''
  dialogOpen.value = true
}

function closeDialog() {
  dialogOpen.value = false
}

function duplicateDraft() {
  slug.value = `${slug.value}-copy`
  label.value = `${label.value} copy`.trim()
  editingSlug.value = null
  toast.info('Slug unlocked — save to create a copy.')
}

function onItems(value: unknown) {
  menuItems.value = Array.isArray(value) ? (value as MenuItem[]) : []
}

function addItem() {
  menuItems.value = [...menuItems.value, { label: 'New item', href: '/' }]
}

function moveItem(index: number, delta: number) {
  const next = index + delta
  if (next < 0 || next >= menuItems.value.length) return
  const copy = [...menuItems.value]
  const [row] = copy.splice(index, 1)
  if (!row) return
  copy.splice(next, 0, row)
  menuItems.value = copy
}

function moveChild(parentIndex: number, childIndex: number, delta: number) {
  const parent = menuItems.value[parentIndex]
  if (!parent?.children) return
  const next = childIndex + delta
  if (next < 0 || next >= parent.children.length) return
  const copy = [...parent.children]
  const [row] = copy.splice(childIndex, 1)
  if (!row) return
  copy.splice(next, 0, row)
  parent.children = copy
}

function itemActions(index: number): AdminAction[] {
  return [
    {
      id: 'child',
      label: 'Add child',
      onClick: () => {
        const item = menuItems.value[index]
        if (!item) return
        item.children = [
          ...(item.children || []),
          { label: 'Child', href: '/' },
        ]
      },
    },
    {
      id: 'dup',
      label: 'Duplicate',
      onClick: () => {
        const item = menuItems.value[index]
        if (!item) return
        menuItems.value.splice(index + 1, 0, structuredClone(item))
      },
    },
    {
      id: 'del',
      label: 'Delete',
      danger: true,
      onClick: () => {
        menuItems.value.splice(index, 1)
      },
    },
  ]
}

function childActions(index: number, cIndex: number): AdminAction[] {
  return [
    {
      id: 'del',
      label: 'Delete child',
      danger: true,
      onClick: () => {
        menuItems.value[index]?.children?.splice(cIndex, 1)
      },
    },
  ]
}

function countItems(items: unknown): number {
  if (!Array.isArray(items)) return 0
  return items.reduce((sum, item) => {
    const children = (item as MenuItem)?.children
    return sum + 1 + (Array.isArray(children) ? children.length : 0)
  }, 0)
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const data =
      (await adminApiGet<Record<string, unknown>[]>('/api/admin/menus')) ?? []
    rows.value = data.map((row) => ({
      ...row,
      items_count: countItems(row.items),
      updated_at: row.updated_at
        ? new Date(String(row.updated_at)).toLocaleString()
        : '—',
    }))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load menus'
  } finally {
    loading.value = false
  }
}

async function save() {
  error.value = ''
  if (!slug.value.trim()) {
    error.value = 'Menu slug is required.'
    toast.error(error.value)
    return
  }
  saving.value = true
  try {
    await adminApiSend('/api/admin/menus', 'POST', {
      slug: slug.value,
      label: label.value,
      locale: locale.value,
      items: menuItems.value,
    })
    toast.success(editingSlug.value ? 'Menu updated.' : 'Menu created.')
    dialogOpen.value = false
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Save failed'
    toast.error(error.value)
  } finally {
    saving.value = false
  }
}

function rowActions(row: Record<string, unknown>): AdminAction[] {
  return [
    {
      id: 'edit',
      label: 'Edit',
      onClick: () => openEdit(row),
    },
  ]
}

onMounted(() => {
  void load()
})
</script>
