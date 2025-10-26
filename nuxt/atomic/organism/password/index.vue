<template>
  <Password
    v-bind="transformProps(props)"
    :feedback="!props.emptyPassword"
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
import {
  hasLowercase,
  hasMinLength,
  hasNumber,
  hasUppercase,
  transformProps,
} from 'atomic'

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
