<template>
    <section id="why-us">
        <div class="whyUsContainer px-4 py-8 md:px-6 lg:px-8 text-center flex justify-content-center align-items-center">
            <div class="mb-3 font-bold text-3xl -mt-5 absolute whyUsHeader">
                <span class="text-900">Why </span>
                <span class="text-green-600">Us?</span>
            </div>

            <div v-for="(group, index) in whyUsData" :key="index" :class="`whyUs${index} flex justify-content-between absolute`">
                <item-molecule v-for="(item, i) in group.items" :key="i" :icon="item.icon" class="whyUsItem" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { whyUsData } from '@/constants'
</script>
