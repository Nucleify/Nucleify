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
      :dismissable-mask="true"
      modal
      class="why-us-dialog"
    >
      <template #header>
        <atom-icon :icon="dialogData.icon" class="text-xl" />
        <atom-heading :tag="4" :text="dialogData.header" />
      </template>
      <template #default>
        <atom-paragraph :text="dialogData.description" />
      </template>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

import {
  FeatureObjectInterface,
  WhyUsInterface,
  WhyUsItemInterface,
  featureRequests,
} from 'atomic'

const props = defineProps<WhyUsInterface>()

let data

if (appEnv() !== 'production') {
  const { getSiteFeatures, resultsBySite } = featureRequests()

  onMounted(() => getSiteFeatures(props.site, false))
  watchEffect(() => data = resultsBySite)
} else {
  ;({ data } = await useFetch(
    apiUrl() + `features/get-site-features/${props.site}`,
    {
      method: 'GET',
      immediate: true,
      watch: false,
    }
  ))
}

const whyUsGroups = computed<
  [FeatureObjectInterface, FeatureObjectInterface?][]
>(() => {
  if (!data.value) return []

  return data.value.reduce(
    (
      result: [FeatureObjectInterface, FeatureObjectInterface?][],
      item,
      index
    ) => {
      if (index % 2 === 0) {
        if (!data.value[index + 1]) result.push([item])
        else result.push([item, data.value[index + 1]])
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
</script>
