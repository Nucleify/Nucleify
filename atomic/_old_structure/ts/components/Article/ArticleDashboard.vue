<template>
    <div class="panelContainer">
        <Card v-if="display.Article" class="myCard chartCard annualChartCard">
            <template #content>
                <chart-organism
                    :chart-method-type="'annual'"
                    :type="'bar'"
                    :direction="'vertical'"
                    :article-data="results"
                    :chart-class="'h-30rem'"
                />
                <progress-spinner-atom v-if="loading" />
            </template>
        </Card>
        <Card class="myCard articleDashboard">
            <template #title>
                <div class="myCardHeaderContainer">
                    <heading-atom
                        :tag="3"
                        text="Manage Articles"
                        class="-mb-2"
                    />
                    <button-atom
                        label="New Article"
                        @click="openDialog('create')"
                        class="text-sm smallHeightButton primaryButton"
                        :rounded="true"
                        :style="articleStyle"
                        :class="{ loading: loading }"
                    />
                </div>
            </template>
            <template #content>
                <data-table-organism
                    v-if="results"
                    :data="results"
                    :open-dialog="openDialog"
                    :styles="articleStyle"
                    type="article"
                    :loading="loading"
                    :selected-object="selectedObject"
                />
                <div v-else>Loading data or no data available...</div>
            </template>
        </Card>
    </div>

    <dialog-organism
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
        :style="articleStyle"
    />
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'

import { articleApiMethods } from '@/utils'

import {
    handleStyles,
    useArticleFields
} from 'atomic/bosons/constants'
import { useDialog, useDisplayCharts } from 'atomic/bosons/utils'

const {
    visibleShow,
    visibleCreate,
    visibleEdit,
    visibleDelete,
    selectedObject,
    openDialog,
    closeDialog,
} = useDialog()
const { display } = useDisplayCharts()

const { createAndEditFields, showFields } = useArticleFields()
const {
    results,
    loading,
    getAllArticles,
    storeArticle,
    editArticle,
    deleteArticle,
} = articleApiMethods()
const { articleStyle } = handleStyles()

onMounted(() => {
    getAllArticles(500)
})

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
        getData: getAllArticles,
    },
    {
        entity: 'article',
        action: 'create',
        visible: visibleCreate.value,
        title: 'Create new article',
        confirmButtonLabel: 'Confirm',
        cancelButtonLabel: 'Cancel',
        confirm: storeArticle,
        getData: getAllArticles,
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
        getData: getAllArticles,
        fields: createAndEditFields,
    },
])
</script>

<style scoped>
:deep(.p-progress-spinner-circle) {
    stroke: var(--article-item-color);
    animation: p-progress-spinner-dash 1.2s ease-in-out infinite;
}
</style>
