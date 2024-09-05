<template>
    <DataTable
        class="skeletonDataTable"
        :value="rows"
        v-if="loading"
        :size="'small'"
    >
        <Column
            v-for="(col, index) in specificColumns"
            :key="index"
            :class="col.class"
        >
            <template #header>
                <skeleton-atom
                    :loading="loading"
                    class="dataTableHeaderSkeleton"
                    height="22px"
                />
            </template>
            <template #body>
                <skeleton-atom :loading="loading" />
            </template>
        </Column>
        <Column class="actionColumn">
            <template #body>
                <div class="actionColumnContent">
                    <skeleton-atom
                        v-for="index in 3"
                        :key="index"
                        :loading="loading"
                        class="dataTableButtonSkeleton desktop"
                        shape="circle"
                        width="30px"
                        height="30px"
                    />
                    <skeleton-atom
                        :loading="loading"
                        class="dataTableButtonSkeleton mobile"
                        shape="circle"
                        width="30px"
                        height="30px"
                    />
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import { DataTableSkeletonInterface } from 'atomic/bosons/types'

defineProps<DataTableSkeletonInterface>()
</script>
