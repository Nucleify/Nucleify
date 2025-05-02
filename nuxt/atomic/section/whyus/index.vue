<template>
  <section id="why-us">
    <div class="why-us-container">
      <div class="why-us-header">
        <span>Why </span>
        <span>Us?</span>
      </div>

      <div
        v-for="(whyUsGroup, groupItemIndex) in whyUsGroups"
        :key="groupItemIndex"
        :class="`why-us-${groupItemIndex}`"
      >
        <atom-icon
          v-for="(item, itemIndex) in whyUsGroup"
          :key="itemIndex"
          :icon="item?.icon"
          class="why-us-item"
          @click="openDialog(item!)"
          v-tooltip="'Click me!'"
        />
      </div>
    </div>
    <Dialog
      v-model:visible="dialogVisible"
      :data="dialogData"
      @close="dialogVisible = false"
      modal
      class="why-us-dialog"
    >
      <template #header>
        <div class="flex align-items-center gap-4">
          <atom-icon :icon="dialogData.icon" class="text-xl" />
          <atom-heading :tag="4" class="m-0" :text="dialogData.header" />
        </div>
      </template>
      <template #default>
        <atom-paragraph class="m-0 text-sm" :text="dialogData.description" />
      </template>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

import {
  FeatureInterface,
  WhyUsInterface,
  WhyUsItemInterface,
  featureRequests,
  useDialog,
} from 'atomic'

const { closeDialog } = useDialog()
const { getSiteFeatures, resultsBySite } = featureRequests(closeDialog)

const props = defineProps<WhyUsInterface>()

const whyUsGroups = computed<[FeatureInterface, FeatureInterface?][]>(() => {
  if (!resultsBySite.value.length) return []

  return resultsBySite.value.reduce(
    (result: [FeatureInterface, FeatureInterface?][], item, index) => {
      if (index % 2 === 0) {
        if (!resultsBySite.value[index + 1]) result.push([item])
        else result.push([item, resultsBySite.value[index + 1]])
      }
      return result
    },
    []
  )
})

const dialogVisible = ref(false)
const dialogData = ref()

const openDialog = (item: WhyUsItemInterface) => {
  dialogData.value = item
  dialogVisible.value = true
}

const handleClickOutside = (event: MouseEvent) => {
  if (!dialogVisible.value) return

  const dialogElement = document.querySelector('.why-us-dialog')

  if (dialogElement && !dialogElement.contains(event.target as Node)) {
    dialogVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  getSiteFeatures(props.site!, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>
