<template>
  <section id="links">
    <nuc-entity-datatable-card
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      ad-type="link"
      header-text="Manage Links"
      button-text="New Link"
    />

    <nuc-dialog
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

import type { NucDashboardInterface } from 'atomic'
import { linkRequests, useLinkFields, useNucDialog } from 'atomic'

const props = defineProps<NucDashboardInterface>()

const {
  visibleShow,
  visibleCreate,
  visibleEdit,
  visibleDelete,
  selectedObject,
  openDialog,
  closeDialog,
} = useNucDialog()

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
    title: 'Delete link?',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteLink,
    getData: props.getData,
  },
  {
    entity: 'link',
    action: 'create',
    visible: visibleCreate.value,
    title: 'Create new link',
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
    title: 'Edit link',
    confirmButtonLabel: 'Update',
    cancelButtonLabel: 'Cancel',
    confirm: editLink,
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
