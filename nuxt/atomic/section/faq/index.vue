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
import type { QuestionObjectInterface, SectionFaqInterface } from 'atomic'
import {
  bounceFadeIn,
  questionRequests,
  useScrollTrigger,
  useSplitQuestions,
  useSplitText,
} from 'atomic'

const props = defineProps<SectionFaqInterface>()

let data

if (appEnv() !== 'production') {
  const { getSiteQuestions, resultsBySite } = questionRequests()

  onMounted(() => getSiteQuestions(props.site, false))
  watchEffect(() => (data = resultsBySite))
} else {
  ;({ data } = await useFetch(
    apiUrl() + `/questions/get-site-questions/${props.site}`,
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

useSplitText().animate(
  '.faq-section-header',
  500,
  0.2,
  0.1,
  'power2.out',
  true,
  'top 60%'
)

useScrollTrigger(
  '.faq-section-header',
  () => {
    bounceFadeIn('.faq-section .p-accordionpanel', {
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.1,
    })
  },
  {
    start: 'top 40%',
  }
)
</script>
