<template>
    <section id="articles">
        <Card class="myCard lg:ml-2 lg:mr-5">
            <template #title>
                <div class="flex justify-content-between">
                    <h3>Manage Articles</h3>

                    <Button
                        label="New Article"
                        @click="openModal('create')"
                        class="text-sm smallHeightButton"
                        :style="articleStyle"
                        :class="{ loading: loading }"
                    />
                </div>
            </template>
            <template #content>
                <DataTable
                    :value="data"
                    :loading="loading"
                    :rows="10"
                    :row-hover="true"
                    :size="'small'"
                    v-if="data"
                    paginator
                    stripedRows
                    @row-click="openModal('show', $event.data)"
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                >
                    <template #loading><ProgressSpinner /></template>
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
                            <div class="flex gap-1 justify-content-around">
                                <Button
                                    class="desktopButton myButton"
                                    icon="pi pi-eye"
                                    @click="openModal('show', row.data)"
                                    :style="articleStyle"
                                />
                                <Button
                                    class="desktopButton myButton"
                                    icon="pi pi-pencil"
                                    @click="openModal('edit', row.data)"
                                    :style="articleStyle"
                                />
                                <Button
                                    class="desktopButton myButton"
                                    icon="pi pi-trash"
                                    @click="openModal('delete', row.data)"
                                    :style="articleStyle"
                                />
                                <Button
                                    class="mobileButton myButton"
                                    icon="pi pi-bars"
                                    @click="openMenu(menu, $event, row.data)"
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
    </section>
    <ShowArticle
        :visible="visibleShow"
        :article="selectedObject"
        :close="closeModal"
    />
    <CreateArticle
        :get-data="getData"
        :visible="visibleCreate"
        :options="roleOptions"
        :close="closeModal"
        :style="articleStyle"
    />
    <EditArticle
        :article="selectedObject"
        :get-data="getData"
        :visible="visibleEdit"
        :options="roleOptions"
        :close="closeModal"
        :style="articleStyle"
    />
    <Dialog :visible="visibleDelete" modal header="Confirm delete article">
        <div class="flex justify-content-between">
            <Button
                severity="secondary"
                label="Cancel"
                @click="closeModal('delete')"
                class="smallHeightButton"
            />
            <Button
                label="Confirm"
                @click="deleteArticle(selectedObject.id, getData, closeModal)"
                class="smallHeightButton"
                :style="articleStyle"
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import CreateArticle from './CreateArticle.vue'
import ShowArticle from './ShowArticle.vue'
import EditArticle from './EditArticle.vue'

import { ArticleInterface } from '@/types'
import { handleDropdownItems, handleStyles, roleOptions } from '@/constants'
import { articleApiMethods, useDisplayCharts, useMenuAndModal } from '@/utils'

defineProps<{
    data: ArticleInterface[] | undefined
    getData: () => void
    loading: boolean
}>()

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

const { deleteArticle } = articleApiMethods()

const { articleStyle } = handleStyles()

const { dropdownItems } = handleDropdownItems(selectedObject, openModal)
</script>
