<template>
    <Dialog :visible="visible" modal header="Header" class="myDialog">
        <template #header>
            <h2 class="myDialogHeader">Create new user</h2>
        </template>

        <form action="#" class="formContainer">
            <div class="formDiv">
                <label for="name">Name</label>
                <input-text-atom id="name" type="text" v-model="data.name" />
            </div>

            <div class="formDiv">
                <label for="email">Email</label>
                <input-text-atom id="email" type="text" v-model="data.email" />
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
                <input-text-atom
                    id="password"
                    type="password"
                    v-model="data.password"
                />
            </div>

            <div class="formDiv">
                <label for="confirmPassword">Confirm Password</label>
                <input-text-atom
                    id="confirmPassword"
                    type="password"
                    v-model="data.confirm_password"
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
                    label="Confirm"
                    @click="storeUser(data, getData, close)"
                    :rounded="true"
                    :style="style"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { handleData } from '@/constants'
import { userApiMethods } from '@/utils'

import { ColorItemStyleInterface } from 'atomic/bosons/types'

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
