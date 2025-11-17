<template>
  <Tabs
    v-bind="transformProps(props, excludedProps)"
    :value="activeTab"
  >
    <TabList>
      <Tab
        v-for="(list, index) in props.lists"
        :key="index"
        :value="list.value"
      >
        <ad-heading :tag="4" :text="list.header" />
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel
        v-for="(panel, index) in props.panels"
        :key="index"
        :value="panel.value"
      >
        <ad-paragraph :text="panel.content" />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<script setup lang="ts">
import type { TabsInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<TabsInterface>()

const excludedProps = ['lists', 'panels']

const activeTab = ref(0)
</script>
