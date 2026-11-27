import { useRoute, useRuntimeConfig, useSeoMeta } from 'nuxt/app'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watchEffect,
} from 'vue'

import { type FrameVariant, useFramePage } from './use_frame_page'

import {
  isPreviewUpdateMessage,
  type PreviewLivePayload,
  previewReadyMessage,
} from '../cms/preview_live'
import type { PageSection } from '../cms/validate_layout'
import {
  activeSlideIndex,
  freezeScrollerForReorder,
  whenFrameReady,
} from '../utils/frame_scroll'

const VARIANT_BY_SLUG: Record<string, FrameVariant> = {
  home: 'product',
  investor: 'pitch',
  'migrations-company': 'pitch',
  'thank-you': 'thankYou',
}

function normalizeSections(raw: unknown): PageSection[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((item): item is Record<string, unknown> =>
      Boolean(item && typeof item === 'object' && !Array.isArray(item))
    )
    .map((item, index) => ({
      id: String(item.id ?? `section-${index}`),
      type: String(item.type ?? ''),
      order: Number(item.order ?? index),
      props:
        item.props &&
        typeof item.props === 'object' &&
        !Array.isArray(item.props)
          ? (item.props as Record<string, unknown>)
          : {},
    }))
    .filter((s) => Boolean(s.type))
}

/** Order-independent section identity (add/remove / type change). */
function identityKey(sections: PageSection[]): string {
  return [...sections]
    .map((s) => `${s.id}:${s.type}`)
    .sort()
    .join('|')
}

function orderKey(sections: PageSection[]): string {
  return sections.map((s) => s.id).join('|')
}

function patchSectionProps(
  target: Record<string, unknown>,
  incoming: Record<string, unknown>
) {
  for (const key of Object.keys(target)) {
    if (!(key in incoming)) delete target[key]
  }
  Object.assign(target, incoming)
}

function captureSlideIndex(opts?: { softReorder?: boolean }): number {
  if (!import.meta.client) return 0
  const root = document.querySelector('.nuc-frame') as HTMLElement | null
  if (!root) return 0
  // Arm before sections mutate — Vue watchers run too late for IO leave.
  if (opts?.softReorder) root.dataset.softReorder = '1'
  freezeScrollerForReorder(root)
  return activeSlideIndex(root)
}

/** Keep object identity for unchanged id+type rows so Vue does not remount them. */
function mergeLiveSections(
  prev: PageSection[],
  next: PageSection[]
): PageSection[] {
  const byId = new Map(prev.map((row) => [row.id, row]))
  const merged: PageSection[] = []
  for (const src of next) {
    const row = byId.get(src.id)
    if (row && row.type === src.type) {
      row.order = src.order
      if (!row.props || typeof row.props !== 'object') {
        row.props = { ...(src.props ?? {}) }
      } else {
        patchSectionProps(row.props, src.props ?? {})
      }
      merged.push(row)
    } else {
      merged.push({
        id: src.id,
        type: src.type,
        order: src.order,
        props: { ...(src.props ?? {}) },
      })
    }
  }
  return merged
}

function applyChrome(
  frame: ReturnType<typeof useFramePage>,
  chrome: {
    enableIris: boolean
    showMenu: boolean
    menuSlug: string
    showRail: boolean
    showShear: boolean
    showFooter: boolean
    footerMenuSlug: string
    footerTemplate: string
    template: string
    variant: FrameVariant
  }
) {
  if (frame.value.enableIris !== chrome.enableIris) {
    frame.value.enableIris = chrome.enableIris
  }
  if (frame.value.showMenu !== chrome.showMenu) {
    frame.value.showMenu = chrome.showMenu
  }
  if (frame.value.menuSlug !== chrome.menuSlug) {
    frame.value.menuSlug = chrome.menuSlug
  }
  if (frame.value.showRail !== chrome.showRail) {
    frame.value.showRail = chrome.showRail
  }
  if (frame.value.showShear !== chrome.showShear) {
    frame.value.showShear = chrome.showShear
  }
  if (frame.value.showFooter !== chrome.showFooter) {
    frame.value.showFooter = chrome.showFooter
  }
  if (frame.value.footerMenuSlug !== chrome.footerMenuSlug) {
    frame.value.footerMenuSlug = chrome.footerMenuSlug
  }
  if (frame.value.footerTemplate !== chrome.footerTemplate) {
    frame.value.footerTemplate = chrome.footerTemplate
  }
  if (frame.value.template !== chrome.template) {
    frame.value.template = chrome.template
  }
  if (frame.value.variant !== chrome.variant) {
    frame.value.variant = chrome.variant
  }
  frame.value.pending = false
}

