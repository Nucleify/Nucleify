<template>
  <div class="faq-section container">
    <ad-heading :tag="6" text="FAQ" class="faq-section-header" />

    <div class="faq-section-questions">
      <ad-accordion v-if="column1.length" :panels="column1" ad-type="main" />
      <ad-accordion v-if="column2.length" :panels="column2" ad-type="main" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  questionRequests,
  SectionFaqInterface,
  QuestionInterface,
  useSplitQuestions,
  useDialog,
} from 'atomic'

import { onMounted, ref, watchEffect } from 'vue'

const { closeDialog } = useDialog()
const props = defineProps<SectionFaqInterface>()

const { getSiteQuestions, resultsBySite } = questionRequests(closeDialog)

const column1 = ref<QuestionInterface[]>([])
const column2 = ref<QuestionInterface[]>([])

onMounted(async () => {
  await getSiteQuestions(true, props.site!)
})

watchEffect(() => {
  const questions = resultsBySite.value || props.questions
  if (!questions) return
  ;({ column1: column1.value, column2: column2.value } =
    useSplitQuestions(questions))
})
</script>
