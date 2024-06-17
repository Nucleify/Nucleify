<template>
    <Dialog :visible="visible" modal header="Header" class="myDialog">
        <template #header>
            <h2 class="myDialogHeader">Create new user</h2>
        </template>

        <form action="#" class="formContainer">
            <div class="formDiv">
                <label for="name">Name</label>
                <InputText id="name" type="text" v-model="data.name" />
            </div>

            <div class="formDiv">
                <label for="email">Email</label>
                <InputText id="email" type="text" v-model="data.email" />
            </div>

            <div class="formDiv">
                <label for="role">Role</label>
                <Dropdown
                    v-model="data.role"
                    :options="options"
                    placeholder="Select a role"
                    class="p-0"
                />
            </div>

            <div class="formDiv">
                <label for="password">Password</label>
                <InputText
                    id="password"
                    type="password"
                    v-model="data.password"
                />
            </div>

            <div class="formDiv">
                <label for="confirmPassword">Confirm Password</label>
                <InputText
                    id="confirmPassword"
                    type="password"
                    v-model="data.confirm_password"
                />
            </div>
        </form>

        <template #footer>
            <div class="dialogButtonsContainer">
                <Button
                    severity="secondary"
                    label="Cancel"
                    @click="props.close('create')"
                    class="p-button-rounded"
                />
                <Button
                    label="Confirm"
                    @click="storeUser(data, getData, close)"
                    class="p-button-rounded"
                    :style="style"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ColorItemStyleInterface } from '@/types'
import { handleData } from '@/constants'
import { userApiMethods } from '@/utils'

const props = defineProps<{
    getData: () => void
    visible: boolean
    options: string[]
    close: (action: string) => void
    style: ColorItemStyleInterface
}>()

const { userData: data } = handleData()

const { storeUser } = userApiMethods()
</script>
