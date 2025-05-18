<template>
  <div class="faq-section container">
    <atom-heading :tag="6" text="FAQ" class="faq-section-header" />

    <div class="faq-section-questions">
      <organism-accordion v-if="column1" :panels="column1" ad-type="main" />
      <organism-accordion v-if="column2" :panels="column2" ad-type="main" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SectionFaqInterface,
  QuestionObjectInterface,
  questionRequests,
  useSplitQuestions,
} from 'atomic'

const props = defineProps<SectionFaqInterface>()

let data

if (appEnv() !== 'production') {
  const { getSiteQuestions, resultsBySite } = questionRequests()

  onMounted(() => getSiteQuestions(props.site, false))
  watchEffect(() => data = resultsBySite)
} else {
  ;({ data } = await useFetch(
    apiUrl() + `questions/get-site-questions/${props.site}`,
    {
      method: 'GET',
      immediate: true,
      watch: false,
    }
  ))
}

const column1 = ref<QuestionObjectInterface[]>([])
const column2 = ref<QuestionObjectInterface[]>([])

watchEffect(() => {
  const questions = props.questions || data.value
  if (!questions) return
  ;({ column1: column1.value, column2: column2.value } =
    useSplitQuestions(questions))
})
</script>
