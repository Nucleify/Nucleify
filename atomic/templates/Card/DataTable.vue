<template>
    <Card class="myCard">
        <template #title>
            <div class="myCardHeaderContainer">
                <heading-atom
                    :tag="tag"
                    :type="type"
                    :text="headerText"
                    class="-mb-2"
                />

                <button-atom
                    v-if="type !== 'activity'"
                    :label="buttonText"
                    @click="openDialog('create')"
                    class="text-sm smallHeightButton primaryButton"
                    :rounded="true"
                    :style="styles"
                    :class="{ loading: loading }"
                />
            </div>
        </template>
        <template #content>
            <data-table-organism
                v-if="data"
                :data="data"
                :open-dialog="openDialog"
                :styles="styles"
                :type="type"
                :loading="loading"
            />
            <div v-else>Loading data or no data available...</div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { CardDataTableInterface } from 'atomic/bosons/types'

defineProps<CardDataTableInterface>()
</script>
