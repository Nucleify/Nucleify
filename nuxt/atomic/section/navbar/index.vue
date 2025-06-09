<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <nav class="navbar">
    <div class="container">
      <ad-anchor class="application-header" href="/home">
        <ad-image
          :src="imgUrl + 'logo.svg'"
          alt="DataManager logo"
          fetchpriority="high"
        />

        <ad-heading :tag="1" text="DataManager" />
      </ad-anchor>

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
import { NavbarLinks, NavbarDrawer } from './components'

import { useNavbar } from 'atomic'

const { navbarExpanded, toggleNavbar } = useNavbar()
</script>
