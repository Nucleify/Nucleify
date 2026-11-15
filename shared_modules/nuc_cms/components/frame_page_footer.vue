<template>
  <Teleport v-if="canTeleport" :to="to">
    <footer class="nuc-frame-page-footer">
      <span>© {{ year }} {{ brand }}</span>
      <nav
        class="nuc-frame-page-footer-links"
        :data-sep="separator"
        aria-label="Footer"
      >
        <a
          v-for="link in links"
          :key="link.href + link.label"
          :href="link.href"
        >
          {{ link.label }}
        </a>
      </nav>
    </footer>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

import { useFrameFooterLinks } from '../composables/use_frame_menu_links'
import { useFramePage } from '../composables/use_frame_page'

const props = defineProps<{
  /** CSS selector for the last section panel (e.g. `[data-section-id="…"]`). */
  to?: string
}>()

const frame = useFramePage()
const visible = computed(() => frame.value.showFooter !== false)
const to = computed(() => (props.to || '').trim())
const { links, brand, separator } = useFrameFooterLinks()
const year = new Date().getFullYear()

/** Only mount Teleport once the target node exists — avoids `__vnode` on null. */
const canTeleport = ref(false)
let syncGen = 0

async function syncTarget(): Promise<void> {
  const gen = ++syncGen
  canTeleport.value = false
  if (!import.meta.client || !visible.value || !to.value) return

  for (let i = 0; i < 24; i++) {
    if (gen !== syncGen) return
    await nextTick()
    if (typeof document !== 'undefined' && document.querySelector(to.value)) {
      if (gen !== syncGen) return
      canTeleport.value = true
      return
    }
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve())
    })
  }
}

watch(
  [visible, to],
  () => {
    void syncTarget()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  syncGen += 1
  canTeleport.value = false
})
</script>
