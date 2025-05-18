<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <nav class="navbar">
    <div class="container">
      <molecule-anchor class="application-header" href="/home">
        <atom-image
          :src="imgUrl + 'logo.svg'"
          alt="DataManager logo"
          fetchpriority="high"
        />

        <atom-heading :tag="1" text="DataManager" />
      </molecule-anchor>

      <navbar-links />
      <atom-button
        class="navbar-drawer-toggler"
        :icon="navbarExpanded ? 'hidden' : 'pi pi-align-justify'"
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
