<template>
  <article
    class="nuc-post-body"
    style="max-width: 42rem; margin: 0 auto; padding: 2rem 1.25rem"
  >
    <template v-for="(block, index) in blocks" :key="blockKey(block, index)">
      <p v-if="block.type === 'block.paragraph'" style="white-space: pre-wrap">
        {{ String(propsOf(block).text || '') }}
      </p>
      <component
        :is="headingTag(propsOf(block).level)"
        v-else-if="block.type === 'block.heading'"
      >
        {{ String(propsOf(block).text || '') }}
      </component>
      <pre
        v-else-if="block.type === 'block.code'"
        style="overflow: auto; padding: 1rem; background: rgba(255,255,255,0.04)"
      ><code>{{ String(propsOf(block).code || '') }}</code></pre>
      <p v-else-if="block.type === 'block.cta'">
        <a :href="String(propsOf(block).href || '/')">
          {{ String(propsOf(block).label || 'Learn more') }}
        </a>
      </p>
      <p v-else-if="block.type === 'block.image'" class="admin-muted">
        {{ String(propsOf(block).alt || propsOf(block).mediaId || 'Image') }}
      </p>
    </template>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  blocks: Record<string, unknown>[]
}>()

function propsOf(block: Record<string, unknown>): Record<string, unknown> {
  const props = block.props
  return props && typeof props === 'object' && !Array.isArray(props)
    ? (props as Record<string, unknown>)
    : {}
}

function blockKey(block: Record<string, unknown>, index: number): string {
  return String(block.id || `${block.type}-${index}`)
}

function headingTag(level: unknown): string {
  const n = Number(level || 2)
  if (n === 3) return 'h3'
  if (n === 4) return 'h4'
  return 'h2'
}
</script>
