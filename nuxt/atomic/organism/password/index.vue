<template>
  <Password
    :id="props.id"
    :model-value="props.modelValue"
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
    :passwords-match="props.passwordsMatch"
    :empty-password="props.emptyPassword"
    :empty-confirm-password="props.emptyConfirmPassword"
    :ad-type="props.type"
    @update:model-value="updateValue"
  >
    <template v-if="props.id !== 'password_confirmation'" #footer>
      <Divider />
      <ul class="password-criteria -mb-1">
        <li
          v-for="(criterion, index) in criteria"
          :key="index"
          :class="{ valid: criterion.isValid, invalid: !criterion.isValid }"
        >
          {{ criterion.label }}
        </li>
      </ul>
    </template>
    <template v-else-if="!props.emptyPassword" #footer>
      <ul class="password-criteria -mb-1">
        <li :class="props.passwordsMatch ? 'valid' : 'invalid'">
          {{ props.passwordsMatch ? 'Passwords match' : 'Passwords do not match' }}
        </li>
      </ul>
    </template>
  </Password>
</template>

<script setup lang="ts">
import type { PasswordInterface } from 'atomic'
import { hasLowercase, hasMinLength, hasNumber, hasUppercase } from 'atomic'

const props = defineProps<PasswordInterface>()
const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue || '')

const criteria = computed(() => [
  { label: 'At least one lowercase', isValid: hasLowercase(localValue.value) },
  { label: 'At least one uppercase', isValid: hasUppercase(localValue.value) },
  { label: 'At least one number', isValid: hasNumber(localValue.value) },
  { label: 'Minimum 8 characters', isValid: hasMinLength(localValue.value) },
])

const updateValue = (value: string) => (
  (localValue.value = value), emit('update:modelValue', value)
)

watch(
  () => props.modelValue,
  (value: string) => (localValue.value = value)
)
</script>
