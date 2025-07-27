<template>
  <ad-popover
    dismissable
    :button-class="'popover-toggle ' + positionClass"
    :popover-class="'terminal ' + positionClass"
  >
    <ad-terminal
      prompt="artisan >"
      welcome-message="The ''help'' command displays help"
    />
  </ad-popover>

  <Dock
    :v-model="props.modelValue"
    :possition="props.position"
    :breakpoint="props.breakpoint"
    :tooltip-options="props.tooltipOptions"
    :menu-id="props.menuId"
    :tabindex="props.tabindex"
    :aria-labelledby="props.ariaLabelledby"
    :aria-label="props.ariaLabel"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
    :model="dockItems"
    :position="position"
    class="dock"
    :class="{ staff: isStaff }"
  >
    <template #icon="{ item }">
      <div v-if="item.logo">
        <dock-logo />
      </div>
      
      <nuxt-link v-if="item.icon && (item.url || item.click)" :to="item.url">
        <ad-icon
          v-tooltip="item.label"
          :icon="item.icon"
          class="item"
          :ad-type="item.adType"
          @click="item.click"
          size="1.7em"
        />
      </nuxt-link>

      <ad-icon 
        v-if="item.icon && !item.url && !item.click" 
        v-tooltip="item.label" 
        :icon="item.icon" 
        class="item disabled-item" 
        size="1.7em"
        @click="item.click"
      />

      <div v-if="item.label === 'position'" class="dock-position-buttons">
        <ad-radio-button
          v-for="pos of positions"
          :key="pos.value"
          v-model="position"
          :value="pos.value"
          :class="pos.value"
          ad-type="main"
          class="flex"
          unstyled
        />
      </div>
    </template>
  </Dock>
</template>

<script setup lang="ts">
import type { DockInterface, PositionType } from 'atomic'
import {
  checkIsStaff,
  dockItems,
  localStorageGetItem,
  localStorageSetItem,
  positions,
  sessionStorageGetItem,
} from 'atomic'

import { DockLogo } from '.'

const LOCAL_STORAGE_KEY = 'dock-position'

const props = defineProps<DockInterface>()

const position = ref<PositionType>('bottom')
const isStaff = ref(false)

const positionClass = computed(() =>
  ['top', 'right', 'bottom', 'left'].includes(position.value)
    ? position.value
    : ''
)

function setDockPositionForScreenSize() {
  if (window.innerWidth == 992) {
    position.value = 'bottom'
  }
}

onMounted(async () => {
  const savedPosition = localStorageGetItem(LOCAL_STORAGE_KEY)
  if (savedPosition) {
    position.value = savedPosition as PositionType
  }

  isStaff.value = checkIsStaff(sessionStorageGetItem('user_role')!)

  window.addEventListener('resize', setDockPositionForScreenSize)
})

watch(position, (newPosition) => {
  localStorageSetItem(LOCAL_STORAGE_KEY, newPosition)
})
</script>
