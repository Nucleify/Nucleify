<template>
    <Dialog :visible="visible" modal class="myDialog">
        <template #header>
            <heading-atom :tag="2" text="Create new contact" />
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
                    @click="props.close('create')"
                    :rounded="true"
                />
                <button-atom
                    label="Create"
                    @click="storeContact(data, getData, close)"
                    :rounded="true"
                    :style="style"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { handleData } from '@/constants'
import { contactApiMethods } from '@/utils'

import { ColorItemStyleInterface } from 'atomic/bosons/types'

const props = defineProps<{
    getData: () => void
    visible: boolean
    options: string[]
    close: (action: string) => void
    style: ColorItemStyleInterface
}>()

const { contactData: data } = handleData()

const { storeContact } = contactApiMethods()
</script>
