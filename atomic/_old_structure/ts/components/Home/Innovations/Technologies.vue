<template>
    <section id="technologies">
        <div class="swiper-container">
            <swiper
                :spaceBetween="30"
                :autoplay="{
                  delay: 2500,
                  disableOnInteraction: false,
                }"
                :modules="modules"
                class="mySwiper"
                :slides-per-view="9"
                :loop="true"
                v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout', rootMargin: isMobile() ? '200px' : '' }"
            >
                <swiper-slide v-for="(image, index) in images" :key="index">
                    <image-atom :src="`/technologies/${image}`" width="40" height="40" />
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const modules = [Autoplay, Pagination, Navigation];

const images = [
    'php.svg',
    'laravel.svg',
    'typescript.svg',
    'vue.svg',
    'primevue.png',
    'html5.png',
    'scss.svg',
    'docker.svg',
    'heroku.svg',
    'vite.svg',
    'mysql.svg',
    'pest.png',
    'storybook.png',
    'cypress.png',
    'sonarcloud.svg',
    'eslint.svg',
    'husky.svg',
    'prettier.svg'
]
</script>

