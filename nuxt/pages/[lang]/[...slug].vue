<template>
  <!-- Zawsze coś w drzewie (FCP). Tła NIE w #fafafa — psuje wygląd dark mode (p-dark na html + tokeny Prime). -->
  <div
    class="pagebuilder-catchall"
    style="
      min-height: 100vh;
    "
  >
    <span
      class="pagebuilder-catchall__fcp"
      aria-hidden="true"
      style="
        display: block;
        font-size: 2px;
        line-height: 1;
        color: var(--p-text-muted-color, #94a3b8);
        margin: 0;
        padding: 0;
      "
      >.</span
    >
    <div
      v-if="pageData?.layout_json"
      id="page-builder-public"
      :style="wrapperStyle"
    >
      <nuc-page-builder-render :layout="pageData.layout_json" />
    </div>
    <div v-else-if="showNotFound" id="error-404"><nuc-error-404-page /></div>
  </div>
</template>

<script setup lang="ts">
import { setResponseStatus } from 'h3'

import type { PageBuilderLayoutInterface } from '../../../modules/nuc_pagebuilder/components/pagebuilder'

interface PageBuilderRenderResponse {
  page: { data: { title: string; slug: string } }
  layout_json: PageBuilderLayoutInterface | null
  version: number
}

const route = useRoute()

/** Pełna ścieżka catch‑alla (np. `promo` albo `sekcja/podstrona`), zgodna z `/page-builder/render/{slug}` w API. */
const pagebuilderSlug = computed(() => {
  const raw = route.params.slug
  const segments = Array.isArray(raw)
    ? raw.filter((s) => s !== undefined && s !== '')
    : [String(raw ?? '')]
  return segments.join('/')
})

const renderUrl = computed(
  () =>
    `${apiUrl()}/page-builder/render/${encodeURIComponent(pagebuilderSlug.value)}`
)

const requestEvent = useRequestEvent()

const { data: pageData, status } = useFetch<PageBuilderRenderResponse>(
  renderUrl,
  {
    server: true,
    key: () => `pagebuilder-public:${route.fullPath}`,
    /** Domyślny $fetch rzuca na 4xx — może psuć SSR i audyty (PageSpeed). */
    ignoreResponseError: true,
    timeout: 20_000,
    onResponse({ response }: { response: { status: number } }) {
      if (import.meta.server && response.status === 404 && requestEvent) {
        setResponseStatus(requestEvent, 404)
      }
    },
    transform(data: unknown): PageBuilderRenderResponse {
      if (
        data &&
        typeof data === 'object' &&
        'layout_json' in data &&
        (data as PageBuilderRenderResponse).layout_json
      ) {
        return data as PageBuilderRenderResponse
      }
      /** Nuxt ostrzega, gdy `transform` zwraca `null` — unikamy duplikacji żądania po stronie klienta. */
      return {
        page: { data: { title: '', slug: '' } },
        layout_json: null,
        version: 0,
      }
    },
  }
)

/** Brak UI „loading”; 404 dopiero po zakończeniu żądania (nie w trakcie fetcha). */
const showNotFound = computed(
  () =>
    status.value !== 'pending' &&
    status.value !== 'idle' &&
    !pageData.value?.layout_json
)

const wrapperStyle = computed(() => {
  const settings = (pageData.value?.layout_json?.settings ?? {}) as Record<
    string,
    string
  >
  const styles: Record<string, string> = {}
  if (settings.maxWidth) {
    styles.maxWidth = settings.maxWidth
    styles.margin = '0 auto'
  }
  if (settings.pagePadding) styles.padding = settings.pagePadding
  return styles
})

useHead(() => {
  if (!pageData.value?.layout_json) return {}
  const settings = (pageData.value.layout_json?.settings ?? {}) as Record<
    string,
    string
  >
  const title = settings.metaTitle || pageData.value.page?.data?.title || ''
  const desc = settings.metaDescription || ''
  const og = settings.ogImage || ''
  const bg = settings.bgColor || ''

  return {
    ...(title ? { title } : {}),
    meta: [
      ...(desc
        ? [
            { name: 'description', content: desc },
            { property: 'og:description', content: desc },
          ]
        : []),
      ...(og ? [{ property: 'og:image', content: og }] : []),
    ],
    ...(bg ? { bodyAttrs: { style: `background:${bg}` } } : {}),
  }
})
</script>
