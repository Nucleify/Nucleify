<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <nav class="navbar">
    <div class="container">
      <nuxt-link class="application-header" to="/home">
        <ad-logo ad-type="main" />

        <ad-heading
          :tag="1"
          text="Nucleify"
          class="application-header-text"
        />
      </nuxt-link>

      <nuc-navbar-links />
      <ad-button
        class="navbar-drawer-toggler"
        :icon="navbarExpanded ? 'hidden' : 'prime:align-justify'"
        aria-label="Menu"
        @click="toggleNavbar()"
      />
    </div>
    <nuc-navbar-drawer v-model:visible="navbarExpanded">
      <nuc-navbar-links @close-drawer="navbarExpanded = false" />
    </nuc-navbar-drawer>
  </nav>
</template>

<script setup lang="ts">
import gsap from 'gsap'

import { bounceFadeIn, useNavbar } from 'atomic'

import { NucNavbarDrawer, NucNavbarLinks } from './components'

const { navbarExpanded, toggleNavbar } = useNavbar()

onMounted(() => {
  bounceFadeIn('.navbar .logo', { delay: 2.2, duration: 0.3 })
  gsap.fromTo(
    '.navbar .application-header-text',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.2, delay: 2.4 }
  )
  gsap.to('.navbar', {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out',
    delay: 2.2,
  })
})
</script>
