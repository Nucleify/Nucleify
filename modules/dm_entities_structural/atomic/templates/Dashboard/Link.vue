<template>
  <section id="links">
    <ad-card-data-table
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      ad-type="link"
      :headerText="t('admin.sections.link.header')"
      buttonText="New Link"
    />

    <ad-dialog
      v-for="dialog in dialogs"
      :key="dialog.action"
      :entity="dialog.entity"
      :action="dialog.action"
      :visible="dialog.visible"
      :selected-object="selectedObject"
      :title="dialog.title"
      :fields="dialog.fields"
      :confirm-button-label="dialog.confirmButtonLabel"
      :cancel-button-label="dialog.cancelButtonLabel"
      :confirm="dialog.confirm"
      :get-data="dialog.getData"
      :close="closeDialog"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { DashboardInterface } from 'atomic'
import { linkRequests, useDialog, useLinkFields } from 'atomic'

const props = defineProps<DashboardInterface>()

const { t } = useI18n()

const {
  visibleShow,
  visibleCreate,
  visibleEdit,
  visibleDelete,
  selectedObject,
  openDialog,
  closeDialog,
} = useDialog()

const { createAndEditFields, showFields } = useLinkFields()
const { deleteLink, storeLink, editLink } = linkRequests(closeDialog)

const dialogs = computed(() => [
  {
    entity: 'link',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: 'Close',
    fields: showFields,
  },
  {
    entity: 'link',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: t('admin.dialogs.delete.headers.link'),
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteLink,
    getData: props.getData,
  },
  {
    entity: 'link',
    action: 'create',
    visible: visibleCreate.value,
    title: t('admin.dialogs.create.headers.link'),
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeLink,
    getData: props.getData,
    fields: createAndEditFields,
  },
  {
    entity: 'link',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: t('admin.dialogs.edit.headers.link'),
    confirmButtonLabel: 'Update',
    cancelButtonLabel: 'Cancel',
    confirm: editLink,
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
