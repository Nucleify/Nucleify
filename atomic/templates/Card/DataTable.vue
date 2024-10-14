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
          <ad-header :tag="tag" :type="type" :text="headerText" />

          <ad-button
            v-if="type !== 'activity'"
            :type="type"
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
      <ad-data-table
        v-if="value"
        :value="value"
        :rows="10"
        :open-dialog="openDialog"
        :styles="styles"
        :type="type"
        :loading="loading"
        paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        current-page-report-template="{first} to {last} of {totalRecords}"
      />
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import { CardDataTableInterface } from 'atomic/bosons/types'

defineProps<CardDataTableInterface>()
</script>