/**
 * Apply admin live edits.
 * - Same sections, props only → mutate in place (no motion reboot)
 * - Same sections, reordered → reorder array + soft-reveal tick (no iris)
 * - Add/remove/type change with shared rows → soft-settle current slide
 * - Total identity wipe → full replace (layout may reboot motion)
 */
function applyLivePayload(
  frame: ReturnType<typeof useFramePage>,
  slug: string,
  payload: PreviewLivePayload,
  titleRef: { value: string }
) {
  const next = normalizeSections(payload.sections)
  const prev = frame.value.sections
  titleRef.value = String(payload.title || slug)

  const chrome = {
    enableIris: payload.enableIris !== false,
    showMenu: payload.showMenu === true,
    menuSlug: String(payload.menuSlug || 'primary').trim() || 'primary',
    showRail: payload.showRail !== false,
    showShear: payload.showShear !== false,
    showFooter: payload.showFooter !== false,
    footerMenuSlug: String(payload.footerMenuSlug || '').trim(),
    footerTemplate: String(payload.footerTemplate || 'home').trim() || 'home',
    template: String(payload.template || 'rail').trim() || 'rail',
    variant: VARIANT_BY_SLUG[slug] ?? 'auto',
  }

  if (prev.length === next.length && identityKey(prev) === identityKey(next)) {
    const reordered = mergeLiveSections(prev, next)

    const reorderedIds = orderKey(reordered)
    const orderChanged = reorderedIds !== orderKey(prev)
    if (orderChanged) {
      // Keep the same slide number — freeze + soft-reorder before DOM patch.
      const idx = captureSlideIndex({ softReorder: true })
      frame.value.softRevealMode = null
      frame.value.preserveSlideIndex = idx
      frame.value.preserveSectionId =
        reordered[idx]?.id ?? prev[idx]?.id ?? null
      frame.value.sections = reordered
      frame.value.softRevealTick = (frame.value.softRevealTick ?? 0) + 1
    }

    applyChrome(frame, chrome)
    return
  }

  const hasContinuity = prev.some((p) =>
    next.some((n) => n.id === p.id && n.type === p.type)
  )
  if (hasContinuity) {
    const prevIndex = captureSlideIndex()
    const currentId = prev[prevIndex]?.id
    const merged = mergeLiveSections(prev, next)
    const appended =
      next.length === prev.length + 1 &&
      prev.every((p) => next.some((n) => n.id === p.id && n.type === p.type))
    const wasOnLast = prev.length === 0 || prevIndex >= prev.length - 1
    // Follow a newly appended section only from the last slide — otherwise
    // stay put (avoids jumping through every panel from mid-page).
    let slideIndex: number
    let revealMode: 'append' | null = null
    if (appended && wasOnLast) {
      slideIndex = merged.length - 1
      revealMode = 'append'
    } else if (currentId) {
      slideIndex = merged.findIndex((s) => s.id === currentId)
    } else {
      slideIndex = prevIndex
    }
    if (slideIndex < 0) {
      slideIndex = Math.min(Math.max(0, merged.length - 1), prevIndex)
    }
    frame.value.softMotionOnly = true
    frame.value.softRevealMode = revealMode
    frame.value.preserveSlideIndex = slideIndex
    frame.value.preserveSectionId = merged[slideIndex]?.id ?? null
    if (revealMode !== 'append') {
      const root = document.querySelector('.nuc-frame') as HTMLElement | null
      if (root) root.dataset.softReorder = '1'
    }
    frame.value.sections = merged
    frame.value.softRevealTick = (frame.value.softRevealTick ?? 0) + 1
    applyChrome(frame, chrome)
    return
  }

  frame.value = {
    sections: next,
    railAriaLabel: 'Sections',
    variant: chrome.variant,
    pending: false,
    template: chrome.template,
    enableIris: chrome.enableIris,
    showMenu: chrome.showMenu,
    menuSlug: chrome.menuSlug,
    showRail: chrome.showRail,
    showShear: chrome.showShear,
    showFooter: chrome.showFooter,
    footerMenuSlug: chrome.footerMenuSlug,
    footerTemplate: chrome.footerTemplate,
    softRevealTick: frame.value.softRevealTick ?? 0,
  }
}

/**
 * Load a draft CMS document via preview token into the marketing frame.
 * Also accepts live postMessage updates from the admin interactive creator
 * (no publish / no draft save required for preview refresh).
 */
