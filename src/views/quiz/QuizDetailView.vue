<template>
  <main>
    <section class="top">
      <h1>{{ title }}</h1>
      <p>Responda ao quiz e descubra!</p>
      <img :src="quizImage" alt="Image do quiz" />
    </section>
    <section class="quiz">
      <QuizComponent :quizData="quizData" v-if="quizData.length" />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import QuizComponent from '../../components/Quiz/QuestionComponent.vue'

import { useQuizStore, type QuizQuestion } from '../../stores/quiz.store'

export default defineComponent({
  components: { QuizComponent },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const quizStore = useQuizStore()
    const title = ref<string>()
    const quizImage = ref<string>()
    const quizData = ref<QuizQuestion[]>([])
    onMounted(async () => {
      await quizStore.fetchQuizById(props.id)

      const quiz = quizStore.quizDetail

      title.value = quiz.quiz_description
      quizImage.value = quiz.quiz_image
      const quizArray = quiz.quiz
      if (Array.isArray(quizArray) && quizArray.length > 0) {
        quizData.value = quizArray
      }
    })

    return { title, quizImage, quizData }
  }
})
</script>

<style scoped>
main {
  margin: 0 auto;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
