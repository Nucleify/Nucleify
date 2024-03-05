<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm py-3">
        <div class="container">
            <a class="navbar-brand" href="/"> DataManager </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Right Side Of Navbar -->
                <div class="navbar-nav ms-auto md:gap-7">
                    <div class="navbar-nav flex md:gap-3">
                        <a class="nav-link" href="/"> Start </a>
                        <a class="nav-link" href="#features"> Features </a>
                        <a class="nav-link" href="#why-us"> Why Us? </a>
                        <a class="nav-link" href="#contact"> Contact </a>
                    </div>

                    <a class="nav-link" href="/login">Log In</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts"></script>
