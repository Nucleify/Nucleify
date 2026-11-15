<template>
  <Teleport to="body">
    <div
      class="admin-creator"
      :class="{ 'is-sidebar-open': sidebarOpen }"
      role="dialog"
      aria-modal="true"
      aria-label="Interactive creator"
    >
      <div class="admin-creator__stage">
        <div class="admin-creator__viewport-bar">
          <button
            type="button"
            class="admin-control-btn admin-creator__exit"
            aria-label="Exit"
            title="Exit"
            @click="emit('exit')"
          >
            <nui-icon icon="mdi:exit-to-app" width="1.15em" height="1.15em" />
          </button>
          <AdminViewportToggle v-model="viewport" label="Preview size" />
          <p class="admin-creator__draft-badge">Draft preview — not published</p>
          <p class="admin-creator__viewport-hint">
            Resizes the preview frame only — does not reload, so animations stay
            intact.
          </p>
        </div>
        <div
          class="admin-creator__device"
          :class="`is-${viewport}`"
        >
          <iframe
            v-if="previewUrl"
            ref="frameEl"
            :key="frameKey"
            class="admin-creator__frame"
            :class="{ 'is-booting': showBoot }"
            :src="previewUrl"
            title="Page preview"
            tabindex="-1"
            @load="onFrameLoad"
          />
          <div
            v-if="showBoot"
            class="admin-creator__boot"
            aria-busy="true"
            aria-live="polite"
          >
            <div class="admin-creator__boot-cube">
              <NucHoloCube focus="sdk" compact :faces="bootFaces" />
            </div>
            <div
              class="admin-creator__boot-loader"
              role="progressbar"
              aria-label="Loading preview"
            >
              <span class="admin-creator__boot-loader-bar" />
            </div>
          </div>
          <div v-else-if="showEmpty" class="admin-creator__empty">
            <AdminEmpty
              title="Preview not ready"
              description="Save a draft first, then open the interactive creator again."
            />
          </div>
        </div>
      </div>

      <aside
        class="admin-creator__sidebar"
        :class="{ 'is-locked': sidebarLocked }"
        :aria-hidden="sidebarOpen ? 'false' : 'true'"
        :aria-busy="sidebarLocked ? 'true' : undefined"
      >
        <div class="admin-creator__sidebar-head">
          <div class="admin-creator__sidebar-titles">
            <h2>Edit</h2>
            <p v-if="title && !loading" class="admin-creator__sidebar-meta">
              {{ title }}
            </p>
          </div>
          <div class="admin-creator__sidebar-head-actions">
            <button
              type="button"
              class="admin-overflow__trigger admin-creator__refresh"
              :class="{ 'is-spinning': refreshing }"
              :disabled="sidebarLocked || !previewUrl"
              :aria-label="refreshing ? 'Refreshing preview' : 'Refresh preview'"
              :title="refreshing ? 'Refreshing…' : 'Refresh'"
              @click="emit('refresh')"
            >
              <nui-icon
                class="admin-creator__refresh-icon"
                icon="mdi:refresh"
                width="1.15em"
                height="1.15em"
              />
            </button>
            <button
              type="button"
              class="admin-overflow__trigger"
              aria-label="Collapse editor"
              @click="sidebarOpen = false"
            >
              <span class="admin-overflow__trigger-icon" aria-hidden="true">›</span>
            </button>
          </div>
        </div>

        <div v-if="!loading" class="admin-creator__sidebar-actions">
          <button
            type="button"
            class="admin-control-btn"
            :disabled="sidebarLocked || draftDisabled"
            @click="emit('save-draft')"
          >
            {{ draftLabel }}
          </button>
          <button
            type="button"
            class="admin-control-btn admin-control-btn--filled"
            :disabled="sidebarLocked || publishDisabled"
            @click="emit('publish')"
          >
            {{ publishLabel }}
          </button>
          <button
            v-if="showUnpublish"
            type="button"
            class="admin-control-btn"
            :disabled="sidebarLocked || unpublishDisabled"
            @click="emit('unpublish')"
          >
            Unpublish
          </button>
        </div>

        <div class="admin-creator__sidebar-body">
          <div
            v-if="loading"
            class="admin-creator__sidebar-loading"
            aria-live="polite"
          >
            <AdminProgressSpinner label="Loading editor" />
          </div>
          <slot v-else />
        </div>
      </aside>

      <button
        v-if="!sidebarOpen"
        type="button"
        class="admin-creator__rail-toggle"
        @click="sidebarOpen = true"
      >
        Edit
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {
  isPreviewReadyMessage,
  previewUpdateMessage,
  type NucHomeModuleLaneId,
  type PreviewLivePayload,
} from '@shared_modules'
import { NucHoloCube } from '@shared_modules'
import type { AdminViewport } from '../ui/admin_viewport'

const bootFaces: Array<{ id: NucHomeModuleLaneId; label: string }> = [
  { id: 'ui', label: 'UI' },
  { id: 'sdk', label: 'SDK' },
  { id: 'data', label: 'Data' },
]

