<template>
    <Dialog :visible="visible" modal class="myDialog">
        <template #header>
            <h2 class="myDialogHeader">Create new article</h2>
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
                    @click="props.close('create')"
                    class="p-button-rounded"
                />
                <Button
                    label="Create"
                    @click="storeArticle(data, getData, close)"
                    class="p-button-rounded"
                    :style="style"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { handleData } from '@/constants'
import { articleApiMethods } from '@/utils'

import { ColorItemStyleInterface } from 'atomic/bosons/types'

const props = defineProps<{
    getData: () => void
    visible: boolean
    options: string[]
    close: (action: string) => void
    style: ColorItemStyleInterface
}>()

const { articleData: data } = handleData()

const { storeArticle } = articleApiMethods()
</script>
