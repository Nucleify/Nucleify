<template>
  <ad-dialog
    v-bind="transformProps(props, excludedProps)"
    :modal="props.modal || true"
    :show-header="props.showHeader || true"
    class="nuc-dialog"
    :class="props.action"
  >
    <template #header>
      <ad-heading
        v-if="props.action === 'show' && props.selectedObject"
        :tag="2"
        :text="getTitle(props.selectedObject)"
      />
      <ad-heading v-else :tag="2" :text="props.title" />
    </template>

    <form
      v-if="props.fields && props.action !== 'show'"
      class="form-container"
      action="#"
    >
      <div v-for="(field, index) in props.fields" :key="index" class="form-div">
        <label :for="field.name">{{ field.label }}</label>
        <component
          :is="getComponent(field.type as ComponentType)"
          v-bind="field.props"
          :id="field.name"
          v-model="formData[field.name]"
          :ad-type="props.entity"
          :panel-class="isSelectOrDatePicker(field.type) ? props.entity : null"
          :date-format="field.type === 'date-picker' ? 'yy-mm-dd' : null"
          :toggle-mask="field.type === 'password' ? true : null"
          :passwords-match="
            field.name === 'password_confirmation' && passwordsMatch(formData.password, formData.password_confirmation)
              ? true
              : null
          "
          :empty-password="
            field.name === 'password_confirmation' && isEmpty(formData.password)
              ? true
              : null
          "
          :empty-confirm-password="
            field.name === 'password_confirmation' &&
            isEmpty(formData.password_confirmation)
              ? true
              : null
          "
          :mask="isPhoneField(field.name) ? '999-999-999' : null"
          :placeholder="isPhoneField(field.name) ? '999-999-999' : ''"
          :unmask="isPhoneField(field.name) ? true : null"
        />
      </div>
    </form>

    <div
      v-else-if="
        props.fields && props.action === 'show' && props.selectedObject
      "
      class="show-data-container"
    >
      <div v-for="(item, key) in props.fields" :key="key">
        <ad-heading :tag="5" class="show-data-header" :text="item.label" />
        <div>{{ (props.selectedObject as any)[item.key] }}</div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-buttons-container">
        <ad-button
          :label="props.cancelButtonLabel"
          icon="prime:times"
          severity="secondary"
          rounded
          text
          @click="close!(props.action!)"
        />
        <ad-button
          v-if="props.fields && props.confirm"
          :ad-type="props.entity"
          :label="props.confirmButtonLabel"
          icon="prime:check"
          rounded
          text
          @click="props.confirm(formData, props.getData)"
        />
        <ad-button
          v-if="
            props.action === 'delete' && props.confirm && props.selectedObject
          "
          :ad-type="props.entity"
          :label="props.confirmButtonLabel"
          icon="prime:check"
          rounded
          text
          @click="props.confirm(props.selectedObject.id, props.getData)"
        />
      </div>
    </template>
  </ad-dialog>
</template>

<script setup lang="ts">
import type {
  ComponentType,
  FormDataInterface,
  NucDialogInterface,
} from 'atomic'
import {
  getComponent,
  getTitle,
  isEmpty,
  isPhoneField,
  isSelectOrDatePicker,
  passwordsMatch,
  transformProps,
} from 'atomic'

const props = defineProps<NucDialogInterface>()

const excludedProps = [
  'entity',
  'action',
  'title',
  'fields',
  'selectedObject',
  'data',
  'getData',
  'confirmButtonLabel',
  'confirm',
  'cancelButtonLabel',
  'close',
  'style',
]

const formData = ref<FormDataInterface>({
  ...(props.data && (Array.isArray(props.data) ? {} : props.data)),
})

watch(
  () => (props.action === 'edit' ? props.selectedObject : props.data),
  (newData) => {
    formData.value = { ...newData }
  }
)
</script>

<style lang="scss">
@import 'index';
</style>