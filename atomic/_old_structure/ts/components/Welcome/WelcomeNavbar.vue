<!--suppress HtmlUnknownAnchorTarget -->
<template>
    <nav class="welcomeNavbar navbar navbar-expand-md">
        <div class="container">
            <anchor-tag-atom href="/welcome">
                <image-atom src="logo.png" width="70" />
            </anchor-tag-atom>

            <button-atom
                class="navbar-toggler"
                :icon-class="
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
                    <div class="navbar-nav flex md:gap-3 lg:gap-5">
                        <anchor-tag-atom
                            class="nav-link welcomeNavLink"
                            href="#start"
                            @click="throttleHideNavbar"
                            icon="pi pi-bolt welcomeNavLinkIcon"
                            label="Start"
                        />
                        <anchor-tag-atom
                            class="nav-link welcomeNavLink"
                            href="#features"
                            @click="throttleHideNavbar"
                            icon="pi pi-star welcomeNavLinkIcon"
                            label="Features"
                        />
                        <anchor-tag-atom
                            class="nav-link welcomeNavLink"
                            href="#why-us"
                            @click="throttleHideNavbar"
                            icon="pi pi-question welcomeNavLinkIcon"
                            label="Why Us"
                        />
                        <anchor-tag-atom
                            class="nav-link welcomeNavLink"
                            href="#contact"
                            @click="throttleHideNavbar"
                            icon="pi pi-envelope welcomeNavLinkIcon"
                            label="Contact"
                        />
                    </div>

                    <button-atom
                        label="Log In"
                        class="primaryButton max-w-6 ml-auto my-5 md:my-0"
                        @click="navigateTo('/login')"
                        :rounded="true"
                    />
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { navigateTo, useNavbar } from '@/utils'

const { navbarExpanded, toggleNavbar, throttleHideNavbar } = useNavbar()
</script>
