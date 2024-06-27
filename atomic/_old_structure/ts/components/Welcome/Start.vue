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
                    @click="navigateTo('/login')"
                />
            </div>
            <div>
                <anchor-tag-atom
                    class="startItem usersItem"
                    v-tooltip.right="'Users'"
                    icon="pi pi-user usersIcon"
                />
                <anchor-tag-atom
                    class="startItem contactsItem"
                    v-tooltip.right="'Contacts'"
                    icon="pi pi-users contactsIcon"
                />
                <anchor-tag-atom
                    class="startItem tasksItem"
                    v-tooltip.right="'Tasks'"
                    icon="pi pi-check-square tasksIcon"
                />
                <anchor-tag-atom
                    class="startItem articlesItem"
                    v-tooltip.right="'Articles'"
                    icon="pi pi-comment articlesIcon"
                />
                <anchor-tag-atom
                    class="startItem moneyItem"
                    v-tooltip.right="'Revenues & Expenses'"
                    icon="pi pi-dollar moneyIcon"
                />
                <anchor-tag-atom
                    class="startItem activitiesItem"
                    v-tooltip.right="'Activities'"
                    icon="pi pi-clock activitiesIcon"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { navigateTo } from '@/utils'
</script>
