<template>
  <section id="welcome">
    <div class="welcome-container">
      <ClientOnly>
        <a href="https://github.com/Atomic-IT">
          <dm-animation-hexagons />
        </a>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const fetchData = async () => {
  try {
    const response = await fetch(appUrl() + '/api/test', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()

    console.log(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(async () => {
  await fetchData()
})
</script>

<style lang="scss">
@import 'index';
</style>
