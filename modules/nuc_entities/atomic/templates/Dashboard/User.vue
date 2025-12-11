<template>
  <section id="users">
    <nuc-entity-datatable-card
      ad-type="user"
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      header-text="Manage Users"
      button-text="New User"
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
import { useNucDialog, userRequests, useUserFields } from 'atomic'

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

const { createFields, editFields, showFields } = useUserFields()
const { deleteUser, storeUser, editUser } = userRequests(closeDialog)

const dialogs = computed(() => [
  {
    entity: 'user',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: 'Close',
    fields: showFields,
  },
  {
    entity: 'user',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: 'Delete user?',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteUser,
    getData: props.getData,
  },
  {
    entity: 'user',
    action: 'create',
    visible: visibleCreate.value,
    title: 'Create new user',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeUser,
    getData: props.getData,
    fields: createFields,
  },
  {
    entity: 'user',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: 'Edit user',
    confirmButtonLabel: 'Update',
    cancelButtonLabel: 'Cancel',
    confirm: editUser,
    getData: props.getData,
    fields: editFields,
  },
])
</script>
