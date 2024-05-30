<template>
    <div class="homeBricksGrid grid">
        <div class="grid-item-container BlockLayout" ref="draggableContainer">
            <a
                v-for="item in homeItems"
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
                v-tooltip.top="
                    item.draggableClass
                        ? 'Hold click & move'
                        : 'This item is not movable'
                "
            >
                <i :class="item.iconClass"></i>
                {{ item.label }}
            </a>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { Swappable } from '@shopify/draggable'

import { homeItems } from '@/constants'
import { useDragItems } from '@/utils'

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

const { startDragging } = useDragItems()
</script>

<style scoped>
.draggable-source--is-dragging {
    z-index: 0;
}
</style>
