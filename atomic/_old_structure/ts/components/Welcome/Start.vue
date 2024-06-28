<template>
    <section id="start">
        <div class="container">
            <div class="container startContainer">
                <h1 class="startHeader">One place for all your data</h1>
                <h2 class="startDescription">
                    Manage various data types from a single place and access
                    them everywhere together with your team.
                </h2>
                <button-atom
                    label="Try it out!"
                    class="startButton"
                    :rounded="true"
                    @click="navigateTo('/register')"
                />
            </div>
            <div>
                <anchor-tag-molecule
                    href="/admin"
                    class="startItem usersItem"
                    v-tooltip.right="'Users'"
                    icon="pi pi-user usersIcon"
                    :style="userItemStyle"
                />
                <anchor-tag-molecule
                    href="/contacts"
                    class="startItem contactsItem"
                    v-tooltip.right="'Contacts'"
                    icon="pi pi-users contactsIcon"
                    :style="contactItemStyle"
                />
                <anchor-tag-molecule
                    class="startItem tasksItem"
                    v-tooltip.right="'Tasks'"
                    icon="pi pi-check-square tasksIcon"
                    :style="{ opacity: 0.4 }"
                />
                <anchor-tag-molecule
                    href="/articles"
                    class="startItem articlesItem"
                    v-tooltip.right="'Articles'"
                    icon="pi pi-comment articlesIcon"
                    :style="articleItemStyle"
                />
                <anchor-tag-molecule
                    class="startItem moneyItem"
                    v-tooltip.right="'Revenues & Expenses'"
                    icon="pi pi-dollar moneyIcon"
                    :style="{ opacity: 0.4 }"
                />
                <anchor-tag-molecule
                    href="/activities"
                    class="startItem activitiesItem"
                    v-tooltip.right="'Activities'"
                    icon="pi pi-clock activitiesIcon"
                    :style="activityItemStyle"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { navigateTo } from '@/utils'

import { HandleStylesInterface } from 'atomic/bosons/types'
import { handleStyles } from 'atomic/bosons/constants'

const {
    activityItemStyle,
    articleItemStyle,
    contactItemStyle,
    userItemStyle
}: HandleStylesInterface = handleStyles()
</script>
