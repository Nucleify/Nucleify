<template>
    <Dialog :visible="visible" modal class="myDialog" :class="action">
        <template #header>
            <heading-atom
                :tag="2"
                :text="getTitle(selectedObject)"
                v-if="action === 'show' && selectedObject"
            />
            <heading-atom :tag="2" :text="title" v-else />
        </template>

        <form
            v-if="fields && action !== 'show'"
            class="formContainer"
            action="#"
        >
            <div v-for="(field, index) in fields" :key="index" class="formDiv">
                <label :for="field.name">{{ field.label }}</label>
                <component
                    :is="getComponent(field.type)"
                    v-model="formData[field.name]"
                    v-bind="field.props"
                    :id="field.name"
                />
            </div>
        </form>

        <div
            v-else-if="fields && action === 'show' && selectedObject"
            class="showDataContainer"
        >
            <div v-for="(item, key) in fields" :key="key">
                <heading-atom
                    :tag="5"
                    class="showDataHeader"
                    :text="item.label"
                />
                <div>{{ (selectedObject as any)[item.key] }}</div>
            </div>
        </div>

        <template #footer>
            <div class="dialogButtonsContainer">
                <button-atom
                    :label="cancelButtonLabel"
                    severity="secondary"
                    @click="close(action)"
                    :rounded="true"
                />
                <button-atom
                    v-if="fields && confirm"
                    :label="confirmButtonLabel"
                    @click="confirm(formData, getData, close)"
                    :rounded="true"
                    :style="style"
                />
                <button-atom
                    v-if="action === 'delete' && confirm && selectedObject"
                    :label="confirmButtonLabel"
                    @click="confirm(selectedObject.id, getData, close)"
                    :rounded="true"
                    :style="style"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { DialogInterface } from 'atomic/bosons/types'
import { getComponent, getTitle } from 'atomic/bosons/utils'

const props = defineProps<DialogInterface>()

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const formData = ref<{ [key: string]: any }>({ ...props.data })

watch(
    () => (props.action === 'edit' ? props.selectedObject : props.data),
    (newData) => {
        formData.value = { ...newData }
    }
)
</script>
