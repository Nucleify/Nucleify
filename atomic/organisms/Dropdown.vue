<template>
  <Dropdown
    :model-value="props.modelValue"
    @update:model-value="onUpdateModelValue"
    :option="props.option"
    :option-label="props.optionLabel"
    :option-value="props.optionValue"
    :option-disabled="props.optionDisabled"
    :option-group-children="props.optionGroupChildren"
    :scroll-height="props.scrollHeight"
    :filter="props.filter"
    :filter-placeholder="props.filterPlaceholder"
    :filter-locale="props.filterLocale"
    :filter-match-mode="props.filterMatchMode"
    :filter-fields="props.filterFields"
    :editable="props.editable"
    :placeholder="props.placeholder"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :variant="props.variant"
    :data-key="props.dataKey"
    :show-clear="props.showClear"
    :input-id="props.inputId"
    :input-style="props.inputStyle"
    :input-class="props.inputClass"
    :input-props="props.inputProps"
    :panel-style="props.panelStyle"
    :panel-class="props.panelClass"
    :panel-props="props.panelProps"
    :filter-input-props="props.filterInputProps"
    :append-to="props.appendTo"
    :loading="props.loading"
    :reset-filter-on-hide="props.resetFilterOnHide"
    :reset-filter-on-clear="props.resetFilterOnClear"
    :virtual-scroller-options="props.virtualScrollerOptions"
    :auto-option-focus="props.autoOptionFocus"
    :auto-filter-focus="props.autoFilterFocus"
    :select-on-focus="props.selectOnFocus"
    :focus-on-hover="props.focusOnHover"
    :highlight-on-select="props.highlightOnSelect"
    :checkmark="props.checkmark"
    :filter-message="props.filterMessage"
    :selection-message="props.selectionMessage"
    :empty-selection-message="props.emptySelectionMessage"
    :empty-filter-message="props.emptyFilterMessage"
    :empty-message="props.emptyMessage"
    :tabindex="props.tabindex"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabelledby"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import { DropdownInterface } from 'atomic/bosons/types'

const props = defineProps<DropdownInterface>()
const emit = defineEmits(['update:modelValue'])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onUpdateModelValue(value: any) {
  emit('update:modelValue', value)
}
</script>
