<template>
  <div class="container">
    <nuc-card-boxes :boxes="data" />
  </div>
</template>

<script setup lang="ts">
import { technologyRequests } from 'atomic'

let data

if (appEnv() !== 'production') {
  const { getSiteTechnologies, resultsBySite } = technologyRequests()

  onMounted(() => getSiteTechnologies('general', false))
  watchEffect(() => (data = resultsBySite))
} else {
  ;({ data } = await useFetch(
    apiUrl() + '/technologies/get-site-technologies/general',
    {
      method: 'GET',
      immediate: true,
      watch: false,
    }
  ))
}
</script>
