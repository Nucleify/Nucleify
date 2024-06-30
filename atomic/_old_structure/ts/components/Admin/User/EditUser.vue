<template>
    <Dialog :visible="visible" modal header="Header" class="myDialog">
        <template #header>
            <heading-atom :tag="3" :text="'Edit: ' + user!.name" />
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
                    @click.prevent="editUser(data, getData, close)"
                    :rounded="true"
                    :style="style"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue'

import { UserInterface } from '@/types'
import { handleData } from '@/constants'
import { userApiMethods } from '@/utils'

import { ColorItemStyleInterface } from 'atomic/bosons/types'

const props = defineProps<{
    user: UserInterface | undefined
    getData: () => void
    visible: boolean
    options: string[]
    close: (action: string) => void
    style: ColorItemStyleInterface
}>()

const { visible, user } = toRefs(props)

const { userData: data } = handleData()

const { editUser } = userApiMethods()

/**
 * Check modal open with watch visible variable, then pass props to data
 */
watch(visible, () => {
    Object.assign(data.value, user.value)
})
</script>
