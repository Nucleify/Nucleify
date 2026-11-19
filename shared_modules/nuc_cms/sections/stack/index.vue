<template>
  <section
    ref="rootEl"
    :id="domId"
    class="nuc-section nuc-stack nuc-panel"
    aria-labelledby="nuc-stack-title"
    :style="{ '--stack-color': active.color }"
  >
    <div class="nuc-stack-head">
      <p class="nuc-eyebrow">{{ copy.stackEyebrow }}</p>
      <h2 id="nuc-stack-title" class="nuc-title">
        {{ copy.stackTitle }}
      </h2>
      <p class="nuc-support">{{ copy.stackSupport }}</p>
      <button type="button" class="nuc-next" @click="onCta">
        <span>{{ copy.stackCta }}</span>
        <nui-icon icon="mdi:arrow-down" mode="svg" />
      </button>
    </div>

    <div
      class="nuc-stack-stage"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div class="nuc-stack-spotlight" aria-live="polite">
        <div class="nuc-stack-glow" aria-hidden="true" />
        <div class="nuc-stack-spotlight-copy">
          <div class="nuc-stack-heading">
            <div class="nuc-stack-badge">
              <nui-icon :icon="active.icon" mode="svg" />
            </div>
            <h3 class="nuc-stack-name">{{ active.label }}</h3>
          </div>
          <div class="nuc-stack-foot">
            <div class="nuc-stack-commands">
              <div
                v-for="row in commandRows"
                :key="row.id"
                class="nuc-stack-cmd-block"
              >
                <p class="nuc-stack-cmd-label">{{ row.label }}</p>
                <div class="nuc-stack-command">
                  <code class="nuc-stack-command-text">
                    <span class="is-prompt">$</span>
                    <span
                      v-for="(tok, tokIndex) in highlightCommand(row.text)"
                      :key="`${row.id}-${active.label}-${tokIndex}`"
                      :class="`is-${tok.kind}`"
                      >{{ tok.text }}</span
                    >
                  </code>
                  <nui-tooltip
                    :ref="(el) => setCopyTip(row.id, el)"
                    :value="
                      copiedId === row.id
                        ? copy.stackCopiedLabel || 'Copied!'
                        : ''
                    "
                    position="top"
                    :auto-hide="false"
                    fit-content
                  >
                    <button
                      type="button"
                      class="nuc-stack-copy"
                      :class="{ 'is-copied': copiedId === row.id }"
                      :aria-label="copy.stackCopyLabel || 'Copy'"
                      @click.stop="onCopy(row.id, row.text)"
                    >
                      <nui-icon
                        :icon="
                          copiedId === row.id
                            ? 'mdi:check'
                            : 'mdi:content-copy'
                        "
                        mode="svg"
                      />
                    </button>
                  </nui-tooltip>
                </div>
              </div>
            </div>
            <p class="nuc-stack-cli-note">
              {{ copy.stackCliInstallLead }}
              <a
                class="nuc-stack-cli-link"
                :href="copy.cliHref"
                target="_blank"
                rel="noopener noreferrer"
                >{{ copy.stackCliInstallHost }}</a
              >
            </p>
          </div>
        </div>
      </div>

      <div class="nuc-stack-list" role="tablist" aria-label="Frameworks">
        <button
          v-for="(item, index) in stack"
          :key="item.label"
          type="button"
          role="tab"
          class="nuc-stack-item"
          :class="{ 'is-active': index === activeIndex }"
          :aria-selected="index === activeIndex"
          :style="{ '--item-color': item.color }"
          @mouseenter="select(index, false)"
          @focus="select(index, false)"
          @click="select(index, true)"
        >
          <span class="nuc-stack-item-icon" aria-hidden="true">
            <nui-icon :icon="item.icon" mode="svg" />
          </span>
          <span class="nuc-stack-label">{{ item.label }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'

import {
  cmsHomeStack,
  hideCopiedTip,
  highlightCommand,
  type NuiTooltipEl,
  scrollFrameTo,
  showCopiedTip,
  stackReveal,
  unwrapEl,
  useAutoRotateIndex,
  useCmsAttrs,
  useFrameSectionReveal,
  useHomeCmsCopy,
  useSectionDomId,
} from '@shared_modules'

defineOptions({ inheritAttrs: false })

type CopyId = 'web' | 'admin' | 'cli'

const rootEl = ref<HTMLElement | null>(null)
useFrameSectionReveal(rootEl, stackReveal)

const cms = useCmsAttrs()
const domId = useSectionDomId('stack')
const copy = useHomeCmsCopy()
const stack = computed(() => cmsHomeStack(cms))

const { activeIndex, hovering, select } = useAutoRotateIndex({
  length: () => stack.value.length,
  intervalMs: 2600,
})

const copiedId = ref<CopyId | null>(null)
const copyTips = new Map<CopyId, NuiTooltipEl>()
let copiedTimer: number | undefined

const active = computed(() => stack.value[activeIndex.value] ?? stack.value[0]!)

const commandRows = computed(() => [
  {
    id: 'web' as const,
    label: copy.value.stackWebLabel,
    text: active.value.command,
  },
  {
    id: 'admin' as const,
    label: copy.value.stackAdminLabel,
    text: active.value.adminCommand,
  },
  {
    id: 'cli' as const,
    label: copy.value.stackCliLabel,
    text: active.value.cliCommand,
  },
])

function setCopyTip(id: CopyId, el: unknown): void {
  const host = unwrapEl(el)
  if (host) copyTips.set(id, host as NuiTooltipEl)
  else copyTips.delete(id)
}

function onCta(): void {
  scrollFrameTo('clone')
}

async function onCopy(id: CopyId, text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    return
  }

  if (copiedTimer) window.clearTimeout(copiedTimer)

  const prev = copiedId.value
  if (prev && prev !== id) {
    const prevTip = copyTips.get(prev)
    if (prevTip) hideCopiedTip(prevTip)
  }

  copiedId.value = id
  await nextTick()

  const tip = copyTips.get(id)
  const label = copy.value.stackCopiedLabel || 'Copied!'
  if (tip) showCopiedTip(tip, label)

  copiedTimer = window.setTimeout(() => {
    const activeTip = copyTips.get(id)
    if (activeTip) hideCopiedTip(activeTip)
    if (copiedId.value === id) copiedId.value = null
    copiedTimer = undefined
  }, 2000)
}

onBeforeUnmount(() => {
  if (copiedTimer) window.clearTimeout(copiedTimer)
})
</script>

<style lang="scss" scoped>
@import 'index';
</style>
