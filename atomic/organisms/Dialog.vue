<template>
    <Dialog
        :header="props.header"
        :footer="props.footer"
        :visible="props.visible"
        :modal="props.modal || 'modal'"
        :content-style="props.contentStyle"
        :content-class="props.contentClass"
        :content-props="props.contentProps"
        :rtl="props.rtl || true"
        :closable="props.closable"
        :dismissable-mask="props.dismissableMask"
        :close-on-escape="props.closeOnEscape"
        :show-header="props.showHeader || true"
        :block-scroll="props.blockScroll"
        :base-z-index="props.baseZIndex"
        :auto-z-index="props.autoZIndex"
        :position="props.position"
        :maximizable="props.maximizable"
        :breakpoints="props.breakpoints"
        :draggable="props.draggable"
        :min-x="props.minX"
        :min-y="props.minY"
        :append-to="props.appendTo"
        :pt="props.pt"
        :pt-options="props.ptOptions"
        class="my-dialog"
        :class="props.action"
    >
        <template #header>
            <heading-atom
                :tag="2"
                :text="getTitle(props.selectedObject)"
                v-if="props.action === 'show' && props.selectedObject"
            />
            <heading-atom :tag="2" :text="props.title" v-else />
        </template>

        <form
            v-if="props.fields && props.action !== 'show'"
            class="form-container"
            action="#"
        >
            <div
                v-for="(field, index) in props.fields"
                :key="index"
                class="form-div"
            >
                <label :for="field.name">{{ field.label }}</label>
                <component
                    :is="getComponent(field.type)"
                    v-model="formData[field.name]"
                    v-bind="field.props"
                    :id="field.name"
                    :v-type="props.entity"
                    v-bind:panel-class="
                        field.type === 'dropdown' || 'calendar'
                            ? props.entity
                            : null
                    "
                    v-bind:date-format="
                        field.type === 'calendar' ? 'yy-mm-dd' : null
                    "
                    v-bind:toggle-mask="field.type === 'password' ? true : null"
                    v-bind:passwords-match="
                        field.name === 'password_confirmation'
                            ? checkPasswordsMatch(
                                  formData['password'],
                                  formData['password_confirmation']
                              )
                            : false
                    "
                    v-bind:empty-password="
                        field.name === 'password_confirmation'
                            ? checkIsEmpty(formData['password'])
                            : false
                    "
                    v-bind:empty-confirm-password="
                        field.name === 'password_confirmation'
                            ? checkIsEmpty(formData['password_confirmation'])
                            : false
                    "
                />
            </div>
        </form>

        <div
            v-else-if="
                props.fields && props.action === 'show' && props.selectedObject
            "
            class="show-data-container"
        >
            <div v-for="(item, key) in props.fields" :key="key">
                <heading-atom
                    :tag="5"
                    class="show-data-header"
                    :text="item.label"
                />
                <div>{{ (props.selectedObject as any)[item.key] }}</div>
            </div>
        </div>

        <template #footer>
            <div class="dialog-buttons-container">
                <button-atom
                    :label="props.cancelButtonLabel"
                    icon="pi pi-times"
                    severity="secondary"
                    @click="close(props.action)"
                    rounded
                    text
                />
                <button-atom
                    v-if="props.fields && props.confirm"
                    :type="props.entity"
                    :label="props.confirmButtonLabel"
                    icon="pi pi-check"
                    @click="confirm(formData, props.getData, props.close)"
                    rounded
                    text
                />
                <button-atom
                    v-if="
                        props.action === 'delete' &&
                        props.confirm &&
                        props.selectedObject
                    "
                    :type="props.entity"
                    :label="props.confirmButtonLabel"
                    icon="pi pi-check"
                    @click="
                        confirm(
                            props.selectedObject.id,
                            props.getData,
                            props.close
                        )
                    "
                    rounded
                    text
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { DialogInterface } from 'atomic/bosons/types'
import {
    checkIsEmpty,
    checkPasswordsMatch,
    getComponent,
    getTitle,
} from 'atomic/bosons/utils'

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
