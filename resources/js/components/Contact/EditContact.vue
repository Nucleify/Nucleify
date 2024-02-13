<template>
    <Dialog v-model:visible="visible" modal class="w-30rem">
        <template #header>
            <h2 class="m-0">
                Edit: {{ contact.data.first_name }}
                {{ contact.data.last_name }}
            </h2>
        </template>

        <!-- Display success messages-->
        <InlineMessage v-if="success_message !== null" severity="success">
            <div class="text-sm">
                {{ success_message }}
            </div>
        </InlineMessage>

        <!-- Display danger messages -->
        <InlineMessage v-if="danger_message !== null" severity="error">
            <div class="text-sm">
                {{ danger_message }}
            </div>
        </InlineMessage>

        <!-- Display errors -->
        <InlineMessage v-if="errors.length > 0" severity="warn">
            <div class="text-sm" v-for="error in errors" :key="error">
                {{ error }}
            </div>
        </InlineMessage>

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
                />
                <Button
                    label="Confirm"
                    @click.prevent="editContact"
                    autofocus
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { Ref, ref, toRefs, watch } from 'vue'
import axios from 'axios'

const props = defineProps<{
    visible: boolean
    contact: any
    options: any
    errors: Ref<string[]>
    flashValidationErrors: (errors: Record<string, string[]>) => void
    hideErrors: () => void
    close: (action: string) => void
}>()

const data = ref({
    id: '',
    first_name: '',
    last_name: '',
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

const { visible, contact, options, errors } = toRefs(props)
const success_message = ref<string | null>(null)
const danger_message = ref<string | null>(null)

/**
 * Check modal open with watch visible variable, then pass props to data
 */
watch(visible, () => {
    Object.assign(data.value, contact.value.data)
})

function editContact() {
    props.hideErrors()
    axios
        .put('/api/contacts/' + data.value.id, {
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
            success_message.value =
                'Successfully edited contact: ' + response.data.first_name + '.'
            setTimeout(() => {
                success_message.value = null
                props.close('edit')
            }, 1500)
        })
        .catch((error) => {
            if (error.response.status === 500) {
                errors.value = ['HTTP 500: Internal Server Error']
            } else if (error.response.status === 403 || (401 && !422)) {
                danger_message.value = 'Unauthorized access.'
                setTimeout(() => {
                    danger_message.value = null
                }, 5000)
            } else {
                props.flashValidationErrors(error.response.data.errors)
            }
        })
}
</script>
