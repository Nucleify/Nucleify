<template>
    <anchor-molecule
        class="tile myCard"
        :href="props.href"
        :v-type="props.type"
    >
        <div class="general">
            <div class="info">
                <paragraph-atom class="header" :text="props.header" />
                <paragraph-atom class="count" :text="props.count" />
            </div>
            <icon-atom class="icon" :icon="props.icon" :v-type="props.type" />
        </div>
        <div class="secondary">
            <paragraph-atom class="count" :text="props.countSecondary" />
            <paragraph-atom class="text" :text="props.textSecondary" />
        </div>
    </anchor-molecule>
</template>

<script setup lang="ts">
import { TileInterface } from 'atomic/bosons/types'

const props = defineProps<TileInterface>()
</script>
