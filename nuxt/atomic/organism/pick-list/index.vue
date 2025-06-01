<template>
  <PickList
    :v-model="props.modelValue"
    :selection="props.selection"
    :data-key="props.dataKey"
    :meta-key-selection="props.metaKeySelection"
    :auto-option-focus="props.autoOptionFocus"
    :focus-on-hover="props.focusOnHover"
    :list-style="props.listStyle"
    :responsive="props.responsive"
    :breakpoint="props.breakpoint"
    :scroll-height="props.scrollHeight"
    :striped="props.striped"
    :show-source-controls="props.showSourceControls"
    :show-target-controls="props.showTargetControls"
    :button-props="props.buttonProps"
    :move-up-button-props="props.moveUpButtonProps"
    :move-top-button-props="props.moveTopButtonProps"
    :move-down-button-props="props.moveDownButtonProps"
    :move-bottom-button-props="props.moveBottomButtonProps"
    :move-to-target-props="props.moveToTargetProps"
    :move-all-to-target-props="props.moveAllToTargetProps"
    :move-to-source-props="props.moveToSourceProps"
    :move-all-to-source-props="props.moveAllToSourceProps"
    :tabindex="props.tabindex"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { PickListInterface } from 'atomic'

const props = defineProps<PickListInterface>()
</script>
