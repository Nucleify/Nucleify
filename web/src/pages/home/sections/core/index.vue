<template>
  <section
    id="core"
    class="nuc-home-section nuc-home-core nuc-home-panel"
    aria-labelledby="nuc-home-core-title"
  >
    <div class="nuc-home-core-head">
      <p class="nuc-home-eyebrow">{{ copy.coreEyebrow }}</p>
      <h2 id="nuc-home-core-title" class="nuc-home-title">
        {{ copy.coreTitle }}
      </h2>
      <p class="nuc-home-support">{{ copy.coreSupport }}</p>
    </div>

    <div
      class="nuc-home-core-board"
      :data-surface="active.id"
      :class="{ 'is-bound': bound }"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div class="nuc-home-core-board-glow" aria-hidden="true" />

      <div class="nuc-home-core-pathstrip" aria-hidden="true">
        <span>{{ active.moduleFile }}</span>
        <em :class="{ 'is-on': bound }" />
        <span :class="{ 'is-bound': bound }"
          >{{ active.overrideFile.replace(/^overrides\//, '') }}</span
        >
      </div>

      <div class="nuc-home-core-columns">
        <div class="nuc-home-core-tree nuc-home-core-tree-module">
          <p class="nuc-home-core-tree-label">
            <nui-icon icon="mdi:cube-outline" />
            {{ copy.coreModuleLabel }}
          </p>
          <ul class="nuc-home-core-tree-list" role="list">
            <li v-for="(surface, index) in surfaces" :key="`mod-${surface.id}`">
              <button
                type="button"
                class="nuc-home-core-file"
                :class="{ 'is-active': surface.id === active.id }"
                @mouseenter="select(index, false)"
                @focus="select(index, false)"
                @click="select(index, true)"
              >
                <nui-icon :icon="surface.icon" />
                <span>{{ surface.moduleFile }}</span>
              </button>
            </li>
          </ul>
        </div>

        <div class="nuc-home-core-mid">
          <div class="nuc-home-core-nucleus" aria-hidden="true">
            <span class="nuc-home-core-nucleus-ring" />
            <span class="nuc-home-core-nucleus-core">nuc</span>
            <span class="nuc-home-core-nucleus-cap"
              >{{ copy.coreNucleusLabel }}</span
            >
          </div>

          <div
            class="nuc-home-core-surface"
            :class="[
              `is-${active.id}`,
              { 'is-yours': bound, 'is-flash': flash },
            ]"
          >
            <header class="nuc-home-core-surface-bar">
              <i /><i /><i />
              <em>{{ active.preview }}</em>
              <strong
                >{{ bound ? copy.coreBoundLabel : copy.coreUnboundLabel }}</strong
              >
            </header>

            <div class="nuc-home-core-surface-body">
              <div v-if="active.id === 'web'" class="nuc-home-core-viz-home">
                <nav />
                <header />
                <div class="nuc-home-core-viz-home-rail">
                  <span /><span /><span />
                </div>
                <footer />
              </div>
              <div
                v-else-if="active.id === 'admin'"
                class="nuc-home-core-viz-route"
              >
                <div class="nuc-home-core-viz-route-path">
                  <code>/admin</code>
                  <em>path kept</em>
                </div>
                <div
                  class="nuc-home-core-viz-route-handler"
                  :class="{ 'is-live': bound }"
                >
                  <span>{{ bound ? 'your panel' : 'stock panel' }}</span>
                  <div class="nuc-home-core-viz-route-panel">
                    <b /><b /><i /><i />
                  </div>
                </div>
              </div>
              <div
                v-else-if="active.id === 'docs'"
                class="nuc-home-core-viz-comp"
              >
                <article :class="{ 'is-live': bound }">
                  <header />
                  <p />
                  <p />
                  <footer v-if="bound" />
                </article>
              </div>
              <div v-else class="nuc-home-core-viz-theme">
                <strong :class="{ 'is-live': bound }">Aa</strong>
                <div
                  class="nuc-home-core-viz-swatches"
                  :class="{ 'is-live': bound }"
                >
                  <i /><i /><i /><i />
                </div>
              </div>
            </div>
          </div>

          <p class="nuc-home-core-note">{{ active.note }}</p>
        </div>

        <div class="nuc-home-core-tree nuc-home-core-tree-override">
          <p class="nuc-home-core-tree-label">
            <nui-icon icon="mdi:folder-plus-outline" />
            {{ copy.coreOverrideLabel }}
          </p>
          <ul class="nuc-home-core-tree-list" role="list">
            <li v-for="(surface, index) in surfaces" :key="`ovr-${surface.id}`">
              <button
                type="button"
                class="nuc-home-core-file"
                :class="{
                  'is-active': surface.id === active.id,
                  'is-bound': surface.id === active.id && bound,
                }"
                @mouseenter="select(index, false)"
                @focus="select(index, false)"
                @click="select(index, true)"
              >
                <nui-icon icon="mdi:file-plus-outline" />
                <span>{{ surface.overrideFile }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="nuc-home-core-dock">
        <div
          class="nuc-home-core-picks"
          role="tablist"
          aria-label="Override packages"
        >
          <button
            v-for="(surface, index) in surfaces"
            :key="surface.id"
            type="button"
            role="tab"
            class="nuc-home-core-pick"
            :class="{ 'is-active': index === activeIndex }"
            :aria-selected="index === activeIndex"
            @mouseenter="select(index, false)"
            @focus="select(index, false)"
            @click="select(index, true)"
          >
            <nui-icon :icon="surface.icon" />
            <span>{{ surface.kind }}</span>
          </button>
        </div>

        <p class="nuc-home-core-keep">
          <nui-icon icon="mdi:shield-check-outline" />
          {{ copy.coreKeepLabel }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { NUC_HOME_COPY, NUC_HOME_CRAFT_SURFACES } from '../../constants/content'

const copy = NUC_HOME_COPY
const surfaces = NUC_HOME_CRAFT_SURFACES

const activeIndex = ref(0)
const bound = ref(true)
const flash = ref(false)
const paused = ref(false)
const hovering = ref(false)

const active = computed(() => surfaces[activeIndex.value] ?? surfaces[0]!)

let timer: number | undefined
let bindTimer: number | undefined
let flashTimer: number | undefined

function select(index: number, lock = false): void {
  if (index === activeIndex.value && bound.value) {
    if (lock) paused.value = true
    return
  }
  activeIndex.value = index
  if (lock) paused.value = true
  replayBind()
}

function replayBind(): void {
  bound.value = false
  flash.value = false
  window.clearTimeout(bindTimer)
  window.clearTimeout(flashTimer)
  bindTimer = window.setTimeout(() => {
    bound.value = true
    flash.value = true
    flashTimer = window.setTimeout(() => {
      flash.value = false
    }, 700)
  }, 320)
}

function tick(): void {
  if (paused.value || hovering.value) return
  activeIndex.value = (activeIndex.value + 1) % surfaces.length
  replayBind()
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bound.value = true
    return
  }
  timer = window.setInterval(tick, 4400)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
  window.clearTimeout(bindTimer)
  window.clearTimeout(flashTimer)
})
</script>

<style lang="scss" scoped>
@import 'index';
</style>
