<template>
    <div class="panelContainer">
        <Card v-if="display.Article" class="myCard chartCard annualChartCard">
            <template #content>
                <my-chart
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
                        @click="openModal('create')"
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
                    @row-click="openModal('show', $event.data)"
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
                                    class="desktopButton dataTableButton"
                                    icon="pi pi-eye"
                                    @click="openModal('show', row.data)"
                                    :rounded="true"
                                    :style="articleStyle"
                                />
                                <button-atom
                                    class="desktopButton dataTableButton"
                                    icon="pi pi-pencil"
                                    @click="openModal('edit', row.data)"
                                    :rounded="true"
                                    :style="articleStyle"
                                />
                                <button-atom
                                    class="desktopButton dataTableButton"
                                    icon="pi pi-trash"
                                    @click="openModal('delete', row.data)"
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
                                <Menu
                                    ref="menu"
                                    :model="dropdownItems"
                                    :popup="true"
                                />
                            </div>
                        </template>
                    </Column>
                </DataTable>
                <div v-else>Loading data or no data available...</div>
            </template>
        </Card>
    </div>
    <ShowArticle
        :visible="visibleShow"
        :article="selectedObject"
        :close="closeModal"
    />
    <CreateArticle
        :get-data="getAllArticles"
        :visible="visibleCreate"
        :options="roleOptions"
        :close="closeModal"
        :style="articleStyle"
    />
    <EditArticle
        :article="selectedObject"
        :get-data="getAllArticles"
        :visible="visibleEdit"
        :options="roleOptions"
        :close="closeModal"
        :style="articleStyle"
    />
    <Dialog :visible="visibleDelete" modal header="Confirm delete article">
        <div class="flex justify-content-between">
            <button-atom
                label="Cancel"
                severity="secondary"
                @click="closeModal('delete')"
                :rounded="true"
            />
            <button-atom
                label="Confirm"
                @click="
                    deleteArticle(
                        selectedObject!.id!,
                        getAllArticles,
                        closeModal
                    )
                "
                :rounded="true"
                :style="articleStyle"
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { MyChart } from '@/components'

import CreateArticle from './CreateArticle.vue'
import ShowArticle from './ShowArticle.vue'
import EditArticle from './EditArticle.vue'

import { handleDropdownItems, roleOptions } from '@/constants'
import { articleApiMethods, useDisplayCharts, useMenuAndModal } from '@/utils'

import { handleStyles } from 'atomic/bosons/constants'

const menu = ref()

const { display } = useDisplayCharts()
const {
    visibleShow,
    visibleCreate,
    visibleEdit,
    visibleDelete,
    selectedObject,
    openMenu,
    openModal,
    closeModal,
} = useMenuAndModal()

const { results, loading, getAllArticles, deleteArticle } = articleApiMethods()

const { articleStyle } = handleStyles()

const { dropdownItems } = handleDropdownItems(selectedObject, openModal)

onMounted(() => {
    getAllArticles(500)
})
</script>

<style scoped>
:deep(.p-progress-spinner-circle) {
    stroke: var(--article-item-color);
    animation: p-progress-spinner-dash 1.2s ease-in-out infinite;
}
</style>
