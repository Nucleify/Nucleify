<template>
  <div v-if="pending" />
  <div v-else-if="pageData" id="page-builder-public" :style="wrapperStyle">
    <nuc-page-builder-render :layout="pageData.layout_json" />
  </div>
  <nuc-error-404-page v-else />
</template>

<script setup lang="ts">
import type { PageBuilderLayoutInterface } from '../../../modules/nuc_pagebuilder/components/pagebuilder'

interface PageBuilderRenderResponse {
  page: { data: { title: string; slug: string } }
  layout_json: PageBuilderLayoutInterface
  version: number
}

const route = useRoute()
const slug = computed(() => {
  const parts = route.params.slug
  return Array.isArray(parts) ? (parts[0] ?? '') : String(parts ?? '')
})

const { data: pageData, pending } = useFetch<PageBuilderRenderResponse>(
  () => `${apiUrl()}/page-builder/render/${slug.value}`,
  { server: false }
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
  if (!pageData.value) return {}
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
