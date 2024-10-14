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
            <ad-header
                :tag="2"
                :text="getTitle(props.selectedObject)"
                v-if="props.action === 'show' && props.selectedObject"
            />
            <ad-header :tag="2" :text="props.title" v-else />
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
                    :panel-class="
                        isDropdownOrCalendar(field.type) ? props.entity : null
                    "
                    :date-format="field.type === 'calendar' ? 'yy-mm-dd' : null"
                    :toggle-mask="field.type === 'password' ? true : null"
                    :passwords-match="
                        field.name === 'password_confirmation' &&
                        isPasswordsMatch(formData)
                            ? true
                            : null
                    "
                    :empty-password="
                        field.name === 'password_confirmation' &&
                        isEmptyPassword(formData)
                            ? true
                            : null
                    "
                    :empty-confirm-password="
                        field.name === 'password_confirmation' &&
                        isEmptyConfirmPassword(formData)
                            ? true
                            : null
                    "
                    :mask="isPhoneField(field.name) ? '999-999-999' : null"
                    :placeholder="isPhoneField(field.name) ? '999-999-999' : ''"
                    :unmask="isPhoneField(field.name) ? true : null"
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
                <ad-header
                    :tag="5"
                    class="show-data-header"
                    :text="item.label"
                />
                <div>{{ (props.selectedObject as any)[item.key] }}</div>
            </div>
        </div>

        <template #footer>
            <div class="dialog-buttons-container">
                <ad-button
                    :label="props.cancelButtonLabel"
                    icon="pi pi-times"
                    severity="secondary"
                    @click="close(props.action)"
                    rounded
                    text
                />
                <ad-button
                    v-if="props.fields && props.confirm"
                    :type="props.entity"
                    :label="props.confirmButtonLabel"
                    icon="pi pi-check"
                    @click="confirm(formData, props.getData)"
                    rounded
                    text
                />
                <ad-button
                    v-if="
                        props.action === 'delete' &&
                        props.confirm &&
                        props.selectedObject
                    "
                    :type="props.entity"
                    :label="props.confirmButtonLabel"
                    icon="pi pi-check"
                    @click="confirm(props.selectedObject.id, props.getData)"
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
    getComponent,
    getTitle,
    isDropdownOrCalendar,
    isEmptyConfirmPassword,
    isEmptyPassword,
    isPasswordsMatch,
    isPhoneField,
} from 'atomic/bosons/utils'

const props = defineProps<DialogInterface>()

const formData = ref<{ [key: string]: string }>({ ...props.data })

watch(
    () => (props.action === 'edit' ? props.selectedObject : props.data),
    (newData) => {
        formData.value = { ...newData }
    }
)
</script>
