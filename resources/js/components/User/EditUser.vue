<template>
    <Dialog v-model:visible="visible" modal header="Header" class="w-30rem">
        <template #header>
            <h2 class="m-0">Edit user: {{ user.data.name }}</h2>
        </template>

        <InlineMessage v-if="errors.length > 0" severity="warn">
            <div class="text-sm" v-for="error in errors" :key="error">
                {{ error }}
            </div>
        </InlineMessage>

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
                    @click="toggleVisibilityEdit"
                />
                <Button label="Confirm" @click.prevent="editUser" autofocus />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { Ref, ref, toRefs, watch } from 'vue'
import axios from 'axios'

const props = defineProps<{
    visible: boolean
    toggle: (selectedUser: Ref<any>) => void
    user: any
    options: any
}>()

const { user, visible, options } = toRefs(props)

const data = ref({
    id: '',
    name: '',
    email: '',
    role: '',
})
const errors = ref<string[]>([])

function toggleVisibilityEdit() {
    props.toggle(user.value)
}

function editUser() {
    errors.value = []
    axios
        .put('/api/users/' + data.value.id, {
            name: data.value.name,
            email: data.value.email,
            role: data.value.role,
        })
        .then((response) => {
            toggleVisibilityEdit()
            console.log(response)
        })
        .catch((error) => {
            flashErrors(error.response.data.errors)
        })
}

function flashErrors(errorsData: Record<string, string[]>) {
    for (const value in errorsData) {
        if (Object.prototype.hasOwnProperty.call(errorsData, value)) {
            errors.value.push(...errorsData[value])
        }
    }
    setTimeout(() => {
        errors.value = []
    }, 5000)
}

watch(visible, () => {
    Object.assign(data.value, user.value.data)
})
</script>
