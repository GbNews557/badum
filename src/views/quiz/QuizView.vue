<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useQuizStore } from '../../stores/quiz.store'
import ItemList from '../../components/ItemList.vue'

interface QuizItem {
  id: string
  title: string
  shortDescription: string
  imgPath: string
}

export default defineComponent({
  components: { ItemList },
  setup() {
    const quizStore = useQuizStore()
    const quizList = ref<QuizItem[]>([])

    onMounted(async () => {
      await quizStore.fetchAll()
      quizList.value = quizStore.quizzes.map((quiz) => ({
        id: quiz._id ?? '',
        title: quiz.quiz_description,
        shortDescription: '',
        imgPath: quiz.quiz_image
      }))
    })

    return { quizList }
  }
})
</script>

<template>
  <main>
    <ItemList :items="quizList" imgWidth="450px" imgHeight="250px" path="noticias" />
  </main>
</template>

<style scoped>
main {
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
