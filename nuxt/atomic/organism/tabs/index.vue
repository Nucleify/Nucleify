<template>
  <Tabs
    :value="activeTab"
    :lazy="props.lazy"
    :scrollable="props.scrollable"
    :show-navigators="props.showNavigators"
    :tabindex="props.tabindex"
    :select-on-focus="props.selectOnFocus"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  >
    <TabList>
      <Tab
        v-for="(list, index) in props.lists"
        :value="list.value"
        :key="index"
      >
        <atom-heading :tag="4" :text="list.header" />
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel
        v-for="(panel, index) in props.panels"
        :value="panel.value"
        :key="index"
      >
        <atom-paragraph :text="panel.content" />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { TabsInterface } from 'atomic'

const activeTab = ref(0)
const props = defineProps<TabsInterface>()
</script>
