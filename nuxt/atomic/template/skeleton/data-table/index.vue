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
        <atom-skeleton
          :loading="loading"
          class="data-table-header-skeleton"
          height="22px"
        />
      </template>
      <template #body>
        <atom-skeleton :loading="loading" />
      </template>
    </Column>
    <Column class="action-column">
      <template #body>
        <div class="action-column-content">
          <atom-skeleton
            v-for="index in 3"
            :key="index"
            :loading="loading"
            class="data-table-button-skeleton desktop"
            shape="circle"
            width="30px"
            height="30px"
          />
          <atom-skeleton
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
import { SkeletonDataTableInterface } from 'atomic'

defineProps<SkeletonDataTableInterface>()
</script>
