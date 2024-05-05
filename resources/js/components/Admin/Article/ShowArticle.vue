<template>
    <Dialog :visible="visible" modal header="Show contact" class="w-30rem">
        <template #header>
            <h2 class="m-0">
                {{ article.title }}
            </h2>
        </template>
        <div v-if="article" class="flex flex-column gap-3">
            <div>
                <h5 class="mb-0">Description</h5>
                <div>
                    {{ article.description }}
                </div>
            </div>
            <div>
                <h5 class="mb-0">Category</h5>
                <div>{{ article.category }}</div>
            </div>
            <div class="flex">
                <div class="col-6 p-0">
                    <h5 class="mb-0">Created At</h5>
                    <div>{{ article.created_at }}</div>
                </div>
                <div class="col-6 p-0">
                    <h5 class="mb-0">Updated At</h5>
                    <div>{{ article.updated_at }}</div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex gap-2 justify-content-end">
                <Button
                    severity="secondary"
                    label="Close"
                    @click="props.close('show')"
                    class="smallHeightButton"
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
