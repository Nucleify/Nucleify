<template>
  <div class="faq-section container">
    <atom-heading :tag="6" text="FAQ" class="faq-section-header" />

    <div class="faq-section-questions">
      <organism-accordion
        v-if="column1.length"
        :panels="column1"
        ad-type="main"
      />
      <organism-accordion
        v-if="column2.length"
        :panels="column2"
        ad-type="main"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SectionFaqInterface,
  QuestionObjectInterface,
  useSplitQuestions,
} from 'atomic'

import { ref, watchEffect } from 'vue'

const props = defineProps<SectionFaqInterface>()

const { data } = await useFetch(runtime.apiUrl + 'questions/get-site-questions/' + props.site, {
  method: 'GET',
  immediate: true,
  watch: false,
})

const column1 = ref<QuestionObjectInterface[]>([])
const column2 = ref<QuestionObjectInterface[]>([])

watchEffect(() => {
  const questions = props.questions || data.value
  if (!questions) return
  ;({ column1: column1.value, column2: column2.value } =
    useSplitQuestions(questions))
})
</script>
