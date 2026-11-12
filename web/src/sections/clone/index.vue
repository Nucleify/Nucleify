<template>
  <section
    ref="rootEl"
    id="clone"
    class="nuc-section nuc-clone nuc-panel"
    aria-labelledby="nuc-clone-title"
  >
    <div class="nuc-clone-copy">
      <p class="nuc-eyebrow">{{ copy.cloneEyebrow }}</p>
      <h2 id="nuc-clone-title" class="nuc-title nuc-clone-title">
        <span class="nuc-clone-title-line">{{ copy.cloneTitleLead }}</span>
        <span class="nuc-clone-title-line is-nowrap"
          >{{ copy.cloneTitleTrail }}</span
        >
      </h2>
      <p class="nuc-support">{{ copy.cloneSupport }}</p>
      <div class="nuc-clone-actions">
        <nui-button
          :label="copy.cloneCta"
          variant="primary"
          icon="mdi:book-open-page-variant-outline"
          icon-pos="right"
          @click="goCli"
        />
        <a
          class="nuc-next"
          :href="copy.githubHref"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{{ copy.cloneCtaNext }}</span>
          <nui-icon icon="mdi:github" width="16px" height="16px" mode="svg" />
        </a>
      </div>
    </div>

    <div class="nuc-clone-term-wrap">
      <div
        class="nuc-clone-pm"
        role="tablist"
        :aria-label="copy.heroInstallLabel"
      >
        <button
          v-for="(pm, index) in packageManagers"
          :key="pm.id"
          type="button"
          role="tab"
          class="nuc-clone-pm-btn"
          :class="{ 'is-active': index === activePm }"
          :aria-selected="index === activePm"
          @click="selectPm(index)"
        >
          {{ pm.label }}
        </button>
      </div>
      <ol
        :key="termKey"
        class="nuc-clone-term"
        :class="{ 'is-enter': termEnter }"
        :aria-label="active.label"
      >
        <li
          v-for="(step, index) in active.steps"
          :key="`${active.id}-${step}`"
          :style="{ '--line-i': index }"
        >
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <code><em>$</em>{{ step }}</code>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

import { useHomeCmsCopy, useShellSectionReveal } from '@web'
import { cloneReveal } from './motion'

defineOptions({ inheritAttrs: false })

const packageManagers = [
  {
    id: 'npm',
    label: 'npm',
    steps: ['npm install -g @nucleify/cli', 'nuc emit'],
  },
  {
    id: 'pnpm',
    label: 'pnpm',
    steps: ['pnpm add -g @nucleify/cli', 'nuc emit'],
  },
  {
    id: 'yarn',
    label: 'yarn',
    steps: ['yarn global add @nucleify/cli', 'nuc emit'],
  },
  {
    id: 'npx',
    label: 'npx',
    steps: ['npx @nucleify/cli@latest emit'],
  },
] as const

const rootEl = ref<HTMLElement | null>(null)
useShellSectionReveal(rootEl, cloneReveal)

const copy = useHomeCmsCopy()
const activePm = ref(0)
const termKey = ref(0)
const termEnter = ref(false)
const active = computed(
  () => packageManagers[activePm.value] ?? packageManagers[0]!
)

function selectPm(index: number): void {
  if (index === activePm.value) return
  activePm.value = index
  termKey.value += 1
  termEnter.value = false
  void nextTick(() => {
    termEnter.value = true
  })
}

function goCli(): void {
  window.location.assign(copy.value.cliHref || 'https://cli.nucleify.io')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
