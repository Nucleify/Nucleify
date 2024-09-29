<template>
    <section id="access">
        <div class="access-container" v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout', rootMargin: isMobile() ? '370px' : '' }">
            <heading-atom
                :tag="1"
                class="access-header"
                text="Access your data everywhere"
            />
            <heading-atom
                :tag="2"
                class="access-description"
                text="Use DataManager application on your phone, tablet and desktop. You
                can now manage all data in one place and take a step ahead in your
                management process"
            />
            <div class="access-card-container">
                <div class="access-card flip-card col-12 md:col-6 xl:col-4">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <image-atom
                                src="desktop.png"
                                alt=""
                                image-class="image"
                            />
                            <heading-atom
                                :tag="3"
                                class="access-card-header"
                                text="Desktop"
                            />
                        </div>
                        <div class="flip-card-back">
                            <paragraph-atom
                                class="mt-2"
                                text="Responsive web design was coined in 2010 by Ethan
                                Marcotte, optimizing layouts for desktops with
                                flexible grids and layouts."
                            />
                        </div>
                    </div>
                </div>
                <div class="access-card flip-card col-12 md:col-6 xl:col-4">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <image-atom
                                src="tablet.png"
                                alt=""
                                image-class="access-card-image"
                            />
                            <heading-atom
                                :tag="3"
                                class="access-card-header"
                                text="Tablet"
                            />
                        </div>
                        <div class="flip-card-back">
                            <paragraph-atom
                                text="Over 53% of internet users worldwide access the web
                                through mobile devices, highlighting the significant
                                shift towards mobile browsing in recent years."
                            />
                        </div>
                    </div>
                </div>
                <div class="access-card flip-card col-12 md:col-6 xl:col-4">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <image-atom
                                src="phone.png"
                                alt=""
                                image-class="access-card-image"
                            />
                            <heading-atom
                                :tag="3"
                                class="access-card-header"
                                text="Phone"
                            />
                        </div>
                        <div class="flip-card-back">
                            <paragraph-atom
                                class="flip-card-back-text"
                                text="Google's implementation of mobile-first indexing in
                                2018 underscored the importance of mobile-responsive design,
                                prioritizing mobile versions for indexing and ranking."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
</script>
