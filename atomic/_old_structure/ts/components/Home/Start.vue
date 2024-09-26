<template>
    <section id="start">
        <div class="container">
            <div class="container startContainer">
                <div class="leftSide">
                    <heading-atom :tag="1" class="startHeader">
                        One
                        <span class="shinyText firstText">place</span>
                    </heading-atom>

                    <heading-atom :tag="1" class="startHeader">
                        for all
                        <span class="shinyText">your data</span>
                    </heading-atom>

                    <heading-atom
                        :tag="2"
                        text="Manage various data types from a single place and access them everywhere with this development template."
                        class="startDescription"
                    />
                    <button-atom
                        label="Try it out!"
                        class="startButton"
                        :rounded="true"
                        @click="navigateTo('/register')"
                    />
                </div>
                <div class="rightSide">
                    <image-atom src="charts.svg" class="chartsImage" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { navigateTo } from '@/utils'
</script>
