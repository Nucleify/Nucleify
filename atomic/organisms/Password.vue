<template>
  <Password
    :model-value="props.modelValue"
    @update:model-value="updateValue"
    :prompt-label="props.promptLabel"
    :medium-regex="props.mediumRegex"
    :strong-regex="props.strongRegex"
    :weak-label="props.weakLabel"
    :medium-label="props.mediumLabel"
    :strong-label="props.strongLabel"
    :feedback="!props.emptyPassword"
    :append-to="props.appendTo"
    :toggle-mask="props.toggleMask"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :variant="props.variant"
    :placeholder="props.placeholder"
    :required="props.required"
    :input-id="props.inputId"
    :input-style="props.inputStyle"
    :input-class="props.inputClass"
    :input-props="props.inputProps"
    :panel-id="props.panelId"
    :panel-class="props.panelClass"
    :panel-style="props.panelStyle"
    :panel-props="props.panelProps"
    :aria-labelledby="props.ariaLabelledby"
    :aria-label="props.ariaLabel"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
    :id="props.id"
    :passwords-match="passwordsMatch"
    :empty-password="emptyPassword"
    :empty-confirm-password="emptyConfirmPassword"
    :v-type="props.type"
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
  checkLowercase,
  checkMinLength,
  checkNumeric,
  checkUppercase,
} from '../bosons/utils'

import { PasswordInterface } from '../bosons/types'

const props = defineProps<PasswordInterface>()

const hasLowercase = computed(() => checkLowercase(props.modelValue))
const hasUppercase = computed(() => checkUppercase(props.modelValue))
const hasNumeric = computed(() => checkNumeric(props.modelValue))
const hasMinLength = computed(() => checkMinLength(props.modelValue))

const criteria = computed(() => [
  { label: 'At least one lowercase', isValid: hasLowercase.value },
  { label: 'At least one uppercase', isValid: hasUppercase.value },
  { label: 'At least one numeric', isValid: hasNumeric.value },
  { label: 'Minimum 8 characters', isValid: hasMinLength.value },
])

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>