const props = withDefaults(
  defineProps<{
    previewUrl?: string
    frameKey?: string | number
    refreshing?: boolean
    /** Full sidebar gate — spinner only until doc/fields are ready. */
    loading?: boolean
    title?: string
    draftLabel?: string
    publishLabel?: string
    draftDisabled?: boolean
    publishDisabled?: boolean
    unpublishDisabled?: boolean
    showUnpublish?: boolean
    livePayload?: PreviewLivePayload | null
    targetOrigin?: string
  }>(),
  {
    previewUrl: '',
    frameKey: 0,
    refreshing: false,
    loading: false,
    title: '',
    draftLabel: 'Save draft',
    publishLabel: 'Publish',
    draftDisabled: false,
    publishDisabled: false,
    unpublishDisabled: false,
    showUnpublish: false,
    livePayload: null,
    targetOrigin: '',
  }
)

const emit = defineEmits<{
  refresh: []
  exit: []
  'save-draft': []
  publish: []
  unpublish: []
}>()

const sidebarOpen = ref(true)
const frameEl = ref<HTMLIFrameElement | null>(null)
/** Iframe can receive live postMessage (document loaded). */
const frameListening = ref(false)
/** Preview finished iris/hero paint — safe to drop the cube overlay. */
const framePainted = ref(false)
const viewport = ref<AdminViewport>('desktop')
/** Cube loader while doc/preview boot — not the empty "Preview not ready" state. */
const showBoot = computed(() => {
  if (props.loading || props.refreshing) return true
  if (props.previewUrl && !framePainted.value) return true
  return false
})
/** Lock sidebar fields/buttons until preview paint (and during doc/refresh). */
const sidebarLocked = computed(() => {
  if (props.loading || props.refreshing) return true
  if (props.previewUrl && !framePainted.value) return true
  return false
})
/** Only after boot settled and preview URL is still missing. */
const showEmpty = computed(
  () => !props.loading && !props.refreshing && !props.previewUrl
)
let pushTimer: ReturnType<typeof setTimeout> | null = null
let resizeTimer: ReturnType<typeof setTimeout> | null = null

const resolvedOrigin = computed(() => {
  if (props.targetOrigin) return props.targetOrigin.replace(/\/$/, '')
  try {
    return props.previewUrl ? new URL(props.previewUrl).origin : '*'
  } catch {
    return '*'
  }
})

/** Notify the iframe of a soft resize without remounting (keeps motion state). */
function notifyFrameResize() {
  const win = frameEl.value?.contentWindow
  if (!win || !frameListening.value) return
  if (resizeTimer) clearTimeout(resizeTimer)
  // Match `.admin-creator__frame` max-width transition so the iframe
  // settles on the final width, not a mid-tween size.
  resizeTimer = setTimeout(() => {
    resizeTimer = null
    try {
      win.dispatchEvent(new Event('resize'))
      // matchMedia('change') fires from the iframe viewport width change;
      // an extra resize helps scroll/snap gates re-sync without replaying reveals.
    } catch {
      // cross-origin preview — CSS media queries still apply inside the frame
    }
  }, 240)
}

watch(viewport, async () => {
  await nextTick()
  notifyFrameResize()
})

watch(sidebarOpen, async () => {
  await nextTick()
  notifyFrameResize()
})

function pushLiveUpdate() {
  const win = frameEl.value?.contentWindow
  const payload = props.livePayload
  if (!win || !payload || !frameListening.value) return
  // Prefer concrete origin; fall back to * when local ports drift.
  const target = resolvedOrigin.value || '*'
  win.postMessage(previewUpdateMessage(payload), target)
}

function scheduleLivePush() {
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(() => {
    pushTimer = null
    // Keep focus in the admin field — iframe updates must not steal it.
    const active = document.activeElement as HTMLElement | null
    pushLiveUpdate()
    if (
      active &&
      typeof active.focus === 'function' &&
      document.contains(active) &&
      document.activeElement !== active
    ) {
      active.focus({ preventScroll: true })
    }
  }, 220)
}

function onFrameLoad() {
  // Listening only — do not drop the cube yet (iris would flash the grid).
  frameListening.value = true
  pushLiveUpdate()
}

function onMessage(event: MessageEvent) {
  if (resolvedOrigin.value !== '*' && event.origin !== resolvedOrigin.value) {
    return
  }
  if (!isPreviewReadyMessage(event.data)) return
  frameListening.value = true
  framePainted.value = true
  pushLiveUpdate()
}

watch(
  () => props.previewUrl,
  (url) => {
    frameListening.value = false
    framePainted.value = false
    if (url && !sidebarOpen.value) sidebarOpen.value = true
  }
)

watch(
  () => props.frameKey,
  () => {
    frameListening.value = false
    framePainted.value = false
  }
)

watch(
  () => props.livePayload,
  () => {
    scheduleLivePush()
  },
  { deep: true }
)

onMounted(() => {
  document.documentElement.classList.add('admin-creator-active')
  window.addEventListener('message', onMessage)
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('admin-creator-active')
  window.removeEventListener('message', onMessage)
  if (pushTimer) clearTimeout(pushTimer)
  if (resizeTimer) clearTimeout(resizeTimer)
})
</script>
