<template>
  <section id="contacts">
    <ad-card-data-table
      ad-type="contact"
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      header-text="Manage Contacts"
      button-text="New Contact"
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
import { contactRequests, useContactFields, useDialog } from 'atomic'

const props = defineProps<DashboardInterface>()

const {
  visibleShow,
  visibleCreate,
  visibleEdit,
  visibleDelete,
  selectedObject,
  openDialog,
  closeDialog,
} = useDialog()

const { createAndEditFields, showFields } = useContactFields()
const { deleteContact, storeContact, editContact } =
  contactRequests(closeDialog)

const dialogs = computed(() => [
  {
    entity: 'contact',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: 'Close',
    fields: showFields,
  },
  {
    entity: 'contact',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: 'Delete contact?',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteContact,
    getData: props.getData,
  },
  {
    entity: 'contact',
    action: 'create',
    visible: visibleCreate.value,
    title: 'Create new contact',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeContact,
    getData: props.getData,
    fields: createAndEditFields,
  },
  {
    entity: 'contact',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: 'Edit contact',
    confirmButtonLabel: 'Update',
    cancelButtonLabel: 'Cancel',
    confirm: editContact,
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
