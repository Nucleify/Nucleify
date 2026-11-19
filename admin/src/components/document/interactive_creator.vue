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
import NucHoloCube from '@shared_modules/nuc_cms/parts/holo_cube/index.vue'
import type { AdminViewport } from '../ui/viewport'

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

<style lang="scss">
html.admin-creator-active,
html.admin-creator-active body {
  overflow: hidden;
}

@keyframes admin-creator-boot-loader {
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(320%);
  }
}

@keyframes admin-creator-refresh-spin {
  to {
    transform: rotate(360deg);
  }
}

.admin-creator {
  --admin-creator-sidebar-w: 26rem;
  position: fixed;
  inset: 0;
  z-index: 70;
  background: #fff;
}
.admin-creator__stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  background: #0b0f14;
  /* Keep preview clear of the edit rail — same geometry in every viewport. */
  transition: right 0.18s ease;
}
.admin-creator.is-sidebar-open .admin-creator__stage {
  right: var(--admin-creator-sidebar-w);
}
.admin-creator__viewport-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  padding: 0.55rem 0.85rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: #11161d;
}
.admin-creator__exit {
  width: var(--admin-control-h);
  min-width: var(--admin-control-h);
  padding: 0;
  border-color: rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.85);
  background: transparent;

  nui-icon {
    transform: scaleX(-1);
  }
}
.admin-creator__exit:hover:not(:disabled) {
  border-color: rgba(255, 255, 255, 0.35);
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
}
.admin-creator__draft-badge {
  margin: 0;
  padding: 0.2rem 0.55rem;
  border: 1px solid rgba(251, 191, 36, 0.35);
  border-radius: 0.25rem;
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
}
.admin-creator__viewport-hint {
  margin: 0;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.72rem;
}
.admin-creator__device {
  --admin-creator-preview-w: 100%;
  --admin-creator-preview-h: 100%;
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  min-height: 0;
  padding: 0.75rem;
  overflow: hidden;
}
.admin-creator__device.is-mobile {
  --admin-creator-preview-w: 390px;
  --admin-creator-preview-h: 844px;
}
.admin-creator__device.is-tablet {
  --admin-creator-preview-w: 834px;
  --admin-creator-preview-h: 1024px;
}
.admin-creator__device.is-desktop {
  --admin-creator-preview-w: 100%;
  --admin-creator-preview-h: 100%;
  align-items: stretch;
}
.admin-creator__frame {
  flex: 0 1 auto;
  align-self: center;
  width: 100%;
  max-width: var(--admin-creator-preview-w);
  height: var(--admin-creator-preview-h);
  max-height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.35rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  background: #03050c;
  transition:
    max-width 0.22s cubic-bezier(0.4, 0, 0.2, 1),
    height 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}
