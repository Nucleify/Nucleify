<template>
    <Card class="myCard lg:ml-2 p-3 xl:px-4 md:col-6 xl:col-4 md:max-w-30rem">
        <template #header>
            <div class="flex justify-content-between">
                <h2>Display Graphs</h2>

                <Button
                    class="myButton activityMyButton"
                    icon="pi pi-refresh"
                    @click="setDefaultGraphsDisplay(true)"
                    :style="mainStyle"
                />
            </div>
            <hr />
        </template>
        <template #content>
            <ul
                class="px-3 flex flex-column gap-3"
                v-for="item in displayGraphList"
                :key="item"
            >
                <li class="flex justify-content-between">
                    <h3>{{ item }}</h3>
                    <Button
                        class="myButton activityMyButton"
                        :icon="display[item] ? 'pi pi-eye' : 'pi pi-eye-slash'"
                        :style="mainStyle"
                        @click="displayGraphsToggle(item)"
                    />
                </li>
            </ul>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { displayGraphList, handleStyles } from '@/constants'
import { useDisplayGraphs } from '@/utils'

const { mainStyle } = handleStyles()
const { display, setDefaultGraphsDisplay, displayGraphsToggle } = useDisplayGraphs()
</script>

<style scoped>
:deep(.p-card-body) {
    padding: 0;
}
</style>
