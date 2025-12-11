<template>
  <ad-data-table
    v-if="loading"
    class="entity-datatable skeleton-data-table"
    :value="rows"
    size="small"
    filter-display="row"
  >
    <Column
      v-for="(col, index) in specificColumns"
      :key="index"
      :class="col.class"
    >
      <template #header>
        <ad-skeleton
          :loading="loading"
          width="100%"
          height="22px"
        />
      </template>
      <template #filter>
        <ad-skeleton
          :loading="loading"
          width="100%"
          height="22px"
        />
      </template>
      <template #body>
        <ad-skeleton 
          :loading="loading" 
          height="34px" 
        />
      </template>
    </Column>
    <Column class="action-column">
      <template #body>
        <div class="action-column-content">
          <ad-skeleton
            v-for="index in 3"
            :key="index"
            :loading="loading"
            class="desktop"
            shape="circle"
            width="34px"
            height="34px"
          />
          <ad-skeleton
            :loading="loading"
            class="mobile"
            shape="circle"
            width="34px"
            height="34px"
          />
        </div>
      </template>
    </Column>
  </ad-data-table>
</template>

<script setup lang="ts">
import type { NucSkeletonDataTableInterface } from 'atomic'

defineProps<NucSkeletonDataTableInterface>()
</script>
