<template>
  <Password
    v-bind="transformProps(props)"
    :feedback="!props.emptyPassword"
    @update:model-value="updateValue"
    :class="$style['ad-password']"
    :pt="{
      pcInputText: {
        root: $style['ad-inputtext']
      },
      overlay: $style['ad-password-overlay']
    }"
  >
    <template v-if="props.id !== 'password_confirmation'" #footer>
      <Divider />
      <ul :class="$style['ad-password-criteria']">
        <li
          v-for="(criterion, index) in criteria"
          :key="index"
          :class="[
            criterion.isValid ? $style['valid'] : $style['invalid'],
            $style['ad-password-criterion']
          ]"
        >
          {{ criterion.label }}
        </li>
      </ul>
    </template>
    <template v-else-if="!props.emptyPassword" #footer>
      <ul :class="$style['ad-password-criteria']">
        <li :class="[
          props.passwordsMatch ? $style['valid'] : $style['invalid'],
          $style['ad-password-criterion']
        ]">
          {{ props.passwordsMatch ? 'Passwords match' : 'Passwords do not match' }}
        </li>
      </ul>
    </template>
  </Password>
</template>

<script setup lang="ts">
import {
  hasLowercase,
  hasMinLength,
  hasNumber,
  hasUppercase,
  transformProps,
} from 'atomic'

import type { PasswordInterface } from '.'

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

<style lang="scss" module>
@import 'index';
</style>