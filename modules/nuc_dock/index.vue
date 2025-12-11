<template>
  <ad-popover
    dismissable
    icon="prime:code"
    :position="position"
  >
    <ad-terminal
      prompt="artisan >"
      welcome-message="The ''help'' command displays help"
    />
  </ad-popover>

  <ad-dock
    :model="dockItems"
    :position="position"
    :class="{ staff: isStaff }"
    class="nuc-dock"
  >
    <template #item="{ item }">
      <nuxt-link v-if="item.logo" :to="item.url" :aria-label="item.label">
        <ad-logo ad-type="main" />
      </nuxt-link>
      
      <nuxt-link v-if="item.icon && (item.url || item.click)" :to="item.url" :aria-label="item.label">
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
  </ad-dock>
</template>

<script setup lang="ts">
import {
  checkIsStaff,
  dockItems,
  localStorageGetItem,
  localStorageSetItem,
  positions,
  sessionStorageGetItem,
} from 'atomic'

const LOCAL_STORAGE_KEY = 'dock-position'

const position = ref<PositionType>('bottom')
const isStaff = ref(false)

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

<style lang="scss">
@import 'index';
</style>