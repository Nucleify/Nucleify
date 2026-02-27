<template>
  <section class="page-builder-renderer">
    <div class="page-builder-container">
      <template v-for="node in nodes" :key="node.id">
        <!-- Component -->
        <component
          v-if="node.widgetType === 'component'"
          :is="resolvedComponentTag(node)"
          class="page-builder-node"
          v-bind="componentProps(node)"
        />

        <!-- Heading -->
        <component
          v-else-if="node.widgetType === 'heading'"
          :is="resolvedHeadingTag(node)"
          class="page-builder-node"
          :style="node.styles"
        >{{ nodeText(node) }}</component>

        <!-- Button -->
        <a
          v-else-if="node.widgetType === 'button'"
          class="page-builder-node page-builder-btn"
          :href="String(node.props.href ?? '#')"
          :style="node.styles"
        >{{ nodeText(node) }}</a>

        <!-- Image -->
        <img
          v-else-if="node.widgetType === 'image'"
          class="page-builder-node"
          :src="String(node.props.src ?? '')"
          :alt="String(node.props.alt ?? '')"
          :style="{ maxWidth: String(node.props.width || '100%'), ...(node.styles as any) }"
        />

        <!-- Video -->
        <iframe
          v-else-if="node.widgetType === 'video'"
          class="page-builder-node"
          :src="String(node.props.src ?? '')"
          :width="String(node.props.width ?? '100%')"
          :height="String(node.props.height ?? '400')"
          frameborder="0"
          allowfullscreen
          :style="node.styles"
        />

        <!-- Divider -->
        <hr
          v-else-if="node.widgetType === 'divider'"
          class="page-builder-node page-builder-divider"
          :style="node.styles"
        />

        <!-- Spacer -->
        <div
          v-else-if="node.widgetType === 'spacer'"
          class="page-builder-node"
          :style="{ height: String(node.props.height ?? '40px'), ...(node.styles as any) }"
        />

        <!-- HTML -->
        <div
          v-else-if="node.widgetType === 'html'"
          class="page-builder-node"
          v-html="String(node.props.html ?? '')"
        />

        <!-- List -->
        <component
          v-else-if="node.widgetType === 'list'"
          :is="node.props.ordered ? 'ol' : 'ul'"
          class="page-builder-node page-builder-list"
          :style="node.styles"
        >
          <li v-for="(item, i) in listItems(node)" :key="i">{{ item }}</li>
        </component>

        <!-- Quote -->
        <blockquote
          v-else-if="node.widgetType === 'quote'"
          class="page-builder-node page-builder-quote"
          :style="node.styles"
        >
          <p>{{ nodeText(node) }}</p>
          <cite v-if="node.props.cite">— {{ node.props.cite }}</cite>
        </blockquote>

        <!-- Code -->
        <pre
          v-else-if="node.widgetType === 'code'"
          class="page-builder-node page-builder-code"
          :style="node.styles"
        ><code>{{ node.props.code ?? '' }}</code></pre>

        <!-- Default (text) -->
        <p
          v-else
          class="page-builder-node"
          :style="node.styles"
        >{{ nodeText(node) }}</p>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed, getCurrentInstance } from 'vue'

import type { PageBuilderLayoutInterface, PageBuilderNodeInterface } from '.'

import * as AtomicAtom from '../../../../nuxt/atomic/atom'
import * as AtomicMolecule from '../../../../nuxt/atomic/molecule'
import * as AtomicOrganism from '../../../../nuxt/atomic/organism'

const props = defineProps<{
  layout: PageBuilderLayoutInterface | null
}>()
const instance = getCurrentInstance()

const localAtomicComponents = buildLocalAtomicComponents()

const nodes = computed<PageBuilderNodeInterface[]>(
  () => props.layout?.children ?? []
)

function resolvedHeadingTag(node: PageBuilderNodeInterface): string {
  const level = String(node.props.level ?? 'h2')
  return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(level) ? level : 'h2'
}

function listItems(node: PageBuilderNodeInterface): string[] {
  const raw = String(node.props.items ?? '')
  return raw.split('\n').filter((l: string) => l.trim() !== '')
}

function componentTag(node: PageBuilderNodeInterface): string {
  return String(node.props.componentTag ?? 'div').trim()
}

function toPascalCase(tag: string): string {
  return tag
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function buildLocalAtomicComponents(): Record<string, Component> {
  const exportsMap = {
    ...AtomicAtom,
    ...AtomicMolecule,
    ...AtomicOrganism,
  } as Record<string, unknown>

  const map: Record<string, Component> = {}

  for (const [name, value] of Object.entries(exportsMap)) {
    if (!name.startsWith('Ad') || !value) {
      continue
    }

    const kebab = name
      .replace(
        /[A-Z]/g,
        (char, index) => `${index > 0 ? '-' : ''}${char.toLowerCase()}`
      )
      .trim()

    map[name] = value as Component
    map[kebab] = value as Component
  }

  return map
}

function resolvedComponentTag(
  node: PageBuilderNodeInterface
): string | Component {
  const rawTag = componentTag(node)
  const pascalTag = toPascalCase(rawTag)
  const components = instance?.appContext.components ?? {}

  if (localAtomicComponents[rawTag]) {
    return localAtomicComponents[rawTag]
  }

  if (localAtomicComponents[pascalTag]) {
    return localAtomicComponents[pascalTag]
  }

  if (components[rawTag]) {
    return rawTag
  }

  if (components[pascalTag]) {
    return pascalTag
  }

  return rawTag
}

function componentProps(
  node: PageBuilderNodeInterface
): Record<string, unknown> {
  const props = node.props.componentProps
  if (props && typeof props === 'object') {
    return props as Record<string, unknown>
  }

  return {}
}

function nodeText(node: PageBuilderNodeInterface): string {
  return String(node.props.text ?? '')
}

function buttonHref(node: PageBuilderNodeInterface): string | undefined {
  if (node.widgetType !== 'button') {
    return undefined
  }

  return String(node.props.href ?? '#')
}
</script>

<style scoped lang="scss">
.page-builder-renderer {
  padding: 48px 16px;
}

.page-builder-container {
  max-width: 1140px;
  margin: 0 auto;
}

.page-builder-node {
  margin-bottom: 18px;
}

.page-builder-btn {
  display: inline-block;
  text-decoration: none;
  background: #10b981;
  color: #fff;
  padding: 10px 22px;
  border-radius: 10px;
  font-weight: 600;
}

.page-builder-divider {
  border: none;
  border-top: 2px solid #333;
}

.page-builder-list {
  padding-left: 22px;
}

.page-builder-quote {
  border-left: 4px solid #10b981;
  padding: 12px 18px;
  margin-left: 0;
  background: rgba(16, 185, 129, 0.06);
  border-radius: 0 8px 8px 0;
  font-style: italic;

  cite {
    display: block;
    margin-top: 8px;
    font-style: normal;
    font-size: 0.85em;
    opacity: 0.7;
  }
}

.page-builder-code {
  padding: 14px 16px;
  border-radius: 8px;
  background: #0a0a0a;
  color: #10b981;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.9em;
  overflow-x: auto;
  border: 1px solid #222;
}

img.page-builder-node {
  border-radius: 8px;
  max-width: 100%;
  height: auto;
}

iframe.page-builder-node {
  border-radius: 8px;
  max-width: 100%;
}
</style>

