<template>
    <div class="homeBricksGrid grid mt-4 lg:mt-8 mx-auto">
        <div
            class="p-3 grid-item-container BlockLayout"
            ref="draggableContainer"
        >
            <a
                v-for="item in items"
                :key="item.label"
                :id="item.label + 'GridItem'"
                :data-id="item.id"
                :href="item.href"
                :class="{
                    disabledItem: item.disabled,
                    'Block--is-draggable': item.draggableClass,
                }"
                class="grid-item"
                @mousedown="startDragging(item)"
                v-tooltip.top="'Hold click & move'"
            >
                <i :class="item.iconClass"></i>
                {{ item.label }}
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Swappable } from '@shopify/draggable'

const items = ref([
    {
        id: 1,
        label: 'Contacts',
        href: '/contacts',
        iconClass: 'pi pi-users',
        disabled: false,
        draggableClass: true,
    },
    {
        id: 2,
        label: 'Posts',
        href: '#',
        iconClass: 'pi pi-comment',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 3,
        label: 'Messages',
        href: '#',
        iconClass: 'pi pi-envelope',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 4,
        label: 'Tasks',
        href: '#',
        iconClass: 'pi pi-check-square',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 5,
        label: 'Calendar',
        href: '#',
        iconClass: 'pi pi-calendar',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 6,
        label: 'Money',
        href: '#',
        iconClass: 'pi pi-dollar',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 7,
        label: 'Activities',
        href: '/activity-log',
        iconClass: 'pi pi-clock',
        disabled: false,
        draggableClass: true,
    },
    {
        id: 8,
        label: 'Help',
        href: '#',
        iconClass: 'pi pi-info-circle',
        disabled: true,
        draggableClass: false,
    },
    {
        id: 9,
        label: 'Settings',
        href: '#',
        iconClass: 'pi pi-cog',
        disabled: true,
        draggableClass: false,
    },
])

let sortable

onMounted(() => {
    sortable = new Swappable(document.querySelector('.homeBricksGrid'), {
        draggable: '.Block--is-draggable',
        mirror: {
            appendTo: '.homeBricksGrid',
            constrainDimensions: true,
        },
        delay: 100,
    })
    sortable.on('drag:stop', (evt) => {
        evt.originalSource.style.color = '#5e5e5e'
    })
})

onUnmounted(() => {
    if (sortable) {
        sortable.destroy()
    }
})

const startDragging = (item) => {
    let color

    switch (item.label) {
        case 'Contacts':
            color = '#1bbd79'
            break
        case 'Activities':
            color = '#ffb600'
            break
    }

    document.getElementById(item.label + 'GridItem').style.color = color
}
</script>

<style scoped>
.homeBricksGrid {
    padding-left: 0;
}

.grid-item-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

@media (min-width: 992px) {
    .homeBricksGrid {
        padding-left: 120px;
    }
}

.draggable-source--is-dragging {
    z-index: 0;
}
</style>
