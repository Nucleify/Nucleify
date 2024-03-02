<template>
    <Dialog v-model:visible="visible" modal class="w-30rem">
        <template #header>
            <h2 class="m-0">Create new contact</h2>
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
            <div class="flex gap-2 justify-content-end">
                <Button
                    severity="secondary"
                    label="Cancel"
                    @click="props.close('create')"
                    class="smallHeightButton"
                />
                <Button
                    label="Create"
                    @click="storeContact"
                    class="smallHeightButton"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import axios from 'axios'

const props = defineProps<{
    getContacts: () => void
    visible: boolean
    options: string[]
    flashSuccessMessage: (message: string) => void
    flashDangerMessage: (message: string) => void
    flashValidationErrors: (errors: Record<string, string[]>) => void
    close: (action: string) => void
}>()

const data = ref({
    first_name: '',
    last_name: '',
    full_name: '',
    email: '',
    personal_phone: '',
    work_phone: '',
    address: '',
    birthday: '',
    contact_groups: '',
    role: '',
    password: '',
    confirm_password: '',
})

const { visible, options } = toRefs(props)
const success_message = ref<string | undefined>(undefined)

async function storeContact(): Promise<void> {
    const user_id = window.sessionStorage.getItem('user_id')

    await axios
        .post('/api/contacts', {
            user_id: user_id,
            first_name: data.value.first_name,
            last_name: data.value.last_name,
            email: data.value.email,
            personal_phone: data.value.personal_phone,
            work_phone: data.value.work_phone,
            address: data.value.address,
            birthday: data.value.birthday,
            contact_groups: data.value.contact_groups,
            role: data.value.role,
        })
        .then((response) => {
            props.close('create')
            props.getContacts()

            success_message.value =
                'Successfully created: ' + response.data.full_name
            props.flashSuccessMessage(success_message.value)
        })
        .catch((error) => {
            switch (error.response.status) {
                case 500:
                    props.flashDangerMessage(
                        error.response.data.error ||
                            'HTTP 500: Internal Server Error'
                    )
                    break
                case 403:
                case 401:
                    props.flashDangerMessage('Unauthorized access')
                    break
                default:
                    props.flashValidationErrors(error.response.data.errors)
            }
        })
}
</script>
