<template>
  <main>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <img :src="image" alt="" />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRecomendationsStore } from '../../stores/recomendations.store'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const recomendationsStore = useRecomendationsStore()

    const title = ref<string>()
    const description = ref<string>()
    const image = ref<string>()
    onMounted(async () => {
      await recomendationsStore.fetchOneRecomendations(props.id)

      const recomendation = recomendationsStore.recomendationDetail

      title.value = recomendation.name
      description.value = recomendation.description
      image.value = recomendation.images[0].url
    })

    return { title, description, image }
  }
})
</script>

<style scoped>
main {
  margin: 0 auto;
  max-width: 1380px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
