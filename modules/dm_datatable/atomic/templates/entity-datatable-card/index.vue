<template>
  <ad-card class="my-card">
    <template #title>
      <div class="my-card-header-container">
        <template v-if="loading">
          <ad-skeleton
            :loading="loading"
            width="180px"
            height="30px"
            border-radius="10px"
            class="heading-skeleton"
          />
          <ad-skeleton
            :loading="loading"
            width="30px"
            height="30px"
            shape="circle"
          />
        </template>
        <template v-else>
          <ad-heading :tag="tag" :text="headerText" />

          <ad-button
            v-if="adType !== 'activity'"
            :ad-type="adType"
            icon="prime:plus"
            class=""
            rounded
            text
            @click="openDialog?.('create')"
          />
        </template>
      </div>
    </template>
    <template #content>
      <dm-entity-datatable
        v-if="value"
        :value="value"
        :rows="10"
        :rows-per-page-options="[10, 20, 50]"
        :open-dialog="openDialog"
        :styles="styles"
        :ad-type="adType"
        :loading="loading"
        v-model:filters="filters"
        :filter-display="'row'"
        :global-filter-fields="globalFilterFields"
        paginator-template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        current-page-report-template="{first} to {last} of {totalRecords}"
      />
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import type { DMEntityDatatableCardInterface } from 'atomic'
import { columns } from 'atomic'

const props = defineProps<DMEntityDatatableCardInterface>()

const specificColumns = columns[props.adType as keyof typeof columns]

const filters = ref({
  global: { value: '', matchMode: 'contains' },
  ...Object.fromEntries(
    specificColumns.map((col: { field?: string }) => [
      col.field,
      { value: null, matchMode: 'contains' },
    ])
  ),
})

const globalFilterFields = computed(() =>
  specificColumns.map((col: { field?: string }) => col.field).filter(Boolean)
)
</script>