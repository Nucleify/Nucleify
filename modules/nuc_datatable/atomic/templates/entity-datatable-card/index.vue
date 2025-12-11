<template>
  <ad-card class="nuc-card-base">
    <template #title>
      <div class="nuc-card-base-header-container">
        <template v-if="props.loading">
          <ad-skeleton
            :loading="props.loading"
            width="180px"
            height="28px"
            border-radius="10px"
            class="heading-skeleton"
          />
          <ad-skeleton
            :loading="props.loading"
            width="28px"
            height="28px"
            shape="circle"
          />
        </template>
        <template v-else>
          <ad-heading :tag="props.tag" :text="props.headerText" />

          <ad-button
            v-if="props.adType !== 'activity'"
            :ad-type="props.adType"
            icon="prime:plus"
            rounded
            text
            @click="props.openDialog?.('create')"
          />
        </template>
      </div>
    </template>
    <template #content>
      <nuc-entity-datatable
        v-if="props.value"
        :value="props.value"
        :rows="10"
        :rows-per-page-options="[10, 20, 50]"
        :open-dialog="props.openDialog"
        :ad-type="props.adType"
        :loading="props.loading"
        :global-filter-fields="globalFilterFields"
        v-model:filters="filters"
        filter-display="row"
        paginator-template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        current-page-report-template="{first} to {last} of {totalRecords}"
      />
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import type { NucEntityDatatableCardInterface } from 'atomic'
import { columns } from 'atomic'

const props = defineProps<NucEntityDatatableCardInterface>()

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