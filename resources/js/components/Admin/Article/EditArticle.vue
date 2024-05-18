<template>
    <Dialog :visible="visible" modal class="myDialog">
        <template #header>
            <h2 class="myDialogHeader">Edit: {{ article.title }}</h2>
        </template>

        <form action="#" class="formContainer">
            <div class="formDiv">
                <label for="title">Title</label>
                <InputText id="title" type="text" v-model="data.title" />
            </div>

            <div class="formDiv">
                <label for="description">Description</label>
                <Textarea
                    id="description"
                    type="text"
                    v-model="data.description"
                />
            </div>

            <div class="formDiv">
                <label for="category">Category</label>
                <InputText id="category" type="text" v-model="data.category" />
            </div>
        </form>

        <template #footer>
            <div class="dialogButtonsContainer">
                <Button
                    severity="secondary"
                    label="Cancel"
                    @click="props.close('edit')"
                    class="smallHeightButton"
                />
                <Button
                    label="Confirm"
                    @click.prevent="editArticle(data, getData, close)"
                    class="smallHeightButton"
                    :style="style"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue'

import { ArticleInterface, ColorItemStyleInterface } from '@/types'
import { handleData } from '@/constants'
import { articleApiMethods } from '@/utils'

const props = defineProps<{
    article: ArticleInterface
    getData: () => void
    visible: boolean
    options: string[]
    close: (action: string) => void
    style: ColorItemStyleInterface
}>()

const { visible, article } = toRefs(props)

const { articleData: data } = handleData()

const { editArticle } = articleApiMethods()

/**
 * Check modal open with watch visible variable, then pass props to data
 */
watch(visible, () => {
    Object.assign(data.value, article.value)
})
</script>
