<template>
    <section id="structure">
        <div class="structure-container">
            <div
                class="content"
                v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout', rootMargin: isMobile() ? '200px' : '' }"
            >
                <div class="animation-container">
                    <DeferredContent>
                        <animation />
                    </DeferredContent>
                </div>
                <div class="description-container">
                    <heading-atom
                        :tag="5"
                        class="title"
                    >
                        <div class="shinyText">
                            Atomic Design&nbsp;
                        </div>
                        <span>
                            Approach
                        </span>
                    </heading-atom>
                    <paragraph-atom
                        text="
                            Utilizing Atomic Design principles to develop dynamic, modular solutions that enhance
                            scalability and ensure seamless integration in your development processes.
                        "
                        class="description"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Animation from './Animation.vue'
</script>
