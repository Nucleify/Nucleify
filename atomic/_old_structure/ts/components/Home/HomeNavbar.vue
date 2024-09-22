<!--suppress HtmlUnknownAnchorTarget -->
<template>
    <nav
        class="homeNavbar navbar navbar-expand-md"
        :class="navbarExpanded ? 'expanded' : 'not-expanded'"
    >
        <div class="container">
            <anchor-molecule href="/home">
                <image-atom src="logo.svg" width="60" />
            </anchor-molecule>

            <button-atom
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
                        <anchor-molecule
                            class="nav-link homeNavLink -mt-1 md:mt-0"
                            href="#start"
                            @click="throttleHideNavbar"
                            label="Start"
                        />
                        <anchor-molecule
                            class="nav-link homeNavLink"
                            href="#features"
                            @click="throttleHideNavbar"
                            label="Features"
                        />
                        <anchor-molecule
                            class="nav-link homeNavLink"
                            href="#why-us"
                            @click="throttleHideNavbar"
                            label="Why Us"
                        />
                        <anchor-molecule
                            class="nav-link homeNavLink"
                            href="#contact"
                            @click="throttleHideNavbar"
                            label="Contact"
                        />
                    </div>

                    <button-atom
                        label="Log In"
                        class="primaryButton loginButton max-w-6 ml-auto my-4 md:my-0 text-sm"
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
