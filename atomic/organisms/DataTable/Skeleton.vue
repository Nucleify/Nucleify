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
            :header="col.header"
            :class="col.class"
        >
            <template #body>
                <skeleton-atom />
            </template>
        </Column>
        <Column class="actionColumn">
            <template #body>
                <skeleton-atom />
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import { DataTableSkeletonInterface } from 'atomic/bosons/types'

defineProps<DataTableSkeletonInterface>()
</script>
