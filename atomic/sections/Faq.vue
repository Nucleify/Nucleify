<template>
  <div class="faq-section container">
    <ad-heading
      :tag="6"
      text="Frequently Asked Questions"
      class="faq-section-header"
    />

    <div class="faq-section-questions">
      <ad-accordion v-if="column1.length" :panels="column1" ad-type="main" />
      <ad-accordion v-if="column2.length" :panels="column2" ad-type="main" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SectionFaqInterface } from 'atomic/bosons/types'
import { useSplitQuestions } from 'atomic/bosons/utils'

const props = defineProps<SectionFaqInterface>()

const { column1, column2 } = useSplitQuestions(props.questions)
</script>