.admin-creator__device.is-desktop .admin-creator__frame {
  align-self: stretch;
}
@media (prefers-reduced-motion: reduce) {
  .admin-creator__frame {
    transition: none;
  }

  .admin-creator__stage {
    transition: none;
  }
}
.admin-creator__frame.is-booting {
  opacity: 0;
  pointer-events: none;
}
.admin-creator__boot {
  --rainbow-hue: 152deg;
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #03050c;
  color: #e7ebe8;
}
.admin-creator__boot-cube {
  flex: 0 0 auto;
  width: 150px;
  max-width: 150px;
  height: 150px;
  max-height: 150px;
  margin: 0;
  overflow: hidden;
  pointer-events: none;

  /* Kill marketing size / compact 100% — boot is a fixed chip. */
  .nuc-holo-cube {
    width: 150px !important;
    max-width: 150px !important;
    height: 150px !important;
    max-height: 150px !important;
    min-height: 0 !important;
    aspect-ratio: auto;
    margin: 0;
    overflow: hidden;
  }

  .nuc-holo-cube-aura {
    inset: 18% 20% 14%;
    filter: blur(2px);
    opacity: 0.7;
  }

  .nuc-holo-cube-bloom {
    opacity: 0.7;

    path {
      stroke-width: 3.2;
    }
  }
}
.admin-creator__boot-loader {
  flex: 0 0 auto;
  width: 150px;
  max-width: 100%;
  height: 3px;
  border-radius: 999px;
  background: rgb(255 255 255 / 10%);
  overflow: hidden;
}
.admin-creator__boot-loader-bar {
  display: block;
  width: 40%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    hsl(var(--rainbow-hue) 55% 52% / 35%),
    hsl(var(--rainbow-hue) 55% 52%),
    hsl(calc(var(--rainbow-hue) + 38deg) 90% 62%)
  );
  animation: admin-creator-boot-loader 1.1s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .admin-creator__boot-loader-bar {
    width: 100%;
    animation: none;
    opacity: 0.55;
  }
}
.admin-creator__empty {
  flex: 0 1 auto;
  align-self: center;
  width: 100%;
  max-width: var(--admin-creator-preview-w);
  height: var(--admin-creator-preview-h);
  max-height: 100%;
  display: grid;
  place-items: center;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.35rem;
  background: var(--admin-bg);
}
.admin-creator__device.is-desktop .admin-creator__empty {
  align-self: stretch;
}
.admin-creator__sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 71;
  display: flex;
  flex-direction: column;
  width: min(100%, var(--admin-creator-sidebar-w));
  min-width: 0;
  overflow: hidden;
  background: var(--admin-surface);
  border-left: 1px solid var(--admin-border);
  box-shadow: -12px 0 32px rgba(0, 0, 0, 0.35);
  transform: translateX(0);
  transition: transform 0.18s ease;
}
.admin-creator:not(.is-sidebar-open) .admin-creator__sidebar {
  transform: translateX(100%);
  pointer-events: none;
  box-shadow: none;
}
.admin-creator__sidebar-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--admin-border);
}
.admin-creator__sidebar-titles {
  min-width: 0;
}
.admin-creator__sidebar-head-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.35rem;
}
.admin-creator__refresh {
  color: var(--admin-muted);
}
.admin-creator__refresh:hover:not(:disabled) {
  color: var(--admin-text);
}
.admin-creator__refresh-icon {
  display: block;
}
.admin-creator__refresh.is-spinning .admin-creator__refresh-icon,
.admin-creator__refresh.is-spinning nui-icon {
  animation: admin-creator-refresh-spin 0.7s linear infinite;
}
.admin-creator__sidebar-head h2 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}
.admin-creator__sidebar-meta {
  margin: 0.2rem 0 0;
  color: var(--admin-muted);
  font-size: 0.75rem;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.admin-creator__sidebar-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--admin-border);
}
.admin-creator__sidebar-body {
  flex: 1;
  overflow: auto;
  padding: 1rem;
}
/*
 * Preview still booting — shell keeps pointer-events so cursor: not-allowed
 * paints; children are none so fields/buttons cannot be hit.
 * (Do not use `inert` here — it lets events fall through to the iframe.)
 */
.admin-creator__sidebar.is-locked .admin-creator__sidebar-actions,
.admin-creator__sidebar.is-locked .admin-creator__sidebar-body,
.admin-creator__sidebar.is-locked .admin-creator__refresh {
  opacity: 0.55;
  cursor: not-allowed;
  user-select: none;
  pointer-events: auto;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 5;
    cursor: not-allowed;
  }

  * {
    pointer-events: none !important;
  }
}
.admin-creator__sidebar.is-locked .admin-creator__sidebar-actions,
.admin-creator__sidebar.is-locked .admin-creator__sidebar-body,
.admin-creator__sidebar.is-locked .admin-creator__refresh {
  position: relative;
}
.admin-creator__sidebar-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 12rem;
  height: 100%;
  padding: 2rem 1rem;
}
.admin-creator__sidebar-body .admin-document-grid {
  grid-template-columns: 1fr;
}
.admin-creator__rail-toggle {
  position: fixed;
  top: 1.25rem;
  right: 0;
  z-index: 72;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  height: auto;
  min-height: 5rem;
  padding: 0.75rem 0.45rem;
  border: 1px solid var(--admin-border);
  border-right: 0;
  border-radius: var(--admin-radius) 0 0 var(--admin-radius);
  background: var(--admin-surface-2);
  color: var(--admin-text);
  font: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.25);
}
.admin-creator__viewport-bar .admin-viewport-toggle__label {
  color: rgba(255, 255, 255, 0.45);
}
.admin-creator__viewport-bar .admin-viewport-toggle__btn {
  border-color: rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.55);
}
.admin-creator__viewport-bar .admin-viewport-toggle__btn.is-active {
  border-color: rgba(255, 255, 255, 0.45);
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}
</style>
