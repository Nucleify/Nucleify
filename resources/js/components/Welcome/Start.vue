<template>
    <section id="start">
        <div class="container">
            <div class="container startContainer">
                <h1 class="startHeader">One place for all your data</h1>
                <h2 class="startDescription">
                    Manage various data types from a single place and access
                    them everywhere together with your team.
                </h2>
                <Button class="startButton" @click="navigateTo('/login')">
                    Try it out!
                </Button>
            </div>
            <div>
                <a class="startItem usersItem" v-tooltip.right="'Users'">
                    <i class="pi pi-user usersIcon"></i>
                </a>
                <a class="startItem contactsItem" v-tooltip.right="'Contacts'">
                    <i class="pi pi-users contactsIcon"></i>
                </a>
                <a class="startItem tasksItem" v-tooltip.right="'Tasks'">
                    <i class="pi pi-check-square tasksIcon"></i>
                </a>
                <a class="startItem postsItem" v-tooltip.right="'Posts'">
                    <i class="pi pi-comment postsIcon"></i>
                </a>
                <a
                    class="startItem moneyItem"
                    v-tooltip.right="'Revenues & Expenses'"
                >
                    <i class="pi pi-dollar moneyIcon"></i>
                </a>
                <a
                    class="startItem activitiesItem"
                    v-tooltip.right="'Activities'"
                >
                    <i class="pi pi-clock activitiesIcon"></i>
                </a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { navigateTo } from '../../utils'
</script>
