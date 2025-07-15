<template>
  <Password
    :model-value="props.modelValue"
    @update:model-value="updateValue"
    :default-value="props.defaultValue"
    :name="props.name"
    :prompt-label="props.promptLabel"
    :medium-regex="props.mediumRegex"
    :strong-regex="props.strongRegex"
    :weak-label="props.weakLabel"
    :medium-label="props.mediumLabel"
    :strong-label="props.strongLabel"
    :feedback="!props.emptyPassword"
    :append-to="props.appendTo"
    :toggle-mask="props.toggleMask"
    :mask-icon="props.maskIcon"
    :unmask-icon="props.unmaskIcon"
    :size="props.size"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :variant="props.variant"
    :placeholder="props.placeholder"
    :required="props.required"
    :fluid="props.fluid"
    :autofocus="props.autofocus"
    :input-id="props.inputId"
    :input-style="props.inputStyle"
    :input-class="props.inputClass"
    :input-props="props.inputProps"
    :panel-id="props.panelId"
    :panel-class="props.panelClass"
    :panel-style="props.panelStyle"
    :panel-props="props.panelProps"
    :overlay-id="props.overlayId"
    :overlay-class="props.overlayClass"
    :overlay-style="props.overlayStyle"
    :overlay-props="props.overlayProps"
    :aria-labelledby="props.ariaLabelledby"
    :aria-label="props.ariaLabel"
    :form-control="props.formControl"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
    :id="props.id"
    :passwords-match="passwordsMatch"
    :empty-password="emptyPassword"
    :empty-confirm-password="emptyConfirmPassword"
    :ad-type="props.type"
  >
    <template #footer v-if="id !== 'password_confirmation'">
      <Divider />
      <ul class="password-criteria -mb-1">
        <li
          v-for="(criterion, index) in criteria"
          :key="index"
          :class="{ valid: criterion.isValid }"
        >
          {{ criterion.label }}
        </li>
      </ul>
    </template>
    <template #footer v-else-if="!emptyPassword">
      <ul class="password-criteria -mb-1">
        <li :class="passwordsMatch ? 'valid' : 'invalid'">
          {{ passwordsMatch ? 'Passwords match' : 'Passwords do not match' }}
        </li>
      </ul>
    </template>
  </Password>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import {
  PasswordInterface,
  checkLowercase,
  checkMinLength,
  checkNumeric,
  checkUppercase,
} from 'atomic'

const props = defineProps<PasswordInterface>()

const { t } = useI18n()

const hasLowercase = computed(() => checkLowercase(props.modelValue!))
const hasUppercase = computed(() => checkUppercase(props.modelValue!))
const hasNumeric = computed(() => checkNumeric(props.modelValue!))
const hasMinLength = computed(() => checkMinLength(props.modelValue!))

const criteria = computed(() => [
  { label: t('auth.criteria.lowercase'), isValid: hasLowercase.value },
  { label: t('auth.criteria.uppercase'), isValid: hasUppercase.value },
  { label: t('auth.criteria.numeric'), isValid: hasNumeric.value },
  { label: t('auth.criteria.length'), isValid: hasMinLength.value },
])

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>
