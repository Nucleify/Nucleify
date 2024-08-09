<template>
    <section id="start">
        <div class="container">
            <div class="container startContainer">
                <heading-atom
                    :tag="1"
                    text="One place for all your data"
                    class="startHeader"
                />
                <heading-atom
                    :tag="2"
                    text="Manage various data types from a single place and access them everywhere together with your team."
                    class="startDescription"
                />
                <button-atom
                    label="Try it out!"
                    class="startButton"
                    :rounded="true"
                    @click="navigateTo('/register')"
                />
            </div>
            <anchor-molecule
                v-for="(a, index) in anchorTags"
                :key="index"
                :href="a.href"
                :class="a.anchorClass"
                v-tooltip.right="a.tooltip"
            >
                <item-atom
                    :icon="a.icon"
                    :class="a.itemClass"
                    class="item plasmaItem"
                />
            </anchor-molecule>
        </div>
    </section>
</template>

<script setup lang="ts">
import { navigateTo } from '@/utils'

import { handleAnchorTags } from 'atomic/bosons/constants'

const { anchorTags } = handleAnchorTags()
</script>
