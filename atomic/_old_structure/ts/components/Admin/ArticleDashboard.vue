<template>
    <section id="articles">
        <ad-card-data-table
            :value="data"
            :loading="loading"
            :open-dialog="openDialog"
            :tag="3"
            type="article"
            headerText="Manage Articles"
            buttonText="New Article"
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

import { useArticleFields } from 'atomic/bosons/constants'
import { DashboardInterface } from 'atomic/bosons/types'
import { articleRequests, useDialog } from 'atomic/bosons/utils'

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

const { createAndEditFields, showFields } = useArticleFields()
const { deleteArticle, storeArticle, editArticle } = articleRequests()

const dialogs = computed(() => [
    {
        entity: 'article',
        action: 'show',
        visible: visibleShow.value,
        data: selectedObject.value,
        cancelButtonLabel: 'Close',
        fields: showFields,
    },
    {
        entity: 'article',
        action: 'delete',
        visible: visibleDelete.value,
        selectedObject: selectedObject.value,
        title: 'Delete article?',
        confirmButtonLabel: 'Confirm',
        cancelButtonLabel: 'Cancel',
        confirm: deleteArticle,
        getData: props.getData,
    },
    {
        entity: 'article',
        action: 'create',
        visible: visibleCreate.value,
        title: 'Create new article',
        confirmButtonLabel: 'Confirm',
        cancelButtonLabel: 'Cancel',
        confirm: storeArticle,
        getData: props.getData,
        fields: createAndEditFields,
    },
    {
        entity: 'article',
        action: 'edit',
        visible: visibleEdit.value,
        data: selectedObject.value,
        title: 'Edit article',
        confirmButtonLabel: 'Update',
        cancelButtonLabel: 'Cancel',
        confirm: editArticle,
        getData: props.getData,
        fields: createAndEditFields,
    },
])
</script>
