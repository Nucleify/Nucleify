<template>
    <Card class="my-card">
        <template #title>
            <div class="my-card-header-container">
                <template v-if="loading">
                    <skeleton-atom
                        :loading="loading"
                        width="180px"
                        height="30px"
                        border-radius="10px"
                        class="heading-skeleton"
                    />
                    <skeleton-atom
                        :loading="loading"
                        width="30px"
                        height="30px"
                        shape="circle"
                    />
                </template>
                <template v-else>
                    <heading-atom :tag="tag" :type="type" :text="headerText" />

                    <button-atom
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
            <data-table-organism
                v-if="value"
                :value="value"
                :rows="10"
                :open-dialog="openDialog"
                :styles="styles"
                :type="type"
                :loading="loading"
            />
        </template>
    </Card>
</template>

<script setup lang="ts">
import { CardDataTableInterface } from 'atomic/bosons/types'

defineProps<CardDataTableInterface>()
</script>
