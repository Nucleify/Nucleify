<template>
  <div class="nuc-page-renderer">
    <component
      :is="resolve(section.type)"
      v-for="section in ordered"
      :key="section.id"
      :data-section-id="section.id"
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
import { computed, type Component } from 'vue'

import HeroSection from '../sections/hero/index.vue'
import PillarsSection from '../sections/pillars/index.vue'

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
  'home.hero': HeroSection,
  'home.pillars': PillarsSection,
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
</script>
