<template>
  <section
    id="intro"
    class="nuc-home-hero nuc-home-panel"
    aria-labelledby="nuc-home-brand"
  >
    <div class="nuc-home-hero-layout">
      <div class="nuc-home-hero-copy">
        <p class="nuc-home-hero-eyebrow">
          <span class="nuc-home-hero-live" aria-hidden="true" />
          {{ copy.heroEyebrow }}
        </p>

        <div class="nuc-home-hero-mark">
          <h1 id="nuc-home-brand" class="nuc-home-hero-brand">
            {{ copy.brand }}
          </h1>
        </div>

        <p class="nuc-home-hero-headline">
          {{ copy.headline }}
        </p>

        <p class="nuc-home-hero-support">
          {{ copy.support }}
        </p>

        <div class="nuc-home-hero-cta">
          <nui-button
            :label="copy.ctaPrimary"
            variant="primary"
            icon="mdi:arrow-down"
            icon-pos="right"
            @click="onPrimary"
          />
          <nui-button
            :label="copy.ctaSecondary"
            variant="outlined"
            icon="mdi:github"
            @click="onSecondary"
          />
        </div>

        <ul class="nuc-home-hero-proof" aria-label="Highlights">
          <li v-for="item in proof" :key="item">{{ item }}</li>
        </ul>
      </div>

      <aside
        class="nuc-home-hero-panel"
        :style="{ '--shell-color': activeShell?.color || '#10b981' }"
        aria-label="Framework shell preview"
      >
        <div class="nuc-home-hero-chrome">
          <div class="nuc-home-hero-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span class="nuc-home-hero-path">{{ copy.heroPanelTitle }}</span>
          <span class="nuc-home-hero-panel-signal">{{ copy.heroSignal }}</span>
        </div>

        <div class="nuc-home-hero-tabs" role="tablist" aria-label="Frameworks">
          <button
            v-for="(shell, index) in shells"
            :key="shell.id"
            type="button"
            role="tab"
            class="nuc-home-hero-tab"
            :class="{ 'is-active': index === activeIndex }"
            :aria-selected="index === activeIndex"
            :style="{ '--tab-color': shell.color }"
            @click="selectShell(index)"
          >
            <nui-icon :icon="shell.icon" />
            <span>{{ shell.label }}</span>
          </button>
        </div>

        <div class="nuc-home-hero-terminal">
          <p
            class="nuc-home-hero-terminal-line nuc-home-hero-terminal-line-cmd"
          >
            <span class="nuc-home-hero-prompt">$</span>
            <span>{{ typed }}</span>
            <span v-if="phase === 'typing'" class="nuc-home-hero-caret">▌</span>
          </p>

          <div class="nuc-home-hero-status" aria-live="polite">
            <div
              v-if="phase === 'running'"
              class="nuc-home-hero-progress"
              role="status"
            >
              <span>{{ copy.heroPanelRunning }}</span>
              <div class="nuc-home-hero-progress-track">
                <i :style="{ transform: `scaleX(${progress})` }" />
              </div>
            </div>

            <p
              v-else-if="phase === 'done' && activeShell"
              class="nuc-home-hero-terminal-line nuc-home-hero-terminal-line-out"
            >
              <nui-icon :icon="activeShell.icon" />
              <span>{{ copy.heroPanelDone }} · {{ activeShell.result }}</span>
            </p>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import {
  NUC_HOME_COPY,
  NUC_HOME_HERO_PROOF,
  NUC_HOME_HERO_SHELLS,
} from '../../constants/content'
import {
  createHeroShellPlayer,
  type HeroShellPhase,
} from '../../utils/hero_shell_player'
import { scrollHomeSection } from '../../utils/observe_active_section'

const copy = NUC_HOME_COPY
const proof = NUC_HOME_HERO_PROOF
const shells = NUC_HOME_HERO_SHELLS

const activeIndex = ref(0)
const typed = ref('')
const phase = ref<HeroShellPhase>('typing')
const progress = ref(0)

const activeShell = computed(() => shells[activeIndex.value])

let player: ReturnType<typeof createHeroShellPlayer> | undefined

function onPrimary(): void {
  const root = document.querySelector<HTMLElement>('.nuc-home')
  if (!root) return
  scrollHomeSection(root, 'architecture')
}

function onSecondary(): void {
  window.open(copy.githubHref, '_blank', 'noopener,noreferrer')
}

function selectShell(index: number): void {
  player?.select(index)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    activeIndex.value = 0
    typed.value = shells[0]?.command ?? ''
    phase.value = 'done'
    progress.value = 1
    return
  }

  player = createHeroShellPlayer(shells, {
    onIndex: (index) => {
      activeIndex.value = index
    },
    onTyped: (value) => {
      typed.value = value
    },
    onPhase: (next) => {
      phase.value = next
    },
    onProgress: (value) => {
      progress.value = value
    },
  })
  player.start()
})

onBeforeUnmount(() => {
  player?.stop()
})
</script>

<style lang="scss" scoped>
@import 'index';
</style>
