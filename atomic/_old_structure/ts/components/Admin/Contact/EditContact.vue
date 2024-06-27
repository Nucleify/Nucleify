<template>
    <Dialog :visible="visible" modal class="myDialog">
        <template #header>
            <h2 class="myDialogHeader">Edit: {{ contact.full_name }}</h2>
        </template>

        <form action="#" class="formContainer">
            <div class="formDiv">
                <label for="first_name">First Name</label>
                <input-text-atom
                    id="first_name"
                    type="text"
                    v-model="data.first_name"
                />
            </div>

            <div class="formDiv">
                <label for="last_name">Last Name</label>
                <input-text-atom
                    id="last_name"
                    type="text"
                    v-model="data.last_name"
                />
            </div>

            <div class="formDiv">
                <label for="email">Email</label>
                <input-text-atom id="email" type="email" v-model="data.email" />
            </div>

            <div class="formDiv">
                <label for="personal_phone">Personal Phone</label>
                <input-text-atom
                    id="personal_phone"
                    type="tel"
                    v-model="data.personal_phone"
                />
            </div>

            <div class="formDiv">
                <label for="work_phone">Work Phone</label>
                <input-text-atom
                    id="work_phone"
                    type="tel"
                    v-model="data.work_phone"
                />
            </div>

            <div class="formDiv">
                <label for="address">Address</label>
                <input-text-atom
                    id="address"
                    type="text"
                    v-model="data.address"
                />
            </div>

            <div class="formDiv">
                <label for="birthday">Birthday</label>
                <input-text-atom
                    id="birthday"
                    type="date"
                    v-model="data.birthday"
                />
            </div>

            <div class="formDiv">
                <label for="contact_groups">Contact Groups</label>
                <input-text-atom
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
                <button-atom
                    label="Cancel"
                    severity="secondary"
                    @click="props.close('edit')"
                    :rounded="true"
                />
                <button-atom
                    label="Confirm"
                    @click.prevent="editContact(data, getData, close)"
                    :rounded="true"
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
