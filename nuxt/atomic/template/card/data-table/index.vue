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
            @click="openDialog('create')"
          />
        </template>
      </div>
    </template>
    <template #content>
      <ad-data-table
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
  </ad-card>
</template>

<script setup lang="ts">
import type { CardDataTableInterface } from 'atomic'

defineProps<CardDataTableInterface>()
</script>
