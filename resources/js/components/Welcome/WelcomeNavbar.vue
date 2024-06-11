<!--suppress HtmlUnknownAnchorTarget -->
<template>
    <nav class="welcomeNavbar navbar navbar-expand-md">
        <div class="container">
            <a href="/welcome">
                <Image src="logo.png" width="70" />
            </a>

            <button
                class="navbar-toggler"
                type="button"
                @click="toggleNavbar"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <i
                    :class="
                        navbarExpanded
                            ? 'pi pi-times text-2xl'
                            : 'pi pi-align-justify text-2xl'
                    "
                ></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Right Side Of Navbar -->
                <div class="navbar-nav ms-auto md:gap-5 lg:gap-7">
                    <div class="navbar-nav flex md:gap-3 lg:gap-5">
                        <a
                            class="nav-link welcomeNavLink"
                            href="#start"
                            @click="throttleHideNavbar"
                        >
                            Start
                            <i class="pi pi-bolt welcomeNavLinkIcon"></i>
                        </a>
                        <a
                            class="nav-link welcomeNavLink"
                            href="#features"
                            @click="throttleHideNavbar"
                        >
                            Features
                            <i class="pi pi-star welcomeNavLinkIcon"></i>
                        </a>
                        <a
                            class="nav-link welcomeNavLink"
                            href="#why-us"
                            @click="throttleHideNavbar"
                        >
                            Why Us
                            <i class="pi pi-question welcomeNavLinkIcon"></i>
                        </a>
                        <a
                            class="nav-link welcomeNavLink"
                            href="#contact"
                            @click="throttleHideNavbar"
                        >
                            Contact
                            <i class="pi pi-envelope welcomeNavLinkIcon"></i>
                        </a>
                    </div>

                    <Button
                        class="primaryButton max-w-6 ml-auto my-5 md:my-0"
                        @click="navigateTo('/login')"
                    >
                        Log In
                    </Button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { navigateTo, useNavbar } from '@/utils'

const { navbarExpanded, toggleNavbar, throttleHideNavbar } = useNavbar()
</script>
