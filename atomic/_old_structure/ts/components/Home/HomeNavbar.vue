<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <nav
    class="home-navbar navbar navbar-expand-md"
    :class="navbarExpanded ? 'expanded' : 'not-expanded'"
  >
    <div class="container">
      <ad-anchor href="/home">
        <ad-image src="logo.svg" width="60" />
      </ad-anchor>

      <ad-button
        class="navbar-toggler"
        :icon="
          navbarExpanded
            ? 'pi pi-times text-2xl'
            : 'pi pi-align-justify text-2xl'
        "
        type="button"
        @click="toggleNavbar"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Right Side Of Navbar -->
        <div class="navbar-nav ms-auto md:gap-5 lg:gap-7">
          <div class="navbar-nav flex md:gap-3 lg:gap-6">
            <ad-anchor
              class="nav-link home-nav-link -mt-1 md:mt-0"
              href="/home"
              label="Home"
            />
            <ad-anchor
              class="nav-link home-nav-link"
              href="/services"
              label="Services"
            />
            <ad-anchor
              class="nav-link home-nav-link"
              href="/about"
              label="About"
            />
            <ad-anchor
              class="nav-link home-nav-link"
              href="/blog"
              label="Blog"
            />
          </div>

          <ad-button
            label="Log In"
            class="primary-button login-button max-w-6 ml-auto my-4 md:my-0 text-sm px-3"
            @click="navigateTo('/login')"
            :rounded="true"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { navigateTo, useNavbar } from 'atomic/bosons/utils'

const { navbarExpanded, toggleNavbar } = useNavbar()
</script>
