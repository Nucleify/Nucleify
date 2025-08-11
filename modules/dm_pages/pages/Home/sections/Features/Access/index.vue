<template>
  <section id="access">
    <div class="access-container">
      <ad-heading
        :tag="2"
        class="access-header split"
        text="Access your data everywhere"
      />
      <div class="access-card-container">
        <div
          class="access-card flip-card col-12 md:col-6 xl:col-4"
          @mouseenter="animate('.access-card:nth-of-type(1) .flip-card-back p')"
          @mouseleave="
            deconstruct('.access-card:nth-of-type(1) .flip-card-back p', 200)
          "
        >
          <div class="flip-card-inner">
            <dm-animation-hexagons />
            <div class="flip-card-front">
              <ad-image
                :src="imgUrl + 'desktop.webp'"
                width="122px"
                height="92px"
                alt="Desktop image"
                image-class="access-card-image"
              />
              <ad-heading :tag="3" class="access-card-header" text="Desktop" />
            </div>
            <div class="flip-card-back">
              <ad-paragraph
                class="mt-2"
                text="Responsive web design was coined in 2010 by Ethan
                                Marcotte, optimizing layouts for desktops with
                                flexible grids and layouts."
              />
            </div>
          </div>
        </div>
        <div
          class="access-card flip-card col-12 md:col-6 xl:col-4"
          @mouseenter="animate('.access-card:nth-of-type(2) .flip-card-back p')"
          @mouseleave="
            deconstruct('.access-card:nth-of-type(2) .flip-card-back p', 200)
          "
        >
          <div class="flip-card-inner">
            <dm-animation-hexagons />
            <div class="flip-card-front">
              <ad-image
                :src="imgUrl + 'tablet.webp'"
                width="75px"
                height="100px"
                alt="Tablet image"
                image-class="access-card-image"
              />
              <ad-heading :tag="3" class="access-card-header" text="Tablet" />
            </div>
            <div class="flip-card-back">
              <ad-paragraph
                text="Over 53% of internet users worldwide access the web
                                through mobile devices, highlighting the significant
                                shift towards mobile browsing in recent years."
              />
            </div>
          </div>
        </div>
        <div
          class="access-card flip-card col-12 md:col-6 xl:col-4"
          @mouseenter="animate('.access-card:nth-of-type(3) .flip-card-back p')"
          @mouseleave="
            deconstruct('.access-card:nth-of-type(3) .flip-card-back p', 200)
          "
        >
          <div class="flip-card-inner">
            <dm-animation-hexagons />
            <div class="flip-card-front">
              <ad-image
                :src="imgUrl + 'phone.webp'"
                width="54px"
                height="100px"
                alt="Phone image"
                image-class="access-card-image"
              />
              <ad-heading :tag="3" class="access-card-header" text="Phone" />
            </div>
            <div class="flip-card-back">
              <ad-paragraph
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
import { bounceFadeIn, useScrollTrigger, useSplitText } from 'atomic'

const { animate, deconstruct } = useSplitText()

useScrollTrigger(
  '.access-card-container',
  () => {
    bounceFadeIn('.access-card-container .access-card', {
      delay: 0,
      duration: 0.3,
      stagger: 0.3,
      ease: 'power2.out',
    })
  },
  {
    start: 'top 80%',
  }
)
</script>
