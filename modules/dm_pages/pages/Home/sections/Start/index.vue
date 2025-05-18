<template>
  <section id="start">
    <div class="container">
      <div class="container start-container">
        <atom-image
          :src="imgUrl + 'logo.svg'"
          alt="DataManager logo"
          class="start-image"
          fetchpriority="high"
        />

        <div class="left-side">
          <atom-heading :tag="1" class="header">
            One
            <span class="shiny first-text">place</span> <br />
            for all
            <span class="shiny">your data</span>
          </atom-heading>

          <atom-heading
            :tag="2"
            text="Manage various data types from a single place with this development template."
            class="start-description"
          />

          <div class="cta">
            <atom-button
              label="Try it out!"
              class="start-button caterpillar"
              @click="navigateTo('/register')"
            />
            <atom-button
              label="GitHub"
              :src="technologiesImgUrl + 'github.svg'"
              class="start-button caterpillar"
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
