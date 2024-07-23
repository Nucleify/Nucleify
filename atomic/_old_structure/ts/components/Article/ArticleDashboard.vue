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
                <DataTable
                    :value="results"
                    :loading="loading"
                    :rows="10"
                    :row-hover="true"
                    :size="'small'"
                    v-if="results"
                    paginator
                    stripedRows
                    @row-click="openDialog('show', $event.data)"
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                >
                    <template #loading><progress-spinner-atom /></template>
                    <Column
                        field="id"
                        :sortable="true"
                        header="ID"
                        class="idColumn"
                    />
                    <Column
                        field="title"
                        :sortable="true"
                        header="Title"
                        class="titleColumn"
                    />
                    <Column
                        field="category"
                        :sortable="true"
                        header="Category"
                        class="categoryColumn desktopColumn"
                    />
                    <Column
                        field="created_at"
                        :sortable="true"
                        header="Created At"
                        class="createdAtColumn"
                    />
                    <Column
                        field="updated_at"
                        :sortable="true"
                        header="Updated At"
                        class="updatedAtColumn"
                    />
                    <Column class="actionColumn">
                        <template #body="row">
                            <div class="actionColumnContent">
                                <button-atom
                                    v-for="action in actions"
                                    :key="action.icon"
                                    class="desktopButton dataTableButton"
                                    :icon="action.icon"
                                    @click="action.click(row.data)"
                                    :rounded="true"
                                    :style="articleStyle"
                                />
                                <button-atom
                                    class="mobileButton dataTableButton"
                                    icon="pi pi-bars"
                                    @click="openMenu(menu, $event, row.data)"
                                    :rounded="true"
                                    :style="articleStyle"
                                />
                            </div>
                        </template>
                    </Column>
                </DataTable>
                <div v-else>Loading data or no data available...</div>
            </template>
        </Card>
    </div>

    <Menu ref="menu" :model="dropdownItems" :popup="true" />
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
import { ref, onMounted, computed } from 'vue'

import { handleDropdownItems } from '@/constants'
import { articleApiMethods, useMenuAndModal } from '@/utils'

import {
    handleActions,
    handleStyles,
    useArticleFields,
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
const menu = ref()
const actions = handleActions(openDialog)
const { dropdownItems } = handleDropdownItems(selectedObject, openDialog)
const { display } = useDisplayCharts()
const { openMenu } = useMenuAndModal()

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
