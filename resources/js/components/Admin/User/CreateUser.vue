<template>
    <Dialog :visible="visible" modal header="Header" class="w-30rem">
        <template #header>
            <h2 class="m-0">Create new user</h2>
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

            <div class="flex flex-column gap-1 mb-3">
                <label for="password">Password</label>
                <InputText
                    id="password"
                    type="password"
                    v-model="data.password"
                />
            </div>

            <div class="flex flex-column gap-1">
                <label for="confirmPassword">Confirm Password</label>
                <InputText
                    id="confirmPassword"
                    type="password"
                    v-model="data.confirm_password"
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
                    label="Confirm"
                    @click="storeUser(data, getData, close)"
                    class="smallHeightButton"
                    :style="style"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userApiMethods } from '../../../utils'
import { ColorItemStyleInterface, UserInterface } from '../../../interfaces'

const props = defineProps<{
    getData: () => void
    visible: boolean
    options: string[]
    close: (action: string) => void
    style: ColorItemStyleInterface
}>()

const data = ref<UserInterface>({
    name: '',
    email: '',
    role: '',
    password: '',
    confirm_password: '',
})

const { storeUser } = userApiMethods()
</script>