export function usePreviewFramePage() {
  const route = useRoute()
  const config = useRuntimeConfig()
  const frame = useFramePage()

  const lang = computed(() => String(route.params.lang || 'en'))
  const slug = computed(() => String(route.params.slug || ''))
  const token = computed(() => String(route.query.token || ''))

  const pending = ref(true)
  const error = ref('')
  const title = ref('')
  const liveActive = ref(false)

  const adminOrigin = computed(
    () =>
      String(
        (config.public as { adminOrigin?: string }).adminOrigin || ''
      ).replace(/\/$/, '') || 'http://localhost:8888'
  )
  const isLocal = computed(
    () =>
      String((config.public as { appEnv?: string }).appEnv || '') === 'local'
  )

  useSeoMeta({
    title: () => (title.value ? `Preview: ${title.value}` : 'Preview'),
    robots: 'noindex,nofollow',
  })

  function isTrustedAdminOrigin(origin: string): boolean {
    if (origin === adminOrigin.value) return true
    if (!isLocal.value) return false
    return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)
  }

  let announcedPaint = false

  function postReady() {
    if (!import.meta.client) return
    const target = isLocal.value ? '*' : adminOrigin.value
    window.parent?.postMessage(previewReadyMessage(), target)
  }

  /** Tell the interactive creator to drop the cube after iris/hero paint. */
  async function announceWhenPainted() {
    if (!import.meta.client || announcedPaint) return
    await nextTick()
    const root = document.querySelector('.nuc-frame') as HTMLElement | null
    if (root) await whenFrameReady(root)
    if (announcedPaint) return
    announcedPaint = true
    postReady()
  }

  function onMessage(event: MessageEvent) {
    if (!isTrustedAdminOrigin(event.origin)) return
    if (!isPreviewUpdateMessage(event.data)) return
    liveActive.value = true
    error.value = ''
    pending.value = false
    applyLivePayload(frame, slug.value, event.data.payload, title)
    void announceWhenPainted()
  }

  onMounted(() => {
    window.addEventListener('message', onMessage)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('message', onMessage)
  })

  watchEffect(async () => {
    if (liveActive.value) return

    pending.value = true
    error.value = ''
    title.value = ''
    announcedPaint = false

    frame.value = {
      sections: [],
      railAriaLabel: 'Sections',
      variant: 'auto',
      pending: true,
      template: 'rail',
      enableIris: true,
      showMenu: false,
      menuSlug: 'primary',
      showRail: true,
      showShear: true,
      showFooter: true,
      footerMenuSlug: '',
      footerTemplate: 'home',
      softRevealTick: 0,
    }

    if (!slug.value || !token.value) {
      error.value = 'Missing preview token'
      pending.value = false
      frame.value = { ...frame.value, pending: false }
      void announceWhenPainted()
      return
    }

    try {
      const res = await $fetch<{
        data?: {
          sections?: PageSection[]
          body?: Record<string, unknown>[]
          title?: string
          template?: string
          enableIris?: boolean
          showMenu?: boolean
          menuSlug?: string
          showRail?: boolean
          showShear?: boolean
          showFooter?: boolean
          footerMenuSlug?: string
          footerTemplate?: string
        }
      }>(`/api/public/preview/${encodeURIComponent(slug.value)}`, {
        query: { token: token.value, locale: lang.value },
      })

      if (liveActive.value) return

      const sections = normalizeSections(res?.data?.sections)
      title.value = String(res?.data?.title || slug.value)
      frame.value = {
        sections,
        railAriaLabel: 'Sections',
        variant: VARIANT_BY_SLUG[slug.value] ?? 'auto',
        pending: false,
        template: String(res?.data?.template || 'rail').trim() || 'rail',
        enableIris: res?.data?.enableIris !== false,
        showMenu: res?.data?.showMenu === true,
        menuSlug: String(res?.data?.menuSlug || 'primary').trim() || 'primary',
        showRail: res?.data?.showRail !== false,
        showShear: res?.data?.showShear !== false,
        showFooter: res?.data?.showFooter !== false,
        footerMenuSlug: String(res?.data?.footerMenuSlug || '').trim(),
        footerTemplate:
          String(res?.data?.footerTemplate || 'home').trim() || 'home',
        softRevealTick: 0,
      }
      void announceWhenPainted()
    } catch (e) {
      if (liveActive.value) return
      error.value = e instanceof Error ? e.message : 'Preview failed'
      frame.value = {
        sections: [],
        railAriaLabel: 'Sections',
        variant: 'auto',
        pending: false,
        template: 'rail',
        enableIris: true,
        showMenu: false,
        menuSlug: 'primary',
        showRail: true,
        showShear: true,
        showFooter: true,
        footerMenuSlug: '',
        footerTemplate: 'home',
        softRevealTick: 0,
      }
      void announceWhenPainted()
    } finally {
      if (!liveActive.value) pending.value = false
    }
  })

  return { pending, error, title, lang, slug, frame }
}
