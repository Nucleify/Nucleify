<template>
    <div class="accessContainer">
        <heading-atom
            :tag="1"
            class="accessHeader"
            text="Access your data everywhere"
        />
        <heading-atom
            :tag="2"
            class="accessDescription"
            text="Use DataManager application on your phone, tablet and desktop. You
            can now manage all data in one place and take a step ahead in your
            management process"
        />
        <div class="accessCardContainer">
            <div class="accessCard flip-card col-12 md:col-6 xl:col-4">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <image-atom
                            src="https://github.com/SzymCode/SzymCode/assets/107359025/d23d0500-c04b-439c-a2a6-2f2889bfd212"
                            alt=""
                            image-class="accessCardImage"
                        />
                        <heading-atom
                            :tag="3"
                            class="accessCardHeader"
                            text="Desktop"
                        />
                    </div>
                    <div class="flip-card-back">
                        <p class="mt-2">
                            Responsive web design was coined in 2010 by Ethan
                            Marcotte, optimizing layouts for desktops with
                            flexible grids and layouts.
                        </p>
                    </div>
                </div>
            </div>
            <div class="accessCard flip-card col-12 md:col-6 xl:col-4">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <image-atom
                            src="https://github.com/SzymCode/SzymCode/assets/107359025/4b7371a4-2203-4315-8e91-f21ccbf3a2a7"
                            alt=""
                            image-class="accessCardImage"
                        />
                        <heading-atom
                            :tag="3"
                            class="accessCardHeader"
                            text="Tablet"
                        />
                    </div>
                    <div class="flip-card-back">
                        <p>
                            Over 53% of internet users worldwide access the web
                            through mobile devices, highlighting the significant
                            shift towards mobile browsing in recent years.
                        </p>
                    </div>
                </div>
            </div>
            <div class="accessCard flip-card col-12 md:col-6 xl:col-4">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <image-atom
                            src="https://github.com/SzymCode/SzymCode/assets/107359025/9384548f-773a-4d4d-b92d-3bd6b32b0f56"
                            alt=""
                            image-class="accessCardImage"
                        />
                        <heading-atom
                            :tag="3"
                            class="accessCardHeader"
                            text="Phone"
                        />
                    </div>
                    <div class="flip-card-back">
                        <p class="flip-card-back-text">
                            Google's implementation of mobile-first indexing in
                            2018 underscored the importance of mobile-responsive
                            design, prioritizing mobile versions for indexing
                            and ranking.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
