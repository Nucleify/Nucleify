<template>
    <Dialog v-model:visible="visible" modal header="Header" class="w-30rem">
        <template #header>
            <h2 class="m-0">Edit: {{ user.data.name }}</h2>
        </template>

        <form action="#" class="text-sm">
            <div class="flex flex-column gap-1 mb-3">
                <label for="name">Name</label>
                <InputText id="name" type="text" v-model="data.name" />
            </div>

            <div class="flex flex-column gap-1 mb-3">
                <label for="email">Email</label>
                <InputText id="email" type="text" v-model="data.email" />
            </div>

            <div class="flex flex-column gap-1 mb-3">
                <label for="role">Role</label>
                <Dropdown
                    v-model="data.role"
                    :options="options"
                    placeholder="Select a role"
                    class="p-0"
                />
            </div>
        </form>

        <template #footer>
            <div class="flex gap-2 justify-content-end">
                <Button
                    severity="secondary"
                    label="Cancel"
                    @click="props.close('edit')"
                    class="smallHeightButton"
                />
                <Button
                    label="Confirm"
                    @click.prevent="editUser"
                    class="smallHeightButton"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import axios from 'axios'

import { useApiErrorsService, useToastService } from '../../../utils'

const { flashToast } = useToastService()
const { apiErrors } = useApiErrorsService()


const props = defineProps<{
    user: any
    getUsers: () => void
    visible: boolean
    options: string[]
    close: (action: string) => void
}>()

const data = ref({
    id: '',
    name: '',
    email: '',
    role: '',
})

const { visible, user, options } = toRefs(props)

/**
 * Check modal open with watch visible variable, then pass props to data
 */
watch(visible, () => {
    Object.assign(data.value, user.value.data)
})

async function editUser() {
    await axios
        .put('/api/users/' + data.value.id, {
            name: data.value.name,
            email: data.value.email,
            role: data.value.role,
        })
        .then((response) => {
            props.close('edit')
            props.getUsers()

            flashToast('Successfully edited: ' + response.data.name, 'success')
        })
        .catch((error) => {
            apiErrors(error)
        })
}
</script>
