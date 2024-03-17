<template>
    <div class="panelContainer pb-5 lg:pb-8">
        <div
            class="homeBricksGrid grid mt-4 lg:mt-8 mx-auto col-12 justify-content-center flex"
        >
            <div class="p-3 col-12 sm:col-6 lg:col-4 grid-item-container">
                <a href="/contacts" class="grid-item">
                    <i class="pi pi-users" />
                    Contacts
                </a>
            </div>
            <div class="p-3 col-12 sm:col-6 lg:col-4 grid-item-container">
                <a href="#" class="grid-item disabledItem">
                    <i class="pi pi-comment" />
                    Posts
                </a>
            </div>
            <div class="p-3 col-12 sm:col-6 lg:col-4 grid-item-container">
                <a href="#" class="grid-item disabledItem">
                    <i class="pi pi-envelope" />
                    Messages
                </a>
            </div>
            <div class="p-3 col-12 sm:col-6 lg:col-4 grid-item-container">
                <a href="#" class="grid-item disabledItem">
                    <i class="pi pi-check-square" />
                    Tasks
                </a>
            </div>
            <div class="p-3 col-12 sm:col-6 lg:col-4 grid-item-container">
                <a href="#" class="grid-item disabledItem">
                    <i class="pi pi-calendar" />
                    Calendar
                </a>
            </div>
            <div class="p-3 col-12 sm:col-6 lg:col-4 grid-item-container">
                <a href="#" class="grid-item disabledItem">
                    <i class="pi pi-dollar" />
                    Money
                </a>
            </div>
            <div class="p-3 col-12 sm:col-6 lg:col-4 grid-item-container">
                <a href="/activity-log" class="grid-item">
                    <i class="pi pi-clock" />
                    Activities
                </a>
            </div>
            <div class="p-3 col-12 sm:col-6 lg:col-4 grid-item-container">
                <a class="grid-item disabledItem">
                    <i class="pi pi-info-circle" />
                    Help
                </a>
            </div>
            <div class="p-3 col-12 sm:col-6 lg:col-4 grid-item-container">
                <a class="grid-item disabledItem">
                    <i class="pi pi-cog" />
                    Settings
                </a>
            </div>
        </div>
    </div>
</template>

<style>
.disabledItem:hover,
.disabledItem:focus {
    color: #5e5e5e;
    box-shadow:
        inset 0 0.5px 0 rgba(0, 0, 0, 0.15),
        0 2px 6px rgba(0, 0, 0, 0.15);
}
</style>
