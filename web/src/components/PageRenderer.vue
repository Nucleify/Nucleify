<template>
  <div class="nuc-page-renderer">
    <component
      :is="resolve(section.type)"
      v-for="section in ordered"
      :key="section.id"
      v-bind="sectionProps(section)"
    />
    <p
      v-for="section in unknown"
      :key="`unknown-${section.id}`"
      class="nuc-page-renderer__unknown"
    >
      Unknown section type: {{ section.type }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, type Component } from 'vue'

export type PageSection = {
  id: string
  type: string
  order: number
  props?: Record<string, unknown>
}

const props = defineProps<{
  sections: PageSection[]
}>()

const registry: Record<string, Component> = {
  'home.hero': defineAsyncComponent(
    () => import('../pages/home/sections/hero/index.vue')
  ),
  'home.pillars': defineAsyncComponent(
    () => import('../pages/home/sections/pillars/index.vue')
  ),
}

const ordered = computed(() =>
  [...(props.sections ?? [])]
    .filter((s) => Boolean(registry[s.type]))
    .sort((a, b) => a.order - b.order)
)

const unknown = computed(() =>
  [...(props.sections ?? [])].filter((s) => !registry[s.type])
)

function resolve(type: string): Component {
  return registry[type]!
}

function sectionProps(section: PageSection): Record<string, unknown> {
  // Existing home sections read from constants; pass props for future binding.
  return { ...(section.props ?? {}), 'data-section-id': section.id }
}
</script>
