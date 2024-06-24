<template>
    <Dialog :visible="visible" modal class="myDialog">
        <template #header>
            <h2 class="myDialogHeader">Edit: {{ contact.full_name }}</h2>
        </template>

        <form action="#" class="formContainer">
            <div class="formDiv">
                <label for="first_name">First Name</label>
                <InputText
                    id="first_name"
                    type="text"
                    v-model="data.first_name"
                />
            </div>

            <div class="formDiv">
                <label for="last_name">Last Name</label>
                <InputText
                    id="last_name"
                    type="text"
                    v-model="data.last_name"
                />
            </div>

            <div class="formDiv">
                <label for="email">Email</label>
                <InputText id="email" type="email" v-model="data.email" />
            </div>

            <div class="formDiv">
                <label for="personal_phone">Personal Phone</label>
                <InputText
                    id="personal_phone"
                    type="tel"
                    v-model="data.personal_phone"
                />
            </div>

            <div class="formDiv">
                <label for="work_phone">Work Phone</label>
                <InputText
                    id="work_phone"
                    type="tel"
                    v-model="data.work_phone"
                />
            </div>

            <div class="formDiv">
                <label for="address">Address</label>
                <InputText id="address" type="text" v-model="data.address" />
            </div>

            <div class="formDiv">
                <label for="birthday">Birthday</label>
                <InputText id="birthday" type="date" v-model="data.birthday" />
            </div>

            <div class="formDiv">
                <label for="contact_groups">Contact Groups</label>
                <InputText
                    id="contact_groups"
                    type="text"
                    v-model="data.contact_groups"
                />
            </div>

            <div class="formDiv">
                <label for="role">Role</label>
                <Dropdown
                    id="role"
                    v-model="data.role"
                    :options="options"
                    placeholder="Select a role"
                />
            </div>
        </form>

        <template #footer>
            <div class="dialogButtonsContainer">
                <Button
                    severity="secondary"
                    label="Cancel"
                    @click="props.close('edit')"
                    class="p-button-rounded"
                />
                <Button
                    label="Confirm"
                    @click.prevent="editContact(data, getData, close)"
                    class="p-button-rounded"
                    :style="style"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue'

import { ContactInterface } from '@/types'
import { handleData } from '@/constants'
import { contactApiMethods } from '@/utils'

import { ColorItemStyleInterface } from 'atomic/bosons/types'

const props = defineProps<{
    contact: ContactInterface | undefined
    getData: () => void
    visible: boolean
    options: string[]
    close: (action: string) => void
    style: ColorItemStyleInterface
}>()

const { visible, contact } = toRefs(props)

const { contactData: data } = handleData()

const { editContact } = contactApiMethods()

/**
 * Check modal open with watch visible variable, then pass props to data
 */
watch(visible, () => {
    Object.assign(data.value, contact.value)
})
</script>
