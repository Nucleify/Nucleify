<template>
  <section id="start">
    <div class="container">
      <div class="container start-container">
        <ad-image
          :src="imgUrl + 'logo.svg'"
          alt="DataManager logo"
          class="start-image"
          fetchpriority="high"
        />

        <div class="left-side">
          <ad-heading :tag="1" class="header">
            One
            <span class="shiny-text first-text">place</span> <br />
            for all
            <span class="shiny-text">your data</span>
          </ad-heading>

          <ad-heading
            :tag="2"
            text="Manage various data types from a single place with this development template."
            class="start-description"
          />

          <div class="cta">
            <ad-button
              label="Try it out!"
              class="start-button caterpillar-button"
              @click="navigateTo('/register')"
            />
            <ad-button
              label="GitHub"
              :src="technologiesImgUrl + 'github.svg'"
              class="start-button caterpillar-button"
              @click="navigateTo('https://github.com/SzymCode/DataManager')"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { navigateTo } from 'atomic'
</script>
