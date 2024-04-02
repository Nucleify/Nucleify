<template>
    <Dialog :visible="visible" modal header="Header" class="w-30rem">
        <template #header>
            <h2 class="m-0">Edit: {{ user.name }}</h2>
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
                    @click.prevent="editUser(data, getData, close)"
                    class="smallHeightButton"
                    :style="style"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue'

import { ColorItemStyleInterface, UserInterface } from '@/types'
import { handleData } from '@/constants'
import { userApiMethods } from '@/utils'

const props = defineProps<{
    user: UserInterface
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
