<template>
  <div class="countdown">
    <div v-if="result && !result.finished && !result.expired" class="time-display">
      <span v-if="result.days > 0" class="time">{{ result.days }}d</span>
      <span class="time">{{ result.hours }}h</span>
      <span class="time">{{ result.minutes }}m</span>
      <span class="time">{{ result.seconds }}s</span>
    </div>
    <div v-else-if="result" class="finished">{{ result.expired ? 'Expired' : 'Finished' }}</div>
  </div>
</template>

<script setup lang="ts">
import type {
  DmTimeCalculateCountdownInterface,
  DmTimeCountdownInterface,
} from 'atomic'
import { calculateCountdown } from 'atomic'

const props = defineProps<DmTimeCountdownInterface>()

const result = ref<DmTimeCalculateCountdownInterface>()

let timer: ReturnType<typeof setInterval> | null = null

const updateCountdown = () => {
  result.value = calculateCountdown(props.date)
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
