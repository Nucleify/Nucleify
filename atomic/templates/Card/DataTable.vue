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
