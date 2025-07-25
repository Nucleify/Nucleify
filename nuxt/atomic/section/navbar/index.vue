<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <nav class="navbar">
    <div class="container">
      <nuxt-link class="application-header" to="/home">
        <ad-image
          :src="imgUrl + 'logo.svg'"
          alt="DataManager logo"
          fetchpriority="high"
        />

        <ad-heading :tag="1" text="DataManager" />
      </nuxt-link>

      <navbar-links />
      <ad-button
        class="navbar-drawer-toggler"
        :icon="navbarExpanded ? 'hidden' : 'pi pi-align-justify'"
        aria-label="Menu"
        @click="toggleNavbar()"
      />
    </div>
    <navbar-drawer v-model:visible="navbarExpanded">
      <navbar-links />
    </navbar-drawer>
  </nav>
</template>

<script setup lang="ts">
import { useNavbar } from 'atomic'

import { NavbarDrawer, NavbarLinks } from './components'

const { navbarExpanded, toggleNavbar } = useNavbar()
</script>
