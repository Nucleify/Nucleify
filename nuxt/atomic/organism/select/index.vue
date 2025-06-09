<template>
  <Select
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :name="props.name"
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
    :size="props.size"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :variant="props.variant"
    :data-key="props.dataKey"
    :show-clear="props.showClear"
    :fluid="props.fluid"
    :label-id="props.labelId"
    :label-style="props.labelStyle"
    :label-class="props.labelClass"
    :overlay-style="props.overlayStyle"
    :overlay-class="props.overlayClass"
    :append-to="props.appendTo"
    :loading="props.loading"
    :clear-icon="props.clearIcon"
    :dropdown-icon="props.dropdownIcon"
    :loading-icon="props.loadingIcon"
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
    :form-control="props.formControl"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
import type { SelectInterface } from 'atomic'

const props = defineProps<SelectInterface>()
const emit = defineEmits(['update:modelValue'])

function onUpdateModelValue(value: unknown) {
  emit('update:modelValue', value)
}
</script>
