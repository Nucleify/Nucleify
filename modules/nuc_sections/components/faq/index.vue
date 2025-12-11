<template>
  <div class="faq-section container">
    <ad-paragraph class="faq-section-header">
      <span>F</span>
      <span>A</span>
      <span>Q</span>
    </ad-paragraph>

    <div class="faq-section-questions">
      <ad-accordion
        v-if="column1"
        :panels="column1"
        ad-type="main"
        :hexagons="true"
      />
      <ad-accordion
        v-if="column2"
        :panels="column2"
        ad-type="main"
        :hexagons="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NucQuestionObjectInterface, NucSectionFaqInterface } from 'atomic'
import { questionRequests, useSplitQuestions } from 'atomic'

const props = defineProps<NucSectionFaqInterface>()

const column1 = ref<NucQuestionObjectInterface[]>([])
const column2 = ref<NucQuestionObjectInterface[]>([])

const { getSiteQuestions, resultsBySite } = questionRequests()

onMounted(() => {
  if (props.site) getSiteQuestions(props.site, false)
})

watchEffect(() => {
  const questions = props.questions || resultsBySite.value
  if (!questions) return
  ;({ column1: column1.value, column2: column2.value } =
    useSplitQuestions(questions))
})
</script>
