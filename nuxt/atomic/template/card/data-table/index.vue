<template>
  <organism-card class="my-card">
    <template #title>
      <div class="my-card-header-container">
        <template v-if="loading">
          <atom-skeleton
            :loading="loading"
            width="180px"
            height="30px"
            border-radius="10px"
            class="heading-skeleton"
          />
          <atom-skeleton
            :loading="loading"
            width="30px"
            height="30px"
            shape="circle"
          />
        </template>
        <template v-else>
          <atom-heading :tag="tag" :text="headerText" />

          <atom-button
            v-if="adType !== 'activity'"
            :ad-type="adType"
            icon="pi pi-plus"
            @click="openDialog('create')"
            class=""
            rounded
            text
          />
        </template>
      </div>
    </template>
    <template #content>
      <organism-data-table
        v-if="value"
        :value="value"
        :rows="10"
        :open-dialog="openDialog"
        :styles="styles"
        :ad-type="adType"
        :loading="loading"
        paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        current-page-report-template="{first} to {last} of {totalRecords}"
      />
    </template>
  </organism-card>
</template>

<script setup lang="ts">
import { CardDataTableInterface } from 'atomic'

defineProps<CardDataTableInterface>()
</script>
