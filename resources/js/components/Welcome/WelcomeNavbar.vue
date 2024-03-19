<!--suppress HtmlUnknownAnchorTarget -->
<template>
    <nav
        class="welcomeNavbar navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 fixed w-full z-100"
    >
        <div class="container">
            <a class="applicationHeader" href="/"> DataManager </a>
            <button
                class="navbar-toggler invisible"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
            >
                <i class="pi pi-align-justify text-2xl visible"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Right Side Of Navbar -->
                <div class="navbar-nav ms-auto lg:gap-7">
                    <div class="navbar-nav flex lg:gap-3">
                        <a class="nav-link welcomeNavLink" href="#start">
                            Start
                        </a>
                        <a class="nav-link welcomeNavLink" href="#features">
                            Features
                        </a>
                        <a class="nav-link welcomeNavLink" href="#why-us">
                            Why Us?
                        </a>
                        <a class="nav-link welcomeNavLink" href="#contact">
                            Contact
                        </a>
                    </div>

                    <a class="nav-link welcomeNavLink" href="/login">Log In</a>
                </div>
            </div>
        </div>
    </nav>
</template>
