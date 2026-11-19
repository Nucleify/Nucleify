<template>
  <nav v-if="sections.length" class="nuc-rail" :aria-label="ariaLabel">
    <ol class="nuc-rail-list">
      <li v-for="(section, index) in sections" :key="section.id">
        <button
          type="button"
          class="nuc-rail-item"
          :class="{ 'is-active': activeSection === section.id }"
          :aria-current="activeSection === section.id ? 'true' : undefined"
          :aria-label="section.label"
          @click="$emit('select', section.id)"
        >
          <span class="nuc-rail-index">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <span class="nuc-rail-label">{{ section.label }}</span>
        </button>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  sections: Array<{ id: string; label: string }>
  activeSection: string
  ariaLabel?: string
}>()

defineEmits<{
  select: [id: string]
}>()
</script>

<style lang="scss">
@import 'index';
</style>
