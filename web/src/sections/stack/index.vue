<template>
  <section
    ref="rootEl"
    id="stack"
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
        <nui-icon icon="mdi:arrow-down" />
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
              <nui-icon :icon="active.icon" />
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
            <nui-icon :icon="item.icon" />
          </span>
          <span class="nuc-stack-label">{{ item.label }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import {
  cmsHomeStack,
  isAutomatedAudit,
  scrollSection,
  useCmsAttrs,
  useHomeCmsCopy,
  useShellSectionReveal,
} from '@web'
import { highlightCommand } from './highlight'
import { stackReveal } from './motion'

defineOptions({ inheritAttrs: false })

type CopyId = 'web' | 'admin' | 'cli'

type NuiTooltipEl = HTMLElement & {
  value: string
  autoHide: boolean
  visible: boolean
}

const rootEl = ref<HTMLElement | null>(null)
useShellSectionReveal(rootEl, stackReveal)

const cms = useCmsAttrs()
const copy = useHomeCmsCopy()
const stack = computed(() => cmsHomeStack(cms))
const activeIndex = ref(0)
const paused = ref(false)
const hovering = ref(false)
const copiedId = ref<CopyId | null>(null)
const copyTips = new Map<CopyId, NuiTooltipEl>()

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

let timer: number | undefined
let copiedTimer: number | undefined

function setCopyTip(id: CopyId, el: unknown): void {
  const host = unwrapEl(el)
  if (host) copyTips.set(id, host as NuiTooltipEl)
  else copyTips.delete(id)
}

function unwrapEl(el: unknown): HTMLElement | null {
  if (el instanceof HTMLElement) return el
  if (el && typeof el === 'object' && '$el' in el) {
    const nested = (el as { $el: unknown }).$el
    if (nested instanceof HTMLElement) return nested
  }
  return null
}

function tipTrigger(tip: NuiTooltipEl): Element | null {
  return tip.shadowRoot?.querySelector('.nui-tooltip-trigger') ?? null
}

function showCopiedTip(tip: NuiTooltipEl, label: string): void {
  tip.autoHide = false
  tip.value = label
  const trigger = tipTrigger(tip)
  if (!trigger) return
  // nui-tooltip opens only on mouseenter/focusin — re-fire after value is set.
  tip.autoHide = true
  trigger.dispatchEvent(new Event('mouseleave'))
  tip.autoHide = false
  requestAnimationFrame(() => {
    trigger.dispatchEvent(new Event('mouseenter'))
  })
}

function hideCopiedTip(tip: NuiTooltipEl): void {
  tip.autoHide = true
  tip.value = ''
  tipTrigger(tip)?.dispatchEvent(new Event('mouseleave'))
}

function onCta(): void {
  const root = document.querySelector<HTMLElement>('.nuc-shell')
  if (!root) return
  scrollSection(root, 'clone')
}

function select(index: number, lock = false): void {
  activeIndex.value = index
  if (lock) paused.value = true
}

function tick(): void {
  if (paused.value || hovering.value) return
  const len = stack.value.length
  if (len === 0) return
  activeIndex.value = (activeIndex.value + 1) % len
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

onMounted(() => {
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    isAutomatedAudit()
  )
    return
  timer = window.setInterval(tick, 2600)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
  if (copiedTimer) window.clearTimeout(copiedTimer)
})
</script>

<style lang="scss" scoped>
@import 'index';
</style>
