<template>
    <Dialog :visible="visible" modal class="w-30rem">
        <template #header>
            <h2 class="m-0">Edit: {{ contact.full_name }}</h2>
        </template>

        <form action="#" class="text-sm">
            <div class="flex flex-column gap-1 mb-3">
                <label for="first_name">First Name</label>
                <InputText
                    id="first_name"
                    type="text"
                    v-model="data.first_name"
                />
            </div>

            <div class="flex flex-column gap-1 mb-3">
                <label for="last_name">Last Name</label>
                <InputText
                    id="last_name"
                    type="text"
                    v-model="data.last_name"
                />
            </div>

            <div class="flex flex-column gap-1 mb-3">
                <label for="email">Email</label>
                <InputText id="email" type="email" v-model="data.email" />
            </div>

            <div class="flex flex-column gap-1 mb-3">
                <label for="personal_phone">Personal Phone</label>
                <InputText
                    id="personal_phone"
                    type="tel"
                    v-model="data.personal_phone"
                />
            </div>

            <div class="flex flex-column gap-1 mb-3">
                <label for="work_phone">Work Phone</label>
                <InputText
                    id="work_phone"
                    type="tel"
                    v-model="data.work_phone"
                />
            </div>

            <div class="flex flex-column gap-1 mb-3">
                <label for="address">Address</label>
                <InputText id="address" type="text" v-model="data.address" />
            </div>

            <div class="flex flex-column gap-1 mb-3">
                <label for="birthday">Birthday</label>
                <InputText id="birthday" type="date" v-model="data.birthday" />
            </div>

            <div class="flex flex-column gap-1 mb-3">
                <label for="contact_groups">Contact Groups</label>
                <InputText
                    id="contact_groups"
                    type="text"
                    v-model="data.contact_groups"
                />
            </div>

            <div class="flex flex-column gap-1 mb-3">
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
            <div class="flex gap-2 justify-content-end mt-1">
                <Button
                    severity="secondary"
                    label="Cancel"
                    @click="props.close('edit')"
                    class="smallHeightButton"
                />
                <Button
                    label="Confirm"
                    @click.prevent="editContact(data, getData, close)"
                    class="smallHeightButton"
                    :style="style"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { contactApiMethods } from '../../../utils'
import { ColorItemStyleInterface, ContactInterface } from '../../../interfaces'

const props = defineProps<{
    contact: ContactInterface
    getData: () => void
    visible: boolean
    options: string[]
    close: (action: string) => void
    style: ColorItemStyleInterface
}>()

const data = ref<ContactInterface>({
    first_name: '',
    last_name: '',
    email: '',
    personal_phone: '',
    work_phone: '',
    address: '',
    birthday: '',
    contact_groups: '',
    role: '',
})

const { visible, contact } = toRefs(props)
const { editContact } = contactApiMethods()

/**
 * Check modal open with watch visible variable, then pass props to data
 */
watch(visible, () => {
    Object.assign(data.value, contact.value)
})
</script>
