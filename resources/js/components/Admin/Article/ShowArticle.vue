<template>
    <Dialog :visible="visible" modal header="Show contact" class="myDialog">
        <template #header>
            <h2 class="myDialogHeader">
                {{ article.title }}
            </h2>
        </template>
        <div v-if="article" class="showDataContainer">
            <div>
                <h5 class="showDataHeader">Description</h5>
                <div>
                    {{ article.description }}
                </div>
            </div>
            <div>
                <h5 class="showDataHeader">Category</h5>
                <div>{{ article.category }}</div>
            </div>
            <div class="showDataDatesContainer">
                <div class="showDataDate col-6">
                    <h5 class="showDataHeader">Created At</h5>
                    <div>{{ article.created_at }}</div>
                </div>
                <div class="showDataDate col-6">
                    <h5 class="showDataHeader">Updated At</h5>
                    <div>{{ article.updated_at }}</div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="dialogButtonsContainer">
                <Button
                    severity="secondary"
                    label="Close"
                    @click="props.close('show')"
                    class="p-button-rounded"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ArticleInterface } from '@/types'

const props = defineProps<{
    visible: boolean
    article: ArticleInterface
    close: (action: string) => void
}>()
</script>
