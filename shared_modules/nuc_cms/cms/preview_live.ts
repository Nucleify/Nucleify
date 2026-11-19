import type { PageSection } from './validate_layout'

/** postMessage types for admin → web interactive preview (no publish). */
export const PREVIEW_READY_TYPE = 'nucleify:preview-ready'
export const PREVIEW_UPDATE_TYPE = 'nucleify:preview-update'

export type PreviewLivePayload = {
  sections: PageSection[]
  title?: string
  slug?: string
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

export type PreviewReadyMessage = {
  type: typeof PREVIEW_READY_TYPE
}

export type PreviewUpdateMessage = {
  type: typeof PREVIEW_UPDATE_TYPE
  payload: PreviewLivePayload
}

export function isPreviewReadyMessage(
  data: unknown
): data is PreviewReadyMessage {
  return Boolean(
    data &&
      typeof data === 'object' &&
      (data as PreviewReadyMessage).type === PREVIEW_READY_TYPE
  )
}

export function isPreviewUpdateMessage(
  data: unknown
): data is PreviewUpdateMessage {
  if (!data || typeof data !== 'object') return false
  const msg = data as PreviewUpdateMessage
  return (
    msg.type === PREVIEW_UPDATE_TYPE &&
    Boolean(msg.payload) &&
    typeof msg.payload === 'object' &&
    Array.isArray(msg.payload.sections)
  )
}

/** Structured-clone-safe copy (Vue proxies cannot cross postMessage). */
export function clonePreviewPayload(
  payload: PreviewLivePayload
): PreviewLivePayload {
  return JSON.parse(JSON.stringify(payload)) as PreviewLivePayload
}

export function previewUpdateMessage(
  payload: PreviewLivePayload
): PreviewUpdateMessage {
  return { type: PREVIEW_UPDATE_TYPE, payload: clonePreviewPayload(payload) }
}

export function previewReadyMessage(): PreviewReadyMessage {
  return { type: PREVIEW_READY_TYPE }
}
