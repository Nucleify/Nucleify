<template>
    <DataTable
        class="skeleton-data-table"
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
                    class="data-table-header-skeleton"
                    height="22px"
                />
            </template>
            <template #body>
                <skeleton-atom :loading="loading" />
            </template>
        </Column>
        <Column class="action-column">
            <template #body>
                <div class="action-column-content">
                    <skeleton-atom
                        v-for="index in 3"
                        :key="index"
                        :loading="loading"
                        class="data-table-button-skeleton desktop"
                        shape="circle"
                        width="30px"
                        height="30px"
                    />
                    <skeleton-atom
                        :loading="loading"
                        class="data-table-button-skeleton mobile"
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
