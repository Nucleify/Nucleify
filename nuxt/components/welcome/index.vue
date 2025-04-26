<template>
  <section id="welcome">
    <div class="welcome-container">
      <a href="https://github.com/Atomic-IT">
        <img src="~/public/logo.png" alt="Atomic IT logo" width="150" height="150" />
        <h1>Nuxt Starter</h1>
      </a>
    </div>
  </section>
</template>

<script setup>
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost/api/test', {
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
@use 'index';
</style>
