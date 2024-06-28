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
            <anchor-tag-molecule
                v-for="(a, index) in anchorTags"
                :key="index"
                :href="a.href"
                :class="a.anchorClass"
                v-tooltip.right="a.tooltip"
                :icon="a.icon"
                :style="a.style"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import { navigateTo } from '@/utils'

import { handleStartAnchorTags } from 'atomic/bosons/constants'

const { anchorTags } = handleStartAnchorTags()
</script>
