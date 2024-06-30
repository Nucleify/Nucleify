<template>
    <Dialog :visible="visible" modal class="myDialog">
        <template #header>
            <heading-atom :tag="2" text="Create new article" />
        </template>

        <form action="#" class="formContainer">
            <div class="formDiv">
                <label for="title">Title</label>
                <input-text-atom id="title" type="text" v-model="data.title" />
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
                <input-text-atom
                    id="category"
                    type="text"
                    v-model="data.category"
                />
            </div>
        </form>

        <template #footer>
            <div class="dialogButtonsContainer">
                <button-atom
                    label="Cancel"
                    severity="secondary"
                    @click="props.close('create')"
                    :rounded="true"
                />
                <button-atom
                    label="Create"
                    @click="storeArticle(data, getData, close)"
                    :rounded="true"
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
